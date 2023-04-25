const uberEatsAd = document.getElementById("uber-eats-ad");             // constant that is the uber eats ad
const deliveryMusic = new Audio("./audio/uber_eats_jingle.mp3");       // constant for deliveryMusic to play when ad is clicked

// Event Listener for clicking the ad
uberEatsAd.addEventListener('click', () => {                            // upon clicking the add play delivery music
    deliveryMusic.play();
    deliveryMusic.onended = function() {
    window.location.href = "./orderonline.html";
    };
});


