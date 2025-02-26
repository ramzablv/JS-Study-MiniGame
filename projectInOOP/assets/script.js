let screen = new Screen(document.querySelector('.screen'));

let char = new Knight('Robstofolis');
let monster = new Goblin();

const stage = new Stage(
  char,
  monster,
  document.querySelector('#char'),
  document.querySelector('#monster'),
  screen
);

stage.start();

