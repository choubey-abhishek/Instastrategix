// js/chatbot.js - Fully Working Enhanced Chatbot (Responses Fixed)
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.chatbot-toggle');
    const chatWindow = document.querySelector('.chatbot-window');
    const closeBtn = document.querySelector('.close-chat');
    const messages = document.querySelector('.chat-messages');
    const input = document.querySelector('.chat-input input');
    const sendBtn = document.querySelector('.chat-input button');
    const quickReplies = document.querySelector('.quick-replies');

    // Open/Close
    toggle.addEventListener('click', () => {
        chatWindow.classList.toggle('open');
        if (chatWindow.classList.contains('open') && messages.children.length === 0) {
            addMessage('bot', 'Hello! 👋 Welcome to <strong>Instastrategix</strong> – Global Digital Marketing Agency serving UK, USA, Canada, Dubai, and India.<br><br>How can I help you today?');
            showQuickReplies(['Our Services', 'Pricing & Packages', 'Locations We Serve', 'Book Strategy Call', 'Visit Blog']);
        }
    });

    closeBtn.addEventListener('click', () => {
        chatWindow.classList.remove('open');
    });

    // Send message
    function sendMessage() {
        const text = input.value.trim();
        if (text === '') return;

        addMessage('user', text);
        input.value = '';
        showTyping();

        const response = getBotResponse(text.toLowerCase());
        setTimeout(() => {
            hideTyping();
            addMessage('bot', response.text);
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
            addMessage('user', text);
            showTyping();
            const response = getBotResponse(text.toLowerCase());
            setTimeout(() => {
                hideTyping();
                addMessage('bot', response.text);
                if (response.quickReplies) {
                    showQuickReplies(response.quickReplies);
                }
            }, 800);
        }
    });

    // Add message function
    function addMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', sender);
        msgDiv.innerHTML = text;
        messages.appendChild(msgDiv);
        messages.scrollTop = messages.scrollHeight;
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

    // FULL Bot Responses (Yeh part pehle miss ho gaya tha – ab complete hai)
    function getBotResponse(message) {
        if (message.includes('hi') || message.includes('hello') || message.includes('hey') || message.includes('good')) {
            return {
                text: 'Hi there! 😊 I\'m the Instastrategix assistant. We help brands scale with SEO, Paid Ads, Social Media, and Content Strategy across global markets.<br><br>What would you like to know?',
                quickReplies: ['Our Services', 'Pricing & Packages', 'Locations We Serve', 'Book Strategy Call']
            };
        }

        if (message.includes('service') || message.includes('offer') || message.includes('do')) {
            return {
                text: 'We offer:<br>• <strong>Search Engine Optimization (SEO)</strong> – Rank higher globally<br>• <strong>Paid Advertising</strong> – Google & Social Ads with high ROI<br>• <strong>Social Media Marketing</strong> – Build engagement & authority<br>• <strong>Content & Brand Strategy</strong> – Position you as industry leader<br><br><a href="services.html" target="_blank">View full Services →</a>',
                quickReplies: ['Pricing & Packages', 'Book Strategy Call']
            };
        }

        if (message.includes('price') || message.includes('cost') || message.includes('pricing') || message.includes('package')) {
            return {
                text: 'We don\'t have fixed packages – every strategy is custom-built for your goals.<br><br>Typical investments are competitive and transparent.<br><br>Best step: Book a <strong>Free Strategy Call</strong> for exact pricing!',
                quickReplies: ['Book Strategy Call', 'Contact Us']
            };
        }

        if (message.includes('location') || message.includes('where') || message.includes('country') || message.includes('serve')) {
            return {
                text: 'Based in India, we serve clients in:<br>• United Kingdom<br>• United States<br>• Canada<br>• Dubai (UAE)<br>• India<br>• And worldwide 🌍',
                quickReplies: ['Our Services', 'Book Strategy Call']
            };
        }

        if (message.includes('book') || message.includes('call') || message.includes('strategy') || message.includes('free')) {
            return {
                text: 'Awesome! Book your <strong>Free Strategy Call</strong> here:<br><a href="contact-us.html" target="_blank">→ Book Now</a><br><br>We\'ll create a custom plan for your growth.',
                quickReplies: ['Our Services', 'Pricing & Packages']
            };
        }

        if (message.includes('blog') || message.includes('tip') || message.includes('learn')) {
            return {
                text: 'Visit our blog for free marketing tips:<br><a href="https://instastrategix0.blogspot.com/" target="_blank">→ Instastrategix Blog</a>',
                quickReplies: ['Our Services', 'Book Strategy Call']
            };
        }

        if (message.includes('contact') || message.includes('email') || message.includes('reach')) {
            return {
                text: 'Reach us at:<br>• Email: <a href="mailto:instastrategix@gmail.com">instastrategix@gmail.com</a><br>• <a href="contact-us.html" target="_blank">Contact Page →</a>',
                quickReplies: ['Book Strategy Call']
            };
        }

        // Default fallback
        return {
            text: 'Great question! For detailed help on your business, book a <strong>Free Strategy Call</strong> – our experts will guide you.<br><a href="contact-us.html" target="_blank">→ Book Here</a>',
            quickReplies: ['Our Services', 'Pricing & Packages', 'Book Strategy Call']
        };
    }
});
