// knight or sorcerer
// goblin or beholder

class Character {

  _life = 1;
  maxLife = 1;
  attack = 0;
  defense = 0;

  constructor(name) {
    this.name = name;
  }

  get life() {
    return this._life;
  }

  set life(newLife) {
    this._life = newLife < 0 ? 0 : newLife;
  }
}

class Knight extends Character {
  constructor(name) {
    super(name);
    this.life = 100;
    this.attack = 10;
    this.defense = 8;
    this.maxLife = this.life;
  }
}

class Sorcerer extends Character {
  constructor(name) {
    super(name);
    this.life = 80;
    this.attack = 15;
    this.defense = 4;
    this.maxLife = this.life;
  }
}

class Goblin extends Character {
  constructor() {
    super('Goblin');
    this.life = 40;
    this.attack = 4;
    this.defense = 4;
    this.maxLife = this.life;
  }
}

class Beholder extends Character {
  constructor() {
    super('Beholder');
    this.life = 60;
    this.attack = 16;
    this.defense = 6;
    this.maxLife = this.life;
  }
}

//stage class

class Stage {
  constructor(fighter1, fighter2, fighter1El, fighter2El, logObjects) {
    this.fighter1 = fighter1;
    this.fighter2 = fighter2;
    this.fighter1El = fighter1El;
    this.fighter2El = fighter2El;
    this.log = logObjects;
  }

  start() {
    this.update();

    this.fighter1El.querySelector('.attackbutton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));
    this.fighter2El.querySelector('.attackbutton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1));

  }

  update() {
    //fighter 1 
    this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(1)} HP`;
    let f1pct = (this.fighter1.life / this.fighter1.maxLife) * 100;
    this.fighter1El.querySelector('.bar').style.width = `${f1pct}%`;

    //fighter 2
    this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(1)} HP`;
    let f2pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
    this.fighter2El.querySelector('.bar').style.width = `${f2pct}%`;
  }

  doAttack(attacking, attacked) {
    if (attacking.life <= 0 || attacked.life <= 0) {
      this.log.addMessage('ja está morto.')
      return;
    }

    let attackFactor = (Math.random() * 2).toFixed(2);
    let defenseFactor = (Math.random() * 2).toFixed(2);

    let actualAttack = attacking.attack * attackFactor;
    let actualDefense = attacked.defense * defenseFactor;

    if (actualAttack > actualDefense) {
      attacked.life -= actualAttack;
      this.log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(2)} de dano em ${attacked.name}`)
    } else {
      this.log.addMessage(`${attacked.name} conseguiu defender`)
    }

    this.update();
  }
}

class Screen {
  list = [];

  constructor(listEl) {
    this.listEl = listEl;
  }

  addMessage(msg) {
    this.list.push(msg);
    this.render();
  }

  render() {
    this.listEl.innerHTML = '';
    for (let i in this.list) {
      this.listEl.innerHTML += `<li>${this.list[i]}</li>`
    }
  }
}
