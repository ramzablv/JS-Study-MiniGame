const char = createKnight('Robstofolis');
const monster = createBeholder();

stage.start(
  char,
  monster,
  document.querySelector("#char"),
  document.querySelector('#monster')
)