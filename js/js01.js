var imgs = document.querySelectorAll("section>ul>li"); // Get the image boxes - the result is an array
console.log(imgs);
var len = imgs.length; // Number of images

var current = 0; // Initial index of the main image
var timer; // Timer variable

change();
bind();
autoplay();

// Function to change the main image
function change() {
    // Divide the images into two groups on the left and right sides - equal quantity in each group
    var mlen = Math.floor(len / 2);
    for (var i = 0; i < mlen; i++) {
        // Get the indices of the images on the left and right sides of the main image
        // Note: When the number of images is even, there will be a case where limg = rimg
        var limg = len + current - i - 1;
        var rimg = current + i + 1;
        if (limg >= len) {
            limg -= len;
        }
        if (rimg >= len) {
            rimg -= len;
        }

        // Set the transform for the images on the left and right sides of the main image
        if (rimg != limg) {
            imgs[limg].style.transform = `translateX(${-200 * (i + 1)}px) translateZ(${200 - i * 100}px) rotateY(30deg) scale(${1 - (0.1 * (i + 1))})`;
            imgs[rimg].style.transform = `translateX(${200 * (i + 1)}px) translateZ(${200 - i * 100}px) rotateY(-30deg) scale(${1 - (0.1 * (i + 1))})`;
        } else {
            // Set the transform for the special case when rimg = limg
            imgs[limg].style.transform = `translateZ(0px)`;
        }
        // Set the transform for the main image
        imgs[current].style.transform = `translateZ(300px)`;
    }
}

// Set the event bindings
function bind() {
    // Get the index of the clicked image, assign it to current (index of the main image), and call the change function
    for (var i = 0; i < len; i++) {
        (function (i) {
            imgs[i].onclick = function () {
                current = i;
                change();
            };
        })(i);
        // Stop the timer when the mouse enters an image
        imgs[i].onmouseenter = function () {
            clearInterval(timer);
        };
        // Start the timer when the mouse leaves an image - autoplay is the function that encapsulates the timer
        imgs[i].onmouseout = function () {
            autoplay();
        };
    }
}

// Encapsulate the timer
function autoplay() {
    timer = setInterval(function () {
        if (current >= len - 1) {
            current = 0;
        } else {
            current++;
        }
        change();
    }, 2000);
}
