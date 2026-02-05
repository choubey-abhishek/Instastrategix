// js/chatbot.js - Advanced Grok AI Powered Chatbot
const GROK_API_KEY = 'YOUR_GROK_API_KEY_HERE'; // <-- Yaha apna API key paste kar do
const GROK_API_URL = 'https://api.x.ai/v1/chat/completions';
const MODEL = 'grok-beta'; // Current best model (grok-4 bhi try kar sakte ho if available)

document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.chatbot-toggle');
    const chatWindow = document.querySelector('.chatbot-window');
    const closeBtn = document.querySelector('.close-chat');
    const messages = document.querySelector('.chat-messages');
    const input = document.querySelector('.chat-input input');
    const sendBtn = document.querySelector('.chat-input button');
    const quickReplies = document.querySelector('.quick-replies');

    let conversationHistory = []; // Memory for Grok

    toggle.addEventListener('click', () => {
        chatWindow.classList.toggle('open');
        if (chatWindow.classList.contains('open') && messages.children.length === 0) {
            addMessage('bot', 'Hello! 👋 I\'m powered by ix. Welcome to Instastrategix – Global Digital Marketing Agency.<br><br>How can I help you with SEO, Ads, Social Media, or anything else?');
            showQuickReplies(['Our Services', 'Pricing', 'Book Free Strategy Call', 'Locations We Serve']);
        }
    });

    closeBtn.addEventListener('click', () => chatWindow.classList.remove('open'));

    function sendMessage() {
        const text = input.value.trim();
        if (!text) return;

        addMessage('user', text);
        input.value = '';
        showTyping();

        conversationHistory.push({ role: 'user', content: text });

        fetch(GROK_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROK_API_KEY}`
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [
                    { role: 'system', content: 'You are a helpful assistant for Instastrategix, a global digital marketing agency. Promote services like SEO, Paid Ads, Social Media, Content Strategy. Guide users to book free strategy call at contact-us.html. Be professional yet friendly.' },
                    ...conversationHistory
                ],
                stream: true // Streaming for real-time feel
            })
        })
        .then(response => {
            if (!response.ok) throw new Error('API error');
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let botMessage = '';
            let botDiv = addMessage('bot', ''); // Empty div for streaming

            function read() {
                reader.read().then(({ done, value }) => {
                    if (done) {
                        hideTyping();
                        conversationHistory.push({ role: 'assistant', content: botMessage });
                        return;
                    }
                    const chunk = decoder.decode(value);
                    const lines = chunk.split('\n');
                    lines.forEach(line => {
                        if (line.startsWith('data: ')) {
                            const data = line.slice(6);
                            if (data === '[DONE]') return;
                            try {
                                const json = JSON.parse(data);
                                const content = json.choices[0]?.delta?.content || '';
                                botMessage += content;
                                botDiv.innerHTML = botMessage; // Stream update
                                messages.scrollTop = messages.scrollHeight;
                            } catch (e) {}
                        }
                    });
                    read();
                });
            }
            read();
        })
        .catch(err => {
            hideTyping();
            addMessage('bot', 'Sorry, something went wrong. Please try again or visit <a href="contact-us.html">Contact page</a>.');
            console.error(err);
        });
    }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', e => { if (e.key === 'Enter') sendMessage(); });

    quickReplies.addEventListener('click', e => {
        if (e.target.classList.contains('quick-reply')) {
            input.value = e.target.textContent;
            sendMessage();
        }
    });

    function addMessage(sender, text) {
        const div = document.createElement('div');
        div.classList.add('message', sender);
        div.innerHTML = text;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
        return div;
    }

    function showQuickReplies(options) {
        quickReplies.innerHTML = '';
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.classList.add('quick-reply');
            btn.textContent = opt;
            quickReplies.appendChild(btn);
        });
    }

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
});
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
