let pandaState = "idle";

function setState(state) {
  pandaState = state;

  const panda = document.getElementById("panda");
  const status = document.getElementById("status");

  console.log("Panda state:", state);

  switch (state) {

    case "idle":
      panda.innerText = "🐼";
      status.innerText = "SIPANDA siap membantu";
      break;

    case "thinking":
      panda.innerText = "🤔";
      status.innerText = "Sedang mencari informasi...";
      break;

    case "happy":
      panda.innerText = "😄";
      status.innerText = "Saya menemukan jawabannya!";
      break;

    case "sad":
      panda.innerText = "😢";
      status.innerText = "Maaf, belum ada informasi";
      break;

    case "sleep":
      panda.innerText = "😴";
      status.innerText = "Zzz...";
      break;
  }
}
