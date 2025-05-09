document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault(); 

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();
    let responseMessage = document.getElementById("responseMessage");

    if (!name || !email || !message) {
        responseMessage.textContent = "❌ All fields are required!";
        responseMessage.style.color = "red";
        return;
    }

    let formData = {
        name: name,
        email: email,
        message: message
    };

    fetch("http://127.0.0.1:5000/submit_form", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData) 
    })
    .then(response => response.json())
    .then(data => {
        responseMessage.innerHTML = "✅ " + data.message;
        responseMessage.style.color = "green";

        document.getElementById("contactForm").reset();

        setTimeout(() => {
            responseMessage.textContent = "";
        }, 2000);
    })
    .catch(error => {
        console.error("Error:", error);
        responseMessage.textContent = "❌ Failed to send message. Please try again.";
        responseMessage.style.color = "red";
    });
});

function scrollToSection() {
    window.scrollBy({
        top: window.innerHeight,
        behavior: "smooth" 
    });
}

const scrollButton = document.querySelector('.scroll-down');
if (scrollButton) {
    scrollButton.addEventListener('click', scrollToSection);
}

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar ul li a");

function highlightNav() {
    let scrollY = window.scrollY;

    sections.forEach((section) => {
        const top = section.offsetTop - 50;
        const height = section.offsetHeight;
        let id = section.getAttribute("id");

        if (scrollY >= (section.offsetTop - 60) && scrollY < (section.offsetTop + section.offsetHeight)) {
            navLinks.forEach((link) => link.classList.remove("active"));
            const activeLink = document.querySelector(`.navbar ul li a[href="#${section.id}"]`);
            if (activeLink) {
                activeLink.classList.add("active");
            }
        }
    });
}

window.addEventListener("scroll", highlightNav);

document.querySelector("#name").setAttribute("name", "name");
document.querySelector("#email").setAttribute("name", "email");

document.addEventListener('DOMContentLoaded', function() {
    const projectsGrid = document.querySelector('.projects-grid');
    const projectBoxes = document.querySelectorAll('.project-box');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    let currentIndex = 0;
    const projectsPerPage = 4;
    const totalPages = Math.ceil(projectBoxes.length / projectsPerPage);

    function updateCarousel() {
        projectsGrid.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateArrowVisibility();
    }

    function updateArrowVisibility() {
        prevArrow.style.opacity = currentIndex === 0 ? '0.3' : '1';
        prevArrow.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
        nextArrow.style.opacity = currentIndex === totalPages - 1 ? '0.3' : '1';
        nextArrow.style.pointerEvents = currentIndex === totalPages - 1 ? 'none' : 'auto';
    }

    prevArrow.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextArrow.addEventListener('click', () => {
        if (currentIndex < totalPages - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    updateArrowVisibility();

    projectsGrid.style.width = `${totalPages * 100}%`;
});

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
  
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            console.log('Hamburger clicked'); 
        });
  
        document.querySelectorAll('.nav-menu li a').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    } else {
        console.error('Hamburger or nav-menu not found'); 
    }
});