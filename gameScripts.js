const sasuke = document.getElementById("sasuke");
let cactus = document.getElementById("spike-cut");
let SPressed = false;
var charStamina = document.getElementById("charStamina");
var charHealth = document.getElementById("charHealth");
var skullHealth = document.getElementById("skullHealth");
var skullFrame = document.getElementById("skullFrame");
var score = document.getElementById("ScoreValue");
let boss = false;
let character = document.getElementById("skeleton");
let direction = 1;
let speed = 6;
let intervalId;
let left = true;
let leftS = false;
let keyHold = true;
let isJumping = false;
let isPunching = false;
let isAlive;
let recentlyHit = false;
let boss2 = false;
let countSpike = 0;
let countBoss = 0;
var fadeOutElement = document.getElementById("fadeOut");
var jumpSound = document.getElementById("jumpSound");
var audio = document.getElementById('bg');
var punchS = document.getElementById('punch');
var hit = document.getElementById('hit');
var crack = document.getElementById('crack');

function jump() {
  jumpSound.currentTime = 0;
  jumpSound.play();
  if (!sasuke.classList.contains("jumpR") && !sasuke.classList.contains("jumpL") && !isJumping && charStamina.value >= 5) {
    isJumping = true;
    charStamina.value = parseInt(charStamina.value) - 5;
    let sasukeTop = parseInt(window.getComputedStyle(sasuke).getPropertyValue("top"));
    const t = sasukeTop - 230;
    let sasukeBottom = parseInt(window.getComputedStyle(sasuke).getPropertyValue("bottom"));
    const b1 = sasukeBottom + 580;
    const b2 = sasukeBottom + 600;
    const b3 = sasukeBottom + 620;
    const b4 = sasukeBottom + 640;
    const b5 = sasukeBottom + 660;
    if (left) {
      sasuke.classList.add("jumpL");
      sasuke.style.setProperty('--jump-offsett', `${t}px`);
      sasuke.style.setProperty('--jump-offsetb1', `${b1}px`);
      sasuke.style.setProperty('--jump-offsetb2', `${b2}0px`);
      sasuke.style.setProperty('--jump-offsetb3', `${b3}px`);
      sasuke.style.setProperty('--jump-offsetb4', `${b4}px`);
      sasuke.style.setProperty('--jump-offsetb5', `${b5}px`);
      setTimeout(function () {
        sasuke.classList.remove("jumpL");
        isJumping = false;
      }, 900);
    }
    else {
      sasuke.classList.add("jumpR");
      sasuke.style.setProperty('--jump-offsett', `${t}px`);
      sasuke.style.setProperty('--jump-offsetb1', `${b1}px`);
      sasuke.style.setProperty('--jump-offsetb2', `${b2}0px`);
      sasuke.style.setProperty('--jump-offsetb3', `${b3}px`);
      sasuke.style.setProperty('--jump-offsetb4', `${b4}px`);
      sasuke.style.setProperty('--jump-offsetb5', `${b5}px`);
      setTimeout(function () {
        sasuke.classList.remove("jumpR");
        isJumping = false;
      }, 900);
    }
  }
}

function punch() {
  punchS.currentTime = 0;
  punchS.play();
  if (!sasuke.classList.contains("punch") && !sasuke.classList.contains("jump") && charStamina.value >= 10 && !isPunching) {
    isPunching = true;
    charStamina.value = parseInt(charStamina.value) - 10;
    let sasukeTop = parseInt(window.getComputedStyle(sasuke).getPropertyValue("top"));
    sasuke.style.top = (sasukeTop + 40) + "px";
    if (left) {
      sasuke.classList.add("punchL");
      setTimeout(function () {
        sasuke.classList.remove("punchL");
        isPunching = false;
        sasuke.style.top = (sasukeTop) + "px";
      }, 900);
    }
    else {
      sasuke.classList.add("punchR");
      setTimeout(function () {
        sasuke.classList.remove("punchR");
        isPunching = false;
        sasuke.style.top = (sasukeTop) + "px";
      }, 900);
    }
  }
}
/*function superAttack()) {
  if (!sasuke.classList.contains("punch") && charStamina.value!=0) {
    sasuke.classList.add("punch");
    let leftM = parseInt(window.getComputedStyle(sasuke).getPropertyValue("left"));
    setTimeout(function () {
      sasuke.classList.remove("punch");
    }, 1200);
  }
}*/

