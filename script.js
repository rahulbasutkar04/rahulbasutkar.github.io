document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const form = this;
    const formData = new FormData(form);

    fetch('https://formspree.io/f/xwpelyvk', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
        if (data.ok) {
            alert('Message sent!');
            form.reset(); // Reset the form on success
        } else {
            // Display error if response is not okay
            alert('There was a problem with your submission. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was a problem with your submission. Please try again.');
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const thankYou = document.getElementById("thank-you");

    window.addEventListener("scroll", function () {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
            thankYou.classList.add("show");
        } else {
            thankYou.classList.remove("show");
        }
    });
});


