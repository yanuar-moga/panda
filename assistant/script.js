const GAS_URL = "https://script.google.com/macros/s/AKfycbwcn1-_oGEwG-xWLlt-YdGXv-ti6mMxHMOBC9cNPBTKHoV0aed8Y1Zqs85tf3pKMZfsHg/exec";

// Inisialisasi User
if (!localStorage.getItem('panda_user')) {
    let name = prompt("Halo! Siapa nama Anda?");
    localStorage.setItem('panda_user', name || "Pengunjung");
}
if (!localStorage.getItem('panda_session_id')) {
    localStorage.setItem('panda_session_id', 'user_' + Math.random().toString(36).substr(2, 9));
}

// Efek Mengetik Nama
const appNameEl = document.getElementById('app-name');
const titleText = "PANDA ASSISTANT (Versi 1.0)";
let index = 0;

function typeName() {
    if (index < titleText.length) {
        appNameEl.innerHTML += titleText.charAt(index);
        index++;
        setTimeout(typeName, 100);
    }
}

function toggleChat() {
    const chat = document.getElementById('panda-chat');
    chat.classList.toggle('hidden');
    if (!chat.classList.contains('hidden') && index === 0) typeName();
}

async function handleEnter(e) {
    if (e.key === 'Enter') {
        const input = document.getElementById('user-input');
        const chatBody = document.getElementById('chat-body');
        const q = input.value;
        if (!q) return;
        
        chatBody.innerHTML += `<p><b>Anda:</b> ${q}</p>`;
        input.value = '';
        
        const loader = document.createElement('p');
        loader.className = 'typing';
        loader.innerText = "Panda sedang mengetik...";
        chatBody.appendChild(loader);

        try {
            const response = await fetch(GAS_URL, {
                method: 'POST',
                body: JSON.stringify({
                    question: q,
                    userName: localStorage.getItem('panda_user'),
                    sessionId: localStorage.getItem('panda_session_id')
                })
            });
            const data = await response.json();
            
            loader.remove();
            chatBody.innerHTML += `<p><b>Panda:</b> ${data.answer}</p>`;
            chatBody.innerHTML += `<p style="font-size: 0.75em; color: #555; border-top:1px solid #ddd; padding-top:5px;">💡 <i>Tahukah kamu? ${data.trivia}</i></p>`;
            chatBody.scrollTop = chatBody.scrollHeight;
        } catch (err) {
            loader.remove();
            chatBody.innerHTML += `<p>Maaf, Panda sedang istirahat.</p>`;
        }
    }
}
