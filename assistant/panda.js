let pandaState = "idle";

/* =========================
   STATE ENGINE
========================= */
function setState(state) {
  pandaState = state;

  const status = document.getElementById("status");
  const panda = document.getElementById("panda");

  const eyeL = document.getElementById("eyeL");
  const eyeR = document.getElementById("eyeR");

  console.log("Panda state:", state);

  switch (state) {

    /* =======================
       IDLE (normal)
    ======================= */
    case "idle":
      status.innerText = "PANDA siap membantu 👋";

      setEyeOpen();
      setMouth("smile");
      break;

    /* =======================
       THINKING
    ======================= */
    case "thinking":
      status.innerText = "🤔 Sedang mencari informasi...";

      setEyeHalf();
      setMouth("thinking");
      break;

    /* =======================
       HAPPY
    ======================= */
    case "happy":
      status.innerText = "😄 Saya menemukan jawabannya!";

      setEyeOpen();
      setMouth("happy");
      break;

    /* =======================
       SAD / NOT FOUND
    ======================= */
    case "sad":
      status.innerText = "😢 Maaf, belum ada informasi";

      setEyeHalf();
      setMouth("sad");
      break;

    /* =======================
       SLEEP
    ======================= */
    case "sleep":
      status.innerText = "😴 Zzz...";

      setEyeSleep();
      setMouth("sleep");
      break;
  }
}

/* =========================
   EYE STATES
========================= */
function setEyeOpen() {
  const eyeL = document.getElementById("eyeL");
  const eyeR = document.getElementById("eyeR");

  eyeL.setAttribute("ry", "15");
  eyeR.setAttribute("ry", "15");
}

function setEyeHalf() {
  const eyeL = document.getElementById("eyeL");
  const eyeR = document.getElementById("eyeR");

  eyeL.setAttribute("ry", "8");
  eyeR.setAttribute("ry", "8");
}

function setEyeSleep() {
  const eyeL = document.getElementById("eyeL");
  const eyeR = document.getElementById("eyeR");

  eyeL.setAttribute("ry", "2");
  eyeR.setAttribute("ry", "2");
}

/* =========================
   MOUTH STATES
========================= */
function setMouth(type) {

  const mouth = document.getElementById("mouth");

  switch (type) {

    case "smile":
      mouth.setAttribute("d", "M80 120 Q100 140 120 120");
      break;

    case "thinking":
      mouth.setAttribute("d", "M85 130 Q100 110 115 130");
      break;

    case "happy":
      mouth.setAttribute("d", "M75 115 Q100 150 125 115");
      break;

    case "sad":
      mouth.setAttribute("d", "M80 135 Q100 120 120 135");
      break;

    case "sleep":
      mouth.setAttribute("d", "M85 125 Q100 125 115 125");
      break;
  }
}

/* =========================
   COMPATIBILITY WRAPPER
   (biar aman dengan app.js)
========================= */
window.setState = setState;
