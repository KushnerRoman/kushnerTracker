console.log('Script started');
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    console.log('DOM fully loaded');
  }, 100);
  console.log('DOM fully loaded');


  const loginForm = document.getElementById('myLoginForm');
  console.log('Login form:', loginForm);
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      console.log('Form submitted');

      const passwordInput = document.getElementById('fpassword').value;
      console.log('Password input:', passwordInput);

      try {
        const response = await fetch('/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: passwordInput }),
        });
        const data = await response.json();
        console.log('Response data:', data);

        if (data.success) {
          console.log('Login successful, redirecting to:', data.redirectUrl);
          window.location.href = data.redirectUrl;
        } else {
          console.error('Login failed:', data.error);
          // TODO : Handle login failure (e.g., show an error message to the user)
        }
      } catch (error) {
        console.error('Fetch error:', error);
        // Handle network errors or other exceptions
      }
    });
  } else {
    console.error('Login form not found');
  }

 


});