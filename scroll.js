document.addEventListener("keydown", (e) => {
  let key = e.key;
  let nudge_size = 50;
  if (key === "ArrowDown") {
    document.body.scrollBy(0, nudge_size);
  }
  else if (key === "ArrowUp") {
    document.body.scrollBy(0, -nudge_size);
  }
});