function moveRight() {
  if (!isJumping) {
    let sasukeTop = parseInt(window.getComputedStyle(sasuke).getPropertyValue("top"));
    left = false;
    sasuke.style.backgroundImage = "url('img/narutoR.gif')";
    sasuke.style.width = 220 + "px";
    sasuke.style.height = 200 + "px";
    if (keyHold) {
      sasuke.style.top = (sasukeTop + 30) + "px";
      keyHold = false;
    }
    let leftM = parseInt(window.getComputedStyle(sasuke).getPropertyValue("left"));
    if (leftM <= 1256)
      sasuke.style.left = leftM + 20 + "px";
  }
}
function stopMoveRight() {
  let sasukeTop = parseInt(window.getComputedStyle(sasuke).getPropertyValue("top"));
  sasuke.style.backgroundImage = "url('img/naruto-standR.gif')";
  sasuke.style.width = 250 + "px";
  sasuke.style.height = 230 + "px";
  sasuke.style.top = 330 + "px";
  sasuke.style.top = (sasukeTop - 30) + "px";
  keyHold = true;
}

function moveLeft() {
  if (!isJumping) {
    left = true;
    let sasukeTop = parseInt(window.getComputedStyle(sasuke).getPropertyValue("top"));
    sasuke.style.backgroundImage = "url('img/narutoL.gif')";
    sasuke.style.width = 220 + "px";
    sasuke.style.height = 200 + "px";
    if (keyHold) {
      sasuke.style.top = (sasukeTop + 30) + "px";
      keyHold = false
    }
    let rightM = parseInt(window.getComputedStyle(sasuke).getPropertyValue("left"));
    if (rightM >= 0)
      sasuke.style.left = rightM - 20 + "px";
  }
}

function stopMoveLeft() {
  let sasukeTop = parseInt(window.getComputedStyle(sasuke).getPropertyValue("top"));
  sasuke.style.backgroundImage = "url('img/naruto-standL.gif')";
  sasuke.style.width = 250 + "px";
  sasuke.style.height = 230 + "px";
  sasuke.style.top = (sasukeTop - 30) + "px";
  keyHold = true;
}

function moveUp() {
  let top = parseInt(window.getComputedStyle(sasuke).getPropertyValue("top"));
  if (top > 150)
    sasuke.style.top = top - 15 + "px";
}

function moveDown() {
  let top = parseInt(window.getComputedStyle(sasuke).getPropertyValue("top"));
  if (top < 500)
    sasuke.style.top = top + 15 + "px";
}

document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    jump();
  }

  else if (event.key === "ArrowUp") {
    moveUp();
  }

  else if (event.key === "ArrowDown") {
    moveDown();
  }

  else if (event.key === "z") {
    punch();
  }

  else if (event.key === "ArrowRight") {
    moveRight();
  }

  else if (event.key === "ArrowLeft") {
    moveLeft();
  }

  else if (event.key === "s") {
    SPressed = true;
  }
});
document.addEventListener("keyup", function (event) {
  if (event.key === "ArrowRight") {
    stopMoveRight();
  }
  else if (event.key === "ArrowLeft") {
    stopMoveLeft();
  }
});
function saveGameStats(score, objectsDestroyed, bossesDefeated) {
  const gameStats = {
    scoreP: score,
    objectsDestroyed: objectsDestroyed,
    bossesDefeated: bossesDefeated
  };
  localStorage.setItem('gameStats', JSON.stringify(gameStats));
}

