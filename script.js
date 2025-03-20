document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Stop the form from refreshing the page

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
        body: JSON.stringify(formData) // Convert data to JSON format
    })
    .then(response => response.json())
    .then(data => {
        responseMessage.innerHTML = "✅ " + data.message;
        responseMessage.style.color = "green";

        // Clear form fields
        document.getElementById("contactForm").reset();

        // Hide message after 2 seconds
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


/* Scroll to Section */
function scrollToSection() {
    window.scrollBy({
        top: window.innerHeight,
        behavior: "smooth" // Makes scrolling smooth
    });
}

const scrollButton = document.querySelector('.scroll-down');
if (scrollButton) {
    scrollButton.addEventListener('click', scrollToSection);
}

/* Active Section Highlighting */
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

// Add event listener for scroll event
window.addEventListener("scroll", highlightNav);

// Add missing 'name' attributes to your form inputs
document.querySelector("#name").setAttribute("name", "name");
document.querySelector("#email").setAttribute("name", "email");