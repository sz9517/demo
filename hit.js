 holes = document.querySelectorAll('.hole');
 scoreBoard = document.querySelector('.score');
 moles = document.querySelectorAll('.mole');
 button = document.querySelector('#start');
 var lastHole;
 var timeUp = false;
 var score = 0;

 function randomTime(min, max) {
     return Math.round(Math.random() * (max - min) + min);
 }

 //隨機洞
 function randomHole(holes) {
     idx = Math.floor(Math.random() * holes.length);
     hole = holes[idx];

     if (hole === lastHole) {
         console.log('Same one');
         return randomHole(holes);
     }

     lastHole = hole;
     return hole;
 }

 //地鼠出洞換洞 時間到停止
 function peep() {
     time = randomTime(200, 1000);
     hole = randomHole(holes);
     hole.classList.add('up');
     setTimeout(() => {
         hole.classList.remove('up');
         if (!timeUp) peep();
     }, time);
 }

 function startGame() {
     scoreBoard.textContent = 0;
     timeUp = false;
     score = 0;
     button.style.visibility = 'hidden';
     peep();
     setTimeout(() => {
         timeUp = true;
         button.innerHTML = '再試一次吧';
         button.style.visibility = 'visible';
     }, 10000);
 }

 function bonk(e) {
     if (!e.isTrusted) return;
     score++;
     this.classList.remove('up');
     scoreBoard.textContent = score;
 }

 moles.forEach(mole => mole.addEventListener('click', bonk));