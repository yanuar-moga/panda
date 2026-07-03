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

// Fungsi untuk membuka/menutup chat dengan animasi
function toggleChat() {
    const isHidden = chatWindow.classList.contains('hidden');
    
    if (isHidden) {
        // Chat mau dibuka
        chatWindow.classList.remove('hidden');
        pandaBtn.classList.add('hidden'); // Tombol panda utama hilang
    } else {
        // Chat mau ditutup
        chatWindow.classList.add('hidden');
        pandaBtn.classList.remove('hidden'); // Tombol panda utama muncul kembali
    }
}

// Event Listener
pandaBtn.onclick = toggleChat;
closeBtn.onclick = toggleChat;

function sendMessage() {
    const text = input.value.trim();
    if (!text) return;
    
    // Tampil pesan user
    addMsg(text, 'user');
    input.value = '';
    
    // Disable input & tombol saat loading
    input.disabled = true;
    sendBtn.disabled = true;
    
    // Tampil typing indikator
    typing.classList.remove('hidden');
    scrollToBottom();

    // Simulasi berpikir bot (delay)
    setTimeout(() => {
        // Sembunyikan typing indikator
        typing.classList.add('hidden');
        
        // Logika Pencarian
        const query = text.toLowerCase();
        const found = faqData.find(item => {
            const keys = item.keyword ? item.keyword.split(',').map(k => k.trim().toLowerCase()) : [];
            const matchKey = keys.some(k => query.includes(k));
            const matchQuest = item.question ? query.includes(item.question.toLowerCase()) : false;
            return matchKey || matchQuest;
        });
        
        // Tampil jawaban bot
        const botResponse = found ? found.answer : "Maaf, SIPANDA belum mengerti. Coba tanya hal lain tentang sekolah ya!";
        addMsg(botResponse, 'bot');
        
        // Re-enable input & tombol
        input.disabled = false;
        sendBtn.disabled = false;
        input.focus(); // Fokus kembali ke input
        scrollToBottom();
    }, 1500); // Waktu delay berpikir (1.5 detik)
}

function addMsg(text, sender) {
    const div = document.createElement('div');
    div.className = `msg ${sender}`;
    div.innerText = text;
    msgBox.appendChild(div);
}

function scrollToBottom() {
    msgBox.scrollTop = msgBox.scrollHeight;
}

// Event Enter pada keyboard
input.onkeypress = (e) => { if(e.key === 'Enter') sendMessage(); };
