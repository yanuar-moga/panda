const API_URL = "https://script.google.com/macros/s/AKfycbz5phe5kCec9ipOW2OO1UzH4NW3j7cgdcY5rgS2dW9rjB2uEXwW3kf15X1arrXp4PMjKw/exec";

let faqData = [];
let chatOpen = false;

/* =========================
   LOAD DATABASE FROM SHEETS
========================= */
fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    faqData = data;
    console.log("SIPANDA DB loaded:", faqData);
  })
  .catch(err => console.error("Load error:", err));

/* =========================
   TOGGLE CHAT PANEL
========================= */
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

    // PRIORITY 1: keyword
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
   CHAT UI
========================= */
function addMessage(text, type) {

  const box = document.getElementById("chat-box");

  const div = document.createElement("div");
  div.classList.add("msg", type);
  div.innerText = text;

  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}
