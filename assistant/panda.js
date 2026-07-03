let pandaState = "idle";
let idleTimer = null;

/* =========================
   MAIN STATE CONTROLLER
========================= */
function setState(state) {
  pandaState = state;

  const face = document.getElementById("panda-face");
  const dot = document.getElementById("status-dot");

  if (!face || !dot) return;

  // reset animasi
  face.classList.remove("shake", "bounce", "sleeping", "pulse", "blink");

  switch (state) {

    case "idle":
      face.innerText = "🐼";
      dot.style.background = "#4caf50";
      startIdleBehavior();
      break;

    case "thinking":
      face.innerText = "🤔";
      dot.style.background = "#ffb300";
      face.classList.add("pulse");
      resetIdle();
      break;

    case "happy":
      face.innerText = "😄";
      dot.style.background = "#00c853";
      face.classList.add("bounce");
      resetIdle();
      break;

    case "sad":
      face.innerText = "😢";
      dot.style.background = "#e53935";
      face.classList.add("shake");
      resetIdle();
      break;

    case "sleep":
      face.innerText = "😴";
      dot.style.background = "#90a4ae";
      face.classList.add("sleeping");
      resetIdle();
      break;

    default:
      face.innerText = "🐼";
      dot.style.background = "#4caf50";
      startIdleBehavior();
      break;
  }
}

/* =========================
   IDLE BEHAVIOR (AUTO ANIMATION)
========================= */
function startIdleBehavior() {

  resetIdle();

  idleTimer = setTimeout(() => {

    const face = document.getElementById("panda-face");
    if (!face) return;

    // random blink / idle reaction
    const moods = ["blink", "thinking"];
    const pick = moods[Math.floor(Math.random() * moods.length)];

    if (pick === "thinking") {
      face.innerText = "🤔";
      face.classList.add("pulse");
    } else {
      face.innerText = "🐼";
      face.classList.add("blink");
    }

  }, 5000);
}

function resetIdle() {
  if (idleTimer) {
    clearTimeout(idleTimer);
    idleTimer = null;
  }
}

/* =========================
   OPTIONAL GET STATE
========================= */
function getPandaState() {
  return pandaState;
}

/* =========================
   QUICK EMOTION TRIGGERS
========================= */
function happyPanda() {
  setState("happy");
}

function sadPanda() {
  setState("sad");
}

function thinkingPanda() {
  setState("thinking");
}

function sleepPanda() {
  setState("sleep");
}

/* =========================
   FUTURE READY (HOOK SYSTEM)
========================= */
function triggerEmotion(type) {
  setState(type);
}

/* =========================
   GLOBAL ACCESS
========================= */
window.setState = setState;
window.getPandaState = getPandaState;

window.happyPanda = happyPanda;
window.sadPanda = sadPanda;
window.thinkingPanda = thinkingPanda;
window.sleepPanda = sleepPanda;
window.triggerEmotion = triggerEmotion;
