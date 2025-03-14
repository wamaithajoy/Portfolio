document.addEventListener("DOMContentLoaded", function () {
    /* Typing Effect */
    let charIndex = 0;
    const typingDelay = 100;
    const textToType = "Hello there 😊";
    const dynamicText = document.getElementById("dynamic-text");

    function type() {
        if (charIndex < textToType.length) {
            dynamicText.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        }
    }
    type();

    /* Contact Form Submission */
    document.getElementById("contactForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent page reload

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            alert("❌ Please fill in all fields.");
            return;
        }

        // Send data to Flask server
        fetch("http://127.0.0.1:5000/save_message", {  // ✅ Use Flask route
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name, email: email, message: message })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById("confirmationMessage").style.display = "block"; // ✅ Show confirmation
                document.getElementById("contactForm").reset(); // ✅ Clear form fields
            } else {
                alert("❌ Error: " + data.error);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("❌ Failed to send message. Please try again.");
        });
    });

    /* Scroll to Section */
    function scrollToSection() {
        window.scrollBy({
            top: window.innerHeight, // Scrolls to the next section
            behavior: "smooth"
        });
    }

    // Attach scrollToSection to the button click event
    const scrollButton = document.querySelector('.scroll-down');
    if (scrollButton) {
        scrollButton.addEventListener('click', scrollToSection);
    }

    /* Active Section Highlighting */
    let sections = document.querySelectorAll("section");
    let navLinks = document.querySelectorAll(".navbar ul li a");

    function highlightNav() {
        let scrollY = window.scrollY;

        sections.forEach((section) => {
            let offset = section.offsetTop - 150;
            let height = section.offsetHeight;
            let id = section.getAttribute("id");

            if (scrollY >= offset && scrollY < offset + height) {
                navLinks.forEach((link) => link.classList.remove("active"));

                let activeLink = document.querySelector(`.navbar ul li a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add("active");
                }
            }
        });
    }

    // Update active link on scroll
    window.addEventListener("scroll", highlightNav);
});
