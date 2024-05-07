document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Get the values from the form fields
        const regNo = document.getElementById('regNo').value;
        const dob = document.getElementById('dob').value;

        // Perform some validation if needed

        // Simulate a successful login for demonstration purposes
        // Replace this with your actual login logic
        const isLoggedIn = true; // Assume the user is logged in successfully

        if (isLoggedIn) {
            // Redirect to index.html
            window.location.href = 'index.html';
        } else {
            // Handle unsuccessful login (e.g., display error message)
            alert('Login failed. Please check your credentials and try again.');
        }
    });
});
