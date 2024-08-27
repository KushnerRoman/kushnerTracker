

console.log('Script started');
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    console.log('DOM fully loaded');
  }, 100);
  console.log('DOM fully loaded');

  const addBillForm = document.getElementById('add-bill-form');
  
  addBillForm.addEventListener('reset', async(e)=>{
    e.preventDefault
    window.location.href = '/bills'
  })

  if (addBillForm) {
    addBillForm.addEventListener('submit', async (e) => {
      e.preventDefault
      console.log('Form submitted');

      const whoInput = document.getElementById('who').value;
      const whatInput = document.getElementById('what').value;
      const dateInput = document.getElementById('date').value;
      const descriptionInput = document.getElementById('description').value;
      const amountInput = document.getElementById('amount').value;

      console.log('who input:', whoInput);
      console.log('what input:', whatInput);
      console.log('date input:', dateInput);
      console.log('description input:', descriptionInput);
      console.log('amount input:', amountInput);

     try {
        const response = await fetch('/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ who: whoInput,
                                 what: whatInput,
                                 data: dateInput,
                                 describe: descriptionInput,
                                 amount: amountInput
                                    }),
        });
        const data = await response.json();
        console.log('Response data:', data);

        if (data.success) {
          console.log('Login successful, redirecting to:', data.redirectUrl);
          window.location.href = data.redirectUrl;
        } else {
          console.error('Add failed:', data.error);
          // TODO : Handle login failure (e.g., show an error message to the user)
        }
      } catch (error) {
        console.error('Fetch error:', error);
        // Handle network errors or other exceptions
      } 
    }); 
  } else {
    console.error('Add form not found');
  }

 


});