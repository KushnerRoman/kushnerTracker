const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
 // const emailInput = document.getElementById('email').value;

 console.log('Login api handler before fetching')
  const passwordInput = document.getElementById('password').value;

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: passwordInput }),
    });
    const data = await response.json();
    console.log(data); // Do something with the server's response
  } catch (error) {
    console.error(error);
  }
});
