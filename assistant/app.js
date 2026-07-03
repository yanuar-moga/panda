let chatOpen = false;

/* =====================
   TOGGLE CHAT
===================== */
function toggleChat() {

  const panel = document.getElementById("chat-panel");

  chatOpen = !chatOpen;

  panel.classList.toggle("hidden");

  if (chatOpen) {
    setState("happy");
  } else {
    setState("idle");
  }
}

/* =====================
   SEND MESSAGE
===================== */
function sendMessage() {

  const input = document.getElementById("userInput");
  const text = input.value.trim();

  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  setState("thinking");

  setTimeout(() => {

    const answer = getAnswer(text);

    if (answer) {
      addMessage(answer, "bot");
      setState("happy");
    } else {
      addMessage("Maaf, saya belum menemukan informasi itu.", "bot");
      setState("sad");
    }

  }, 600);
}

/* =====================
   SIMPLE AI (LOCAL DB)
===================== */
function getAnswer(text) {

  const db = [
    { q: "jam masuk", a: "Jam masuk pukul 07.00 WIB." },
    { q: "ppdb", a: "Info PPDB ada di menu website sekolah." },
    { q: "kepala sekolah", a: "Kepala SMPN 1 Moga adalah ..." }
  ];

  text = text.toLowerCase();

  for (let item of db) {
    if (text.includes(item.q)) {
      return item.a;
    }
  }

  return null;
}

/* =====================
   CHAT UI
===================== */
function addMessage(text, type) {

  const box = document.getElementById("chat-box");

  const div = document.createElement("div");
  div.classList.add("msg", type);
  div.innerText = text;

  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}