document.addEventListener("keydown", function startGame(event) {
  if (SPressed && event.key === "s") {
    audio.currentTime = 0;
    audio.play()
    isAlive = setInterval(function () {
      let sasukeTop = parseInt(window.getComputedStyle(sasuke).getPropertyValue("top"));
      let sasukeLeft = parseInt(window.getComputedStyle(sasuke).getPropertyValue("left"));

      let cactusTop = parseInt(window.getComputedStyle(cactus).getPropertyValue("top"));
      let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

      if ((sasuke.classList.contains("punchL") || sasuke.classList.contains("punchR")) &&
        cactusLeft < sasukeLeft + 200 && cactusLeft > sasukeLeft &&
        sasukeTop <= cactusTop - 20 && sasukeTop >= cactusTop - 275 && charStamina.value != 0) {
        score.innerText = parseInt(score.innerText) + 100;
        countSpike++;
        cactus.remove();
        if (parseInt(score.innerText) % 300 === 0 && parseInt(score.innerText) != 0) {
          boss = false;
          boss2 = false;
        }
        return;
      }

      if (cactusLeft < sasukeLeft + 200 && cactusLeft > sasukeLeft &&
        sasukeTop <= cactusTop - 20 && sasukeTop >= cactusTop - 275 && !recentlyHit) {
        hit.currentTime = 0;
        hit.play();
        recentlyHit = true;
        setTimeout(function () {
          charHealth.value = parseInt(charHealth.value) - 10;
          if (parseInt(charHealth.value) === 0) {
            var messageElement = document.createElement("div");
            messageElement.id = "popup";
            messageElement.innerText = "Game Over";
            document.body.appendChild(messageElement);
            saveGameStats(parseInt(score.innerText), countSpike, countBoss);
            setTimeout(function () {
              fadeOutElement.classList.add('fade-in');
            }, 2000);
            setTimeout(function () {
              window.location.href = "endIndex.html";
              fadeOutElement.classList.remove('fade-in');
            }, 4000);
          }
          setTimeout(function () {
            recentlyHit = false;
          }, 1000);
        }, 10);
      }
    }, 10);

    document.removeEventListener("keydown", startGame);
  }
});


function autoIncreaseStamina() {
  var currValue = parseInt(charStamina.value);
  charStamina.value = Math.min(currValue + 1, 200);
}
setInterval(autoIncreaseStamina, 500);

function autoGenerateSpike() {
  if (!boss) {
    cactus = document.createElement("div");
    cactus.id = "spike-cut";
    document.body.appendChild(cactus);
    let random = Math.floor(Math.random() * 401) + 300;
    cactus.style.top = random + "px";
  }
}
setInterval(autoGenerateSpike, 5000);

function autoRemoveSpike() {
  let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));
  if (cactusLeft > 1400) {
    cactus.remove();
  }
}
setInterval(autoRemoveSpike, 1);

function checkIfBossShouldArrive() {
  if (parseInt(score.innerText) % 600 === 0 && parseInt(score.innerText) != 0 && !boss && !boss2) {
    boss = true;
    character = document.createElement("div");
    character.id = "skeleton";
    document.body.appendChild(character);
    character.style.visibility = "visible";
    skullHealth.classList.remove("hidden");
    skullFrame.classList.remove("hidden");
  }
}
setInterval(checkIfBossShouldArrive, 1);

let randomInterval = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;

function attack() {
  if (boss) {
    if (leftS) {
      character.classList.add("attackL");
      setTimeout(function () {
        character.classList.remove("attackL");
      }, 800);
    }
    else {
      character.classList.add("attackR");
      setTimeout(function () {
        character.classList.remove("attackR");
      }, 800);
    }
  }
  randomInterval = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  console.log(randomInterval);
}

setInterval(attack, randomInterval);

