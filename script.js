// Define the text to be typed
const textArray = ["Joy Wamaitha,"];
let textIndex = 0; // Index of the current text
let charIndex = 0; // Index of the current character
const typingDelay = 100; // Delay in milliseconds between typing characters
const newTextDelay = 1000; // Delay before typing the next text
const content = document.querySelector(".content");
const h1 = content.querySelector("h1");

function type() {
    if (charIndex < textArray[textIndex].length) {
        h1.textContent += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        h1.textContent = textArray[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, typingDelay);
    } else {
        textIndex = (textIndex + 1) % textArray.length;
        setTimeout(type, typingDelay);
    }
}

// Start the typing animation when the document is loaded
document.addEventListener("DOMContentLoaded", type);


