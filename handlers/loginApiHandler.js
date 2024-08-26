const loginForm = document.getElementById('myLoginForm');
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
 // const emailInput = document.getElementById('email').value;

 console.log('Login api handler before fetching')
  const passwordInput = document.getElementById('fpassword').value;

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: passwordInput }),
    });
    const data = await response.json();
    console.log(data); 
  } catch (error) {
    console.error(error);
  }
});
