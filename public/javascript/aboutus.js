const uberEatsAd = document.getElementById("uber-eats-ad");             // constant that is the uber eats ad
const deliveryMusic = new Audio("./audio/uber_eats_jingle.mp3");       // constant for deliveryMusic to play when ad is clicked

// Event Listener for clicking the ad
uberEatsAd.addEventListener('click', () => {                            // upon clicking the add play delivery music
    deliveryMusic.play();
    deliveryMusic.onended = function() {                                // when music ends, change page to order online
    window.location.href = "./orderonline.html";
    };
});

// Image Carousel
let slideIndex = 0;
carousel();

function carousel() {
    let i;
    let x = document.getElementsByClassName("aboutUsSlides");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > x.length) {slideIndex = 1}
    x[slideIndex-1].style.display = "block";
    setTimeout(carousel, 5000); // Change image every 5 seconds
}

