const API_URL = "https://script.google.com/macros/s/AKfycbz5phe5kCec9ipOW2OO1UzH4NW3j7cgdcY5rgS2dW9rjB2uEXwW3kf15X1arrXp4PMjKw/exec";

let faqData = [];
let chatOpen = false;

/* =========================
   LOAD DATABASE FROM SHEETS
========================= */
async function loadData() {
  try {
    const res = await fetch(API_URL);
    faqData = await res.json();
    console.log("SIPANDA DB loaded:", faqData);
  } catch (err) {
    console.error("Load error:", err);
  }
}

loadData();

/* =========================
   TOGGLE CHAT PANEL
   (FIX: panda hilang saat open)
========================= */
function toggleChat() {

  const panel = document.getElementById("chat-panel");
  const panda = document.getElementById("sipanda-float");

  chatOpen = !chatOpen;

  if (chatOpen) {
    panel.classList.remove("hidden");
    panda.classList.add("hidden"); // 🐼 HILANG saat chat terbuka
    setState("happy");
  } else {
    panel.classList.add("hidden");
    panda.classList.remove("hidden"); // 🐼 MUNCUL lagi
    setState("idle");
  }
}

/* =========================
   ENTER HANDLER
   (FIX: auto send message)
========================= */
function handleEnter(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    sendMessage();
  }
}

/* =========================
   SEND MESSAGE
========================= */
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
      addMessage("Maaf, saya belum menemukan informasi tersebut.", "bot");
      setState("sad");
    }

  }, 500);
}

/* =========================
   SMART SEARCH ENGINE
========================= */
function getAnswer(text) {

  text = text.toLowerCase();

  for (let item of faqData) {

    if (!item) continue;

    // PRIORITY 1: keyword match
    if (item.keyword) {

      const keys = item.keyword.toLowerCase().split(";");

      for (let k of keys) {
        if (text.includes(k.trim())) {
          return item.answer;
        }
      }
    }

    // PRIORITY 2: question match
    if (item.question && text.includes(item.question.toLowerCase())) {
      return item.answer;
    }
  }

  return null;
}

/* =========================
   CHAT UI RENDER
========================= */
function addMessage(text, type) {

  const box = document.getElementById("chat-box");

  const div = document.createElement("div");
  div.classList.add("msg", type);
  div.innerText = text;

  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}
