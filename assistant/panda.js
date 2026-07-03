let pandaState = "idle";

/* =========================
   MAIN STATE CONTROLLER
========================= */
function setState(state) {
  pandaState = state;

  const face = document.getElementById("panda-face");
  const dot = document.getElementById("status-dot");

  // safety check
  if (!face || !dot) return;

  // reset anim class
  face.classList.remove("shake", "bounce", "sleeping", "pulse");

  switch (state) {

    case "idle":
      face.innerText = "🐼";
      dot.style.background = "#4caf50";
      break;

    case "thinking":
      face.innerText = "🤔";
      dot.style.background = "#ffb300";
      face.classList.add("pulse");
      break;

    case "happy":
      face.innerText = "😄";
      dot.style.background = "#00c853";
      face.classList.add("bounce");
      break;

    case "sad":
      face.innerText = "😢";
      dot.style.background = "#e53935";
      face.classList.add("shake");
      break;

    case "sleep":
      face.innerText = "😴";
      dot.style.background = "#90a4ae";
      face.classList.add("sleeping");
      break;

    default:
      face.innerText = "🐼";
      dot.style.background = "#4caf50";
      break;
  }
}

/* =========================
   OPTIONAL: GET STATE
========================= */
function getPandaState() {
  return pandaState;
}

/* =========================
   FUTURE: QUICK EMOTION TRIGGERS
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

/* =========================
   GLOBAL ACCESS
========================= */
window.setState = setState;
window.getPandaState = getPandaState;

window.happyPanda = happyPanda;
window.sadPanda = sadPanda;
window.thinkingPanda = thinkingPanda;
