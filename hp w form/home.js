document.addEventListener('DOMContentLoaded', function() {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const popupContainer = document.getElementById('popupContainer');
        const popupBackdrop = document.getElementById('popupBackdrop');
        const loginBtn = document.getElementById('loginBtn');
        const closeBtn = document.getElementById('closeBtn');
    
        // Toggle sign up and sign in panels
        signUpButton.addEventListener('click', () => {
            popupContainer.classList.add("right-panel-active");
        });
    
        signInButton.addEventListener('click', () => {
            popupContainer.classList.remove("right-panel-active");
        });
    
        // Show popup when login button is clicked
        loginBtn.addEventListener('click', function(event) {
            event.preventDefault();
            popupContainer.classList.add('active');
            popupBackdrop.classList.add('active');
            document.body.classList.add('popup-active');
        });
    
        // Close popup when close button is clicked
        closeBtn.addEventListener('click', function() {
            popupContainer.classList.remove('active');
            popupBackdrop.classList.remove('active');
            document.body.classList.remove('popup-active');
        });
    
        // Close popup when backdrop is clicked
        popupBackdrop.addEventListener('click', function() {
            popupContainer.classList.remove('active');
            popupBackdrop.classList.remove('active');
            document.body.classList.remove('popup-active');
        });
    
        // Change close button color based on panel
        function changeCloseButtonColor(theme) {
            if (theme === 'dark') {
                closeBtn.style.color = '#ffffff';
            } else {
                closeBtn.style.color = '#000000';
            }
        }
    
        signInButton.addEventListener('click', function() {
            changeCloseButtonColor('dark');
        });
        
        signUpButton.addEventListener('click', function() {
            changeCloseButtonColor('light');
        });
    
        // Initial color setup
        changeCloseButtonColor('dark');
    
        // Handle login form submission
        document.getElementById('loginForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;
    
            fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            })
            .then(response => response.json())
            .then(data => alert(data.message))
            .catch(error => {
                console.error('Fetch error:', error);
                alert('Error: ' + error.message);
            });
        });
    
        // Handle signup form submission
        document.getElementById('signupForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('signupUsername').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
    
            fetch('http://localhost:3000/save-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            })
            .then(response => response.json())
            .then(data => alert(data.message))
            .catch(error => {
                console.error('Fetch error:', error);
                alert('Error: ' + error.message);
            });
        });
    });