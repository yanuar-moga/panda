const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz5phe5kCec9ipOW2OO1UzH4NW3j7cgdcY5rgS2dW9rjB2uEXwW3kf15X1arrXp4PMjKw/exec";
let faqData = [];

fetch(SCRIPT_URL).then(res => res.json()).then(data => faqData = data);

const pandaBtn = document.getElementById('panda-btn');
const chatWindow = document.getElementById('chat-window');
const input = document.getElementById('user-input');
const msgBox = document.getElementById('chat-messages');
const typing = document.getElementById('typing-indicator');

pandaBtn.onclick = () => { chatWindow.classList.toggle('hidden'); pandaBtn.classList.toggle('hidden'); };
document.getElementById('close-btn').onclick = () => { chatWindow.classList.toggle('hidden'); pandaBtn.classList.toggle('hidden'); };

function sendMessage() {
    const text = input.value.trim();
    if (!text) return;
    
    addMsg(text, 'user');
    input.value = '';
    
    const sapaan = ['hi', 'hai', 'hello', 'halo', 'hei', 'hey', 'pagi'];
    if (sapaan.some(s => text.toLowerCase().includes(s))) {
        typing.classList.remove('hidden');
        setTimeout(() => {
            typing.classList.remove('hidden');
            typing.classList.add('hidden');
            addMsg("Halo! Senang bertemu denganmu. Ada yang bisa saya bantu?", 'bot');
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
        
        if (found) {
            addMsg(found.answer, 'bot');
        } else {
            addMsg("Maaf, PANDA belum mengerti. Pertanyaanmu sudah saya catat untuk admin sekolah ya!", 'bot');
            saveUnanswered(text);
        }
    }, 1500);
}

function saveUnanswered(q) {
    fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q })
    });
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
