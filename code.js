// Function to handle typing animation
const typeText = document.getElementById("type-text");
const textArray = ["Web Developer", "Designer", "Coder"]; // Add your desired texts
let textIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textIndex].length) {
        typeText.textContent += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 1000);
    }
}

function erase() {
    if (charIndex > 0) {
        typeText.textContent = textArray[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        textIndex = (textIndex + 1) % textArray.length;
        setTimeout(type, 500);
    }
}

// Start the typing animation
document.addEventListener("DOMContentLoaded", function () {
    if (textArray.length) setTimeout(type, 0); // Start immediately
});

// Function to update skill progress bars
const skillProgressBars = document.querySelectorAll('.skill-progress');

function updateSkillProgress() {
    skillProgressBars.forEach((progressBar) => {
        const skillLevel = parseFloat(progressBar.dataset.level);
        progressBar.style.width = `${skillLevel}%`;
        progressBar.innerText = `${skillLevel}%`; // Display the percentage
    })
}

// Animate skill bars on page load
document.addEventListener('DOMContentLoaded', () => {
    skillProgressBars.forEach((progressBar) => {
        const skillLevel = parseFloat(progressBar.dataset.level);
        progressBar.style.width = '0';
        setTimeout(() => {
            progressBar.style.width = `${skillLevel}%`;
            progressBar.innerText = `${skillLevel}%`;
        }, 1000); // Delay for animation
    });
});

// Call the function to initialize the progress bars
updateSkillProgress();



