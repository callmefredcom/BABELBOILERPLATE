document.addEventListener('DOMContentLoaded', function() {

fetch('/js_translations')
.then(response => response.json())
.then(data => {
translations = data;

        fetch('/is_logged_in')
        .then(response => response.json())
        .then(data => {
            if (data.is_logged_in) {
                let loginButton = document.getElementById('loginButton');
                let signupButton = document.getElementById('signupButton');
                let logoutButton = document.createElement('a');
                logoutButton.href = '/logout';
                logoutButton.id = 'logoutButton';
                logoutButton.className = 'bg-accent-color px-4 py-2 rounded';
                logoutButton.textContent = translations.logoutText;
                loginButton.replaceWith(logoutButton);
                signupButton.style.display = 'none';

                // Create account button
                let accountButton = document.createElement('a');
                accountButton.href = '/account';
                accountButton.id = 'accountButton';
                accountButton.className = 'bg-accent-color px-4 py-2 rounded mr-6';
                accountButton.textContent = translations.accountText; 

                // Insert account button before logout button
                logoutButton.parentNode.insertBefore(accountButton, logoutButton);
            }

            document.querySelector('form').addEventListener('submit', function(event) {
                event.preventDefault();

                var emailInput = document.querySelector('input[type="email"]');
                var email = emailInput.value;

                // Simple validation to check if the input is an email address
                if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
                    Swal.fire({
                        text: translations.validEmail,
                        icon: 'error'
                    });
                    return;
                }

                fetch('/email_signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: email })
                })
                .then(function(response) {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(function(data) {
                    if (data.success) {
                        // Get the translation for the success message
                        fetch('/js_translations')
                        .then(response => response.json())
                        .then(translations => {
                            Swal.fire({
                                title: translations.successTitle,
                                text: translations.successText,
                                icon: 'success'
                            });
                        });
                    } else {
                        throw new Error(data.error);
                    }
                })
                .catch(function(error) {
                    console.error('There has been a problem with your fetch operation:', error);
                });
            });


});


});




});