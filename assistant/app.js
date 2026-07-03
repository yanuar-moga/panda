const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz5phe5kCec9ipOW2OO1UzH4NW3j7cgdcY5rgS2dW9rjB2uEXwW3kf15X1arrXp4PMjKw/exec";

const pandaBtn = document.getElementById('panda-btn');
const chatWindow = document.getElementById('chat-window');
const closeBtn = document.getElementById('close-btn');
const input = document.getElementById('user-input');
const msgBox = document.getElementById('chat-messages');
const typing = document.getElementById('typing-indicator');
const typewriterText = document.querySelector('.typewriter');

// Fungsi buka/tutup chat
function toggleChat() {
    chatWindow.classList.toggle('hidden');
    pandaBtn.classList.toggle('hidden');

    if (!chatWindow.classList.contains('hidden')) {
        typewriterText.style.animation = 'none';
        void typewriterText.offsetWidth; 
        typewriterText.style.animation = 'typing 2s steps(20, end), blink-caret 0.75s step-end infinite';
    }
}

pandaBtn.onclick = toggleChat;
closeBtn.onclick = toggleChat;

// Fungsi Utama: Mengirim pesan ke server dan menunggu jawaban
async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;
    
    addMsg(text, 'user');
    input.value = '';
    
    // Tampilkan indikator mengetik
    typing.classList.remove('hidden');
    msgBox.scrollTop = msgBox.scrollHeight;

    try {
        // Kirim pertanyaan ke Google Apps Script
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            // mode: 'no-cors' dihapus karena kita butuh menerima data balik (JSON)
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: text })
        });

        const data = await response.json(); // Mengambil JSON { "answer": "..." }

        // Sembunyikan indikator dan tampilkan jawaban dari server
        typing.classList.add('hidden');
        
        if (data.answer) {
            addMsg(data.answer, 'bot');
        } else {
            addMsg("Maaf, PANDA belum mengerti pertanyaan tersebut.", 'bot');
        }
    } catch (error) {
        typing.classList.add('hidden');
        addMsg("Maaf, sepertinya ada kendala koneksi ke server.", 'bot');
        console.error('Error:', error);
    }
}

// Fungsi helper untuk menambah pesan ke UI
function addMsg(text, sender) {
    const div = document.createElement('div');
    div.className = `msg ${sender}`;
    div.innerText = text;
    msgBox.appendChild(div);
    msgBox.scrollTop = msgBox.scrollHeight;
}

document.getElementById('send-btn').onclick = sendMessage;
input.onkeypress = (e) => { if(e.key === 'Enter') sendMessage(); };