function moveBoss() {
  if (boss) {
    let currentPosition = parseInt(window.getComputedStyle(character).left);
    if (currentPosition >= window.innerWidth - character.offsetWidth && direction === 1) {
      direction = -1;
      leftS = true;
      character.style.backgroundImage = "url('img/boss_walkL.gif')";
    }
    if (currentPosition <= 0 && direction === -1) {
      direction = 1;
      leftS = false;
      character.style.backgroundImage = "url('img/boss_walkR.gif')";
    }
    character.style.left = currentPosition + (speed * direction) + 'px';
    //jab skeleton ki top mai say uski height 220 minus karo tw wo 160 px banega which is div ka top border or sasuke 150 tak upper move karskta
  }
  else {
    character.classList.remove("attackR");
    character.classList.remove("attackL");
    character.style.backgroundImage = "url('img/boss_walkR.gif')";
    character.style.backgroundImage = "url('img/boss_walkL.gif')";
    character.style.visibility = "hidden";
    skullHealth.classList.add("hidden");
    skullFrame.classList.add("hidden");
  }
}
intervalId = setInterval(moveBoss, 10);

function checkBossAttack() {
  let sasukeLeft = parseInt(window.getComputedStyle(sasuke).getPropertyValue("left"));

  let bossLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));

  if ((sasuke.classList.contains("punchL") || sasuke.classList.contains("punchR")) && bossLeft > sasukeLeft + 50 && bossLeft < sasukeLeft + 200 &&
    charStamina.value != 0 && !recentlyHit) {
    recentlyHit = true;
    score.innerText = parseInt(score.innerText) + 500;
    skullHealth.value = parseInt(skullHealth.value) - 12.5;
    if (parseInt(skullHealth.value) === 0) {
      character.style.backgroundImage = "url('img/boss_death.gif')";
      speed = 0;
      setTimeout(function () {
        character.remove();
        skullHealth.classList.remove("hidden");
        skullFrame.classList.remove("hidden");
        skullHealth.value = 100;
        boss = false;
        boss2 = true;
        countBoss++;
      }, 1200);
    }
    crack.currentTime = 0;
    crack.play()
    setTimeout(function () {
      recentlyHit = false;
    }, 1000);
    return;
  }
  if (character.classList.contains("attackL") && bossLeft > sasukeLeft + 50 && bossLeft < sasukeLeft + 200 && !recentlyHit) {
    hit.currentTime = 0;
    hit.play();
    recentlyHit = true;
    charHealth.value = parseInt(charHealth.value) - 25;
    if (parseInt(charHealth.value) === 0) {
      var messageElement = document.createElement("div");
      messageElement.id = "popup";
      messageElement.innerText = "Game Over";
      document.body.appendChild(messageElement);
      saveGameStats(parseInt(score.innerText), countSpike, countBoss);
      setTimeout(function () {
        fadeOutElement.classList.add('fade-in');
      }, 2000);
      setTimeout(function () {
        window.location.href = "endIndex.html";
        fadeOutElement.classList.remove('fade-in');
      }, 4000);

    }
    setTimeout(function () {
      recentlyHit = false;
    }, 1000);
  }
  else if (character.classList.contains("attackR") && bossLeft > sasukeLeft + 50 && bossLeft < sasukeLeft + 200 && !recentlyHit) {
    hit.currentTime = 0;
    hit.play();
    recentlyHit = true;
    charHealth.value = parseInt(charHealth.value) - 25;
    if (parseInt(charHealth.value) === 0) {
      var messageElement = document.createElement("div");
      messageElement.id = "popup";
      messageElement.innerText = "Game Over";
      document.body.appendChild(messageElement);
      saveGameStats(parseInt(score.innerText), countSpike, countBoss);
      setTimeout(function () {
        fadeOutElement.classList.add('fade-in');
      }, 2000);
      setTimeout(function () {
        window.location.href = "endIndex.html";
        fadeOutElement.classList.remove('fade-in');
      }, 4000);

    }
    setTimeout(function () {
      recentlyHit = false;
    }, 1000);
  }
}

setInterval(checkBossAttack, 1);

audio.addEventListener('ended', function () {
  audio.currentTime = 0;
  audio.play().catch(function (error) {
    console.log('Autoplay was prevented:', error);
  });
});