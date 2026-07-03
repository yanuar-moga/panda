window.onload = () => {

  setState("idle");

  startBlinkSystem();
  startIdleSystem();
  startActivityListener();
};

/* =========================
   BLINK SYSTEM
========================= */
function startBlinkSystem() {
  setInterval(() => {
    blink();
  }, random(2500, 4500));
}

function blink() {
  const eyeL = document.getElementById("eyeL");
  const eyeR = document.getElementById("eyeR");

  if (currentState === "sleep") return;

  // tutup mata
  eyeL.setAttribute("ry", "2");
  eyeR.setAttribute("ry", "2");

  setTimeout(() => {
    if (currentState !== "sleep") {
      eyeL.setAttribute("ry", "15");
      eyeR.setAttribute("ry", "15");
    }
  }, 150);
}

/* =========================
   IDLE SYSTEM
========================= */
let idleTime = 0;
let idleInterval;
let currentState = "idle";

function startIdleSystem() {

  idleInterval = setInterval(() => {

    idleTime++;

    // 10 detik tidak aktif → thinking
    if (idleTime === 10) {
      setState("thinking");
    }

    // 20 detik → sleep
    if (idleTime >= 20) {
      setState("sleep");
    }

  }, 1000);
}

/* =========================
   USER ACTIVITY DETECTOR
========================= */
function startActivityListener() {

  const events = ["mousemove", "keydown", "click", "touchstart"];

  events.forEach(ev => {
    document.addEventListener(ev, wakeUp);
  });
}

function wakeUp() {

  idleTime = 0;

  if (currentState === "sleep") {
    setState("idle");
  }
}

/* =========================
   STATE CONTROL WRAPPER
========================= */
function setState(state) {

  currentState = state;

  if (typeof window.setState === "function") {
    window.setState(state); 
  }
}

/* =========================
   UTILITY
========================= */
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
