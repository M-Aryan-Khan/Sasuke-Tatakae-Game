function countdown() {
    var over = document.getElementById("over");
    over.currentTime = 0;
    over.play();
    let gameStats = localStorage.getItem('gameStats');
    if (gameStats !== null) {
        gameStats = JSON.parse(gameStats);
        let scoreP = document.getElementById('scoreP');
        let scoreS = document.getElementById('scoreS');
        let scoreB = document.getElementById('scoreB');
        let h1e = scoreP.querySelector('h1');
        h1e.innerText = gameStats.scoreP;
        h1e = scoreS.querySelector('h1');
        h1e.innerText = gameStats.objectsDestroyed;
        h1e = scoreB.querySelector('h1');
        h1e.innerText = gameStats.bossesDefeated;
        localStorage.removeItem('gameStats');
    }
    var countdownElement = document.getElementById("countdown");
    var fadeOutElement = document.getElementById("fadeOut");
    var countdownValue = 10;
    countdownElement.textContent = countdownValue + "...";

    var countdownInterval = setInterval(function () {
        countdownValue--;
        countdownElement.textContent = countdownValue + "...";

        if (countdownValue <= 0) {
            clearInterval(countdownInterval);
            fadeOutElement.classList.add('fade-in');
            setTimeout(function () {
                window.location.href = "index.html";
            }, 1000);
        }
    }, 1000);
}

countdown();