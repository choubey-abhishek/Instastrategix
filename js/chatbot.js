// js/chatbot.js – Upgraded version with persistent chat, smarter responses, and "Start Over"
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.chatbot-toggle');
    const chatWindow = document.querySelector('.chatbot-window');
    const closeBtn = document.querySelector('.close-chat');
    const messages = document.querySelector('.chat-messages');
    const input = document.querySelector('.chat-input input');
    const sendBtn = document.querySelector('.chat-input button');
    const quickReplies = document.querySelector('.quick-replies');

    const STORAGE_KEY = 'instastrategix_chat';

    // Load previous conversation from localStorage
    function loadChat() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const history = JSON.parse(saved);
            messages.innerHTML = ''; // clear default welcome
            history.forEach(msg => {
                addMessage(msg.sender, msg.text, false); // don't save again
            });
            // If last message was from bot, show its quick replies if any? Not stored.
            // Instead, show default quick replies after loading.
            showQuickReplies(['Our Services', 'Pricing & Packages', 'Locations We Serve', 'Book Strategy Call', 'Start Over']);
        } else {
            // First time: welcome message + default quick replies
            addMessage('bot', 'Hello! 👋 Welcome to <strong>Instastrategix</strong> – Global Digital Marketing Agency serving UK, USA, Canada, Dubai, and India.<br><br>How can I help you today?', true);
            showQuickReplies(['Our Services', 'Pricing & Packages', 'Locations We Serve', 'Book Strategy Call', 'Start Over']);
        }
    }

    // Save conversation to localStorage
    function saveChat() {
        const history = [];
        document.querySelectorAll('.chat-messages .message').forEach(msg => {
            const sender = msg.classList.contains('user') ? 'user' : 'bot';
            // We need to store only text, not HTML formatting? We'll store HTML to preserve links.
            // But we must be careful with security; we trust our own messages.
            history.push({ sender, text: msg.innerHTML });
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }

    // Clear chat and reset
    function startOver() {
        localStorage.removeItem(STORAGE_KEY);
        messages.innerHTML = '';
        addMessage('bot', 'Chat reset. 👋 How can I help you today?', true);
        showQuickReplies(['Our Services', 'Pricing & Packages', 'Locations We Serve', 'Book Strategy Call', 'Start Over']);
    }

    // Open/Close
    toggle.addEventListener('click', () => {
        chatWindow.classList.toggle('open');
        if (chatWindow.classList.contains('open') && messages.children.length === 0) {
            loadChat(); // Load existing or start new
        }
    });

    closeBtn.addEventListener('click', () => {
        chatWindow.classList.remove('open');
    });

    // Send message
    function sendMessage() {
        const text = input.value.trim();
        if (text === '') return;

        addMessage('user', text, true);
        input.value = '';
        showTyping();

        const response = getBotResponse(text.toLowerCase());
        setTimeout(() => {
            hideTyping();
            addMessage('bot', response.text, true);
            if (response.quickReplies) {
                showQuickReplies(response.quickReplies);
            }
        }, 1000 + Math.random() * 800);
    }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Quick reply click
    quickReplies.addEventListener('click', (e) => {
        if (e.target.classList.contains('quick-reply')) {
            const text = e.target.textContent;
            if (text === 'Start Over') {
                startOver();
                return;
            }
            addMessage('user', text, true);
            showTyping();
            const response = getBotResponse(text.toLowerCase());
            setTimeout(() => {
                hideTyping();
                addMessage('bot', response.text, true);
                if (response.quickReplies) {
                    showQuickReplies(response.quickReplies);
                }
            }, 800);
        }
    });

    // Add message function
    function addMessage(sender, text, shouldSave = true) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', sender);
        msgDiv.innerHTML = text;
        messages.appendChild(msgDiv);
        messages.scrollTop = messages.scrollHeight;
        if (shouldSave) saveChat();
    }

    // Quick replies
    function showQuickReplies(options) {
        quickReplies.innerHTML = '';
        options.forEach(option => {
            const btn = document.createElement('button');
            btn.classList.add('quick-reply');
            btn.textContent = option;
            quickReplies.appendChild(btn);
        });
    }

    // Typing indicator
    function showTyping() {
        const typing = document.createElement('div');
        typing.classList.add('message', 'bot', 'typing');
        typing.id = 'typing-indicator';
        typing.innerHTML = '<span></span><span></span><span></span>';
        messages.appendChild(typing);
        messages.scrollTop = messages.scrollHeight;
    }

    function hideTyping() {
        const typing = document.getElementById('typing-indicator');
        if (typing) typing.remove();
    }

    // Enhanced Bot Responses
    function getBotResponse(message) {
        // Greetings
        if (message.match(/\b(hi|hello|hey|good morning|good afternoon|good evening)\b/)) {
            return {
                text: 'Hi there! 😊 I\'m the Instastrategix assistant. We help brands scale with SEO, Paid Ads, Social Media, and Content Strategy across global markets.<br><br>What would you like to know?',
                quickReplies: ['Our Services', 'Pricing & Packages', 'Locations We Serve', 'Book Strategy Call', 'Start Over']
            };
        }

        // Services
        if (message.match(/\b(service|offer|do|provide|capabilities)\b/)) {
            return {
                text: 'We offer:<br>• <strong>Search Engine Optimization (SEO)</strong> – Rank higher globally<br>• <strong>Paid Advertising</strong> – Google & Social Ads with high ROI<br>• <strong>Social Media Marketing</strong> – Build engagement & authority<br>• <strong>Content & Brand Strategy</strong> – Position you as industry leader<br><br><a href="services.html" target="_blank">View full Services →</a>',
                quickReplies: ['Pricing & Packages', 'Book Strategy Call', 'Start Over']
            };
        }

        // Pricing
        if (message.match(/\b(price|cost|pricing|package|rate|investment|how much)\b/)) {
            return {
                text: 'We don\'t have fixed packages – every strategy is custom-built for your goals.<br><br>Typical investments are competitive and transparent.<br><br>Best step: Book a <strong>Free Strategy Call</strong> for exact pricing!',
                quickReplies: ['Book Strategy Call', 'Contact Us', 'Start Over']
            };
        }

        // Locations
        if (message.match(/\b(location|where|country|serve|area|region|based)\b/)) {
            return {
                text: 'Based in India, we serve clients in:<br>• United Kingdom<br>• United States<br>• Canada<br>• Dubai (UAE)<br>• India<br>• And worldwide 🌍',
                quickReplies: ['Our Services', 'Book Strategy Call', 'Start Over']
            };
        }

        // Book a call
        if (message.match(/\b(book|call|strategy|free|consultation|schedule)\b/)) {
            return {
                text: 'Awesome! Book your <strong>Free Strategy Call</strong> here:<br><a href="contact-us.html" target="_blank">→ Book Now</a><br><br>We\'ll create a custom plan for your growth.',
                quickReplies: ['Our Services', 'Pricing & Packages', 'Start Over']
            };
        }

        // Blog
        if (message.match(/\b(blog|tip|learn|article|guide|resource)\b/)) {
            return {
                text: 'Visit our blog for free marketing tips:<br><a href="https://instastrategix0.blogspot.com/" target="_blank">→ Instastrategix Blog</a>',
                quickReplies: ['Our Services', 'Book Strategy Call', 'Start Over']
            };
        }

        // Contact
        if (message.match(/\b(contact|email|reach|phone|call us|support)\b/)) {
            return {
                text: 'Reach us at:<br>• Email: <a href="mailto:instastrategix@gmail.com">instastrategix@gmail.com</a><br>• <a href="contact-us.html" target="_blank">Contact Page →</a>',
                quickReplies: ['Book Strategy Call', 'Start Over']
            };
        }

        // Case studies / portfolio
        if (message.match(/\b(case study|portfolio|work|client|project|result)\b/)) {
            return {
                text: 'We\'ve helped brands across industries achieve outstanding results. Visit our <a href="services.html" target="_blank">Services</a> page to see examples, or book a call to discuss your specific goals!',
                quickReplies: ['Our Services', 'Book Strategy Call', 'Start Over']
            };
        }

        // About company
        if (message.match(/\b(about|company|who are you|background|team)\b/)) {
            return {
                text: 'Instastrategix is a global digital marketing agency based in India, serving clients in UK, USA, Canada, Dubai, and beyond. We specialize in SEO, paid ads, social media, and content strategy – all tailored to drive real business growth.',
                quickReplies: ['Our Services', 'Locations We Serve', 'Book Strategy Call', 'Start Over']
            };
        }

        // Start Over (explicit command)
        if (message.includes('start over') || message.includes('reset') || message.includes('clear')) {
            startOver();
            return { text: '', quickReplies: [] }; // startOver already handles response
        }

        // Default fallback
        return {
            text: 'Great question! For detailed help on your business, book a <strong>Free Strategy Call</strong> – our experts will guide you.<br><a href="contact-us.html" target="_blank">→ Book Here</a>',
            quickReplies: ['Our Services', 'Pricing & Packages', 'Book Strategy Call', 'Start Over']
        };
    }

    // Load chat initially (if window closed, we don't show, but we preload data)
    // We'll load only when opened. But we can preload conversation in background? Not necessary.
    // Ensure that if user reopens, the previously saved chat is shown.
    // The open handler already calls loadChat() if messages empty, which will restore from storage.
    // But we need to handle case where messages are not empty on open – that can happen if user closed with chat open? Actually we clear on close? No, we just hide. So messages remain. That's fine.
    // If user opens and there are messages, we just show them. No need to load again.

    // Add "Start Over" as a quick reply always (we already included it)
});
