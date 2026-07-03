const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz5phe5kCec9ipOW2OO1UzH4NW3j7cgdcY5rgS2dW9rjB2uEXwW3kf15X1arrXp4PMjKw/exec";
let faqData = [];

// Fetch data saat aplikasi dimuat
fetch(SCRIPT_URL)
    .then(res => res.json())
    .then(data => { faqData = data; console.log("FAQ Loaded"); })
    .catch(err => console.error("Error loading FAQ:", err));

const pandaBtn = document.getElementById('panda-btn');
const chatWindow = document.getElementById('chat-window');
const closeBtn = document.getElementById('close-btn');
const input = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
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
    typing.classList.remove('hidden');
    msgBox.scrollTop = msgBox.scrollHeight;

    setTimeout(() => {
        typing.classList.add('hidden');
        const query = text.toLowerCase();
        
        // Logika Pencarian: Keyword dipisah koma atau cocok dengan pertanyaan
        const found = faqData.find(item => {
            const keys = item.keyword ? item.keyword.split(',').map(k => k.trim().toLowerCase()) : [];
            const matchKey = keys.some(k => query.includes(k));
            const matchQuest = item.question ? query.includes(item.question.toLowerCase()) : false;
            return matchKey || matchQuest;
        });
        
        addMsg(found ? found.answer : "Maaf, SIPANDA belum mengerti. Coba tanya hal lain tentang sekolah ya!", 'bot');
        msgBox.scrollTop = msgBox.scrollHeight;
    }, 1500);
}

function addMsg(text, sender) {
    const div = document.createElement('div');
    div.className = `msg ${sender}`;
    div.innerText = text;
    msgBox.appendChild(div);
}

sendBtn.onclick = sendMessage;
input.onkeypress = (e) => { if(e.key === 'Enter') sendMessage(); };
