const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz5phe5kCec9ipOW2OO1UzH4NW3j7cgdcY5rgS2dW9rjB2uEXwW3kf15X1arrXp4PMjKw/exec";
let faqData = [];

fetch(SCRIPT_URL).then(res => res.json()).then(data => faqData = data);

const pandaBtn = document.getElementById('panda-btn');
const chatWindow = document.getElementById('chat-window');
const closeBtn = document.getElementById('close-btn');
const input = document.getElementById('user-input');
const msgBox = document.getElementById('chat-messages');
const typing = document.getElementById('typing-indicator');

function toggleChat() {
    chatWindow.classList.toggle('hidden');
    pandaBtn.classList.toggle('hidden');
}

pandaBtn.onclick = toggleChat;
closeBtn.onclick = toggleChat;

function sendMessage() {
    const text = input.value.trim();
    if (!text) return;
    
    addMsg(text, 'user');
    input.value = '';
    
    // Logika Sapaan Otomatis
    const sapaan = ['hi', 'hai', 'hello', 'halo', 'hei', 'hey', 'pagi'];
    if (sapaan.some(s => text.toLowerCase().includes(s))) {
        typing.classList.remove('hidden');
        setTimeout(() => {
            typing.classList.add('hidden');
            addMsg("Halo! Senang bertemu denganmu. Ada yang bisa saya bantu hari ini?", 'bot');
        }, 1000);
        return;
    }

    typing.classList.remove('hidden');
    setTimeout(() => {
        typing.classList.add('hidden');
        const found = faqData.find(item => {
            const keys = item.keyword ? item.keyword.split(',').map(k => k.trim().toLowerCase()) : [];
            return keys.includes(text.toLowerCase()) || (item.question && text.toLowerCase().includes(item.question.toLowerCase()));
        });
        addMsg(found ? found.answer : "Maaf, SIPANDA belum mengerti. Coba tanya hal lain ya!", 'bot');
    }, 1500);
}

function addMsg(text, sender) {
    const div = document.createElement('div');
    div.className = `msg ${sender}`;
    div.innerText = text;
    msgBox.appendChild(div);
    msgBox.scrollTop = msgBox.scrollHeight;
}

document.getElementById('send-btn').onclick = sendMessage;
input.onkeypress = (e) => { if(e.key === 'Enter') sendMessage(); };
