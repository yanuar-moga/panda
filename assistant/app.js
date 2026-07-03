const SCRIPT_URL = "YOUR_GAS_URL"; // Ganti dengan URL Web App Anda
let faqData = [];

// Fetch data saat halaman dimuat
fetch(SCRIPT_URL)
    .then(res => res.json())
    .then(data => { faqData = data; });

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
        const found = faqData.find(item => {
            const keys = item.keyword ? item.keyword.split(',').map(k => k.trim().toLowerCase()) : [];
            return keys.includes(text.toLowerCase()) || 
                   (item.question && item.question.toLowerCase().includes(text.toLowerCase()));
        });
        
        addMsg(found ? found.answer : "Maaf, SIPANDA belum tahu jawabannya. Coba tanya hal lain!", 'bot');
        msgBox.scrollTop = msgBox.scrollHeight;
    }, 1200);
}

function addMsg(text, sender) {
    const div = document.createElement('div');
    div.className = `msg ${sender}`;
    div.innerText = text;
    msgBox.appendChild(div);
}

sendBtn.onclick = sendMessage;
input.onkeypress = (e) => { if(e.key === 'Enter') sendMessage(); };
