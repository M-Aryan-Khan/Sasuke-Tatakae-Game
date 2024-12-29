document.addEventListener("DOMContentLoaded", function () {
    var button = document.getElementById("start");
    var sound = document.getElementById("hoverSound");
    var Isound = document.getElementById("introSound");
    var container = document.getElementById("container");
    var countdownElement = document.getElementById("countdown");
    var fadeOutElement = document.getElementById("fadeOut");
    button.addEventListener("click", function () {
        sound.currentTime = 0;
        sound.play();

        setTimeout(function () {
            container.style.visibility = "visible";
        }, 1000);
        setTimeout(function () {
            container.style.visibility = "hidden";
        }, 10000);
        var countdownValue = 10;
        countdownElement.textContent = countdownValue + "...";

        var countdownInterval = setInterval(function () {
            countdownValue--;
            countdownElement.textContent = countdownValue + "...";

            if (countdownValue <= 0) {
                clearInterval(countdownInterval);
                container.style.visibility = "hidden";
                fadeOutElement.classList.add('fade-in');
                setTimeout(function () {
                    window.location.href = "gameIndex.html";
                }, 1000);
            }
        }, 1000);
    });
});
document.body.addEventListener('click', function() {
    var audio = document.getElementById('introSound');
    audio.currentTime = 0;
    audio.play().then(function() {
        console.log('Audio is playing');
        document.getElementById('instruction').style.display = 'none';
    }).catch(function(error) {
        console.log('Autoplay was prevented:', error);
    });
    document.body.removeEventListener('click', arguments.callee);
}, { once: true });