// js/chatbot.js - Basic Chatbot for Instastrategix
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.chatbot-toggle');
    const chatWindow = document.querySelector('.chatbot-window');
    const closeBtn = document.querySelector('.close-chat');
    const messages = document.querySelector('.chat-messages');
    const input = document.querySelector('.chat-input input');
    const sendBtn = document.querySelector('.chat-input button');

    // Toggle chat window
    toggle.addEventListener('click', () => {
        chatWindow.classList.toggle('open');
        if (chatWindow.classList.contains('open') && messages.children.length === 0) {
            addMessage('bot', 'Hello! 👋 I\'m the Instastrategix assistant. How can I help you today?');
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

        const response = getBotResponse(text.toLowerCase());
        setTimeout(() => addMessage('bot', response), 800);
    }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Add message to chat
    function addMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', sender);
        msgDiv.textContent = text;
        messages.appendChild(msgDiv);
        messages.scrollTop = messages.scrollHeight;
    }

    // Bot responses
    function getBotResponse(message) {
        if (message.includes('hi') || message.includes('hello') || message.includes('hey')) {
            return 'Hello! Welcome to Instastrategix – Global Digital Marketing Agency. How can I assist you today? 😊';
        }
        if (message.includes('service') || message.includes('what do you offer') || message.includes('what do you do')) {
            return 'We provide SEO, Paid Advertising (Google & Social), Social Media Marketing, and Content & Brand Strategy. Check out our Services page for details!';
        }
        if (message.includes('price') || message.includes('cost') || message.includes('pricing')) {
            return 'We create custom strategies based on your goals. Pricing varies – book a free strategy call to get a tailored proposal!';
        }
        if (message.includes('contact') || message.includes('talk') || message.includes('reach') || message.includes('human')) {
            return 'You can reach a real expert via our Contact page or book a Free Strategy Call from any page. Email: instastrategix@gmail.com';
        }
        if (message.includes('blog') || message.includes('learn')) {
            return 'Visit our blog for free digital marketing tips: https://instastrategix0.blogspot.com/';
        }
        return 'I\'m a simple assistant. For detailed help or to discuss your project, please use the "Get a Free Strategy Call" button or visit the Contact page. I\'ll connect you with the team! 🚀';
    }
});
