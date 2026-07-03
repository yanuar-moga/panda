window.onload = () => {

  setState("idle");

  // demo animasi otomatis (sementara)
  setTimeout(() => setState("thinking"), 2000);

  setTimeout(() => setState("happy"), 4000);

  setTimeout(() => setState("idle"), 6000);

};
