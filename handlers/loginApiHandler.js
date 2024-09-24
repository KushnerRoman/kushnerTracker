 ('Script started');
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
     ('DOM fully loaded');
  }, 100);
   ('DOM fully loaded');


  const loginForm = document.getElementById('myLoginForm');
   ('Login form:', loginForm);
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
       ('Form submitted');

      const passwordInput = document.getElementById('fpassword').value;
      const emailInput = document.getElementById('femail').value;
       ('Password input:', passwordInput);
       ('email input:', emailInput);

      try {
        const response = await fetch('/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email:emailInput, password: passwordInput }),
        });
        const data = await response.json();
         console.log('Response data:', data);
          
        if (data.success) {
          console.log('Login successful, redirecting to:', data.redirectUrl);
          window.location.href = data.redirectUrl;
        } else {
          console.log('Login failed:', data.error);
          // TODO : Handle login failure (e.g., show an error message to the user)
        }
      } catch (error) {
        console.log('Fetch error:', error);
        // Handle network errors or other exceptions
      }
    });
  } else {
    console.log('Login form not found');
  }

 


});