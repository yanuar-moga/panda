let pandaState = "idle";

function setState(state) {
  pandaState = state;

  const face = document.getElementById("panda-face");
  const dot = document.getElementById("status-dot");

  // safety check (biar tidak error kalau DOM belum siap)
  if (!face || !dot) return;

  switch (state) {

    case "idle":
      face.innerText = "🐼";
      dot.style.background = "#4caf50";
      break;

    case "thinking":
      face.innerText = "🤔";
      dot.style.background = "#ffb300";
      break;

    case "happy":
      face.innerText = "😄";
      dot.style.background = "#00c853";
      break;

    case "sad":
      face.innerText = "😢";
      dot.style.background = "#e53935";
      break;

    case "sleep":
      face.innerText = "😴";
      dot.style.background = "#90a4ae";
      break;

    default:
      face.innerText = "🐼";
      dot.style.background = "#4caf50";
      break;
  }
}

/* =========================
   GLOBAL ACCESS
========================= */
window.setState = setState;
