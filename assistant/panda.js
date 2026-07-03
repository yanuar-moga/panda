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

  // reset anim class (kalau nanti mau upgrade animasi)
  face.classList.remove("shake", "bounce", "sleeping");

  switch (state) {

    case "idle":
      face.innerText = "🐼";
      dot.style.background = "#4caf50";
      break;

    case "thinking":
      face.innerText = "🤔";
      dot.style.background = "#ffb300";
      face.classList.add("bounce");
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
   OPTIONAL: FUTURE HOOK
   (untuk upgrade tahap 6 nanti)
========================= */
function getPandaState() {
  return pandaState;
}

/* =========================
   GLOBAL ACCESS
========================= */
window.setState = setState;
window.getPandaState = getPandaState;
