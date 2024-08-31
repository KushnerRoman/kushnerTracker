

console.log('Script started');
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('date').valueAsDate = new Date();
  const addBillForm = document.getElementById('billForm');
  let selectedCategory = '';
  let selectedPaymentMethod = '';


  addCategoryButtons();
  setTimeout(() => {
    console.log('DOM fully loaded');
  }, 100);
  console.log('DOM fully loaded');


  const paymentButtons = document.querySelectorAll('.payment-button');
  paymentButtons.forEach(button => {
    button.addEventListener('click', () => {
        paymentButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        selectedPaymentMethod = button.dataset.method;
        console.log('Selected payment method:', selectedPaymentMethod);
    });
  });
  const categoryClickedButtons = document.querySelectorAll('.category-button');
  categoryClickedButtons.forEach(button => {
    button.addEventListener('click', () => {
      categoryClickedButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
  });
  


  const confirmForm = document.getElementById('add-button')
  if (confirmForm) {
    confirmForm.addEventListener('click', async (e) => {

      console.log('Form submitted ####################################');
      e.preventDefault
      console.log('Form submitted ####################################');

    
      
      const whatInput = selectedCategory;

      const dateInput = document.getElementById('date').value;

      const descriptionInput = document.getElementById('description').value;
      console.log(amount)

      const amountInput = document.getElementById('amount').value;

      
      console.log('what input:', whatInput);
      console.log('date input:', dateInput);
      console.log('description input:', descriptionInput);
      console.log('amount input:', amountInput);

    try {
        const response = await fetch('/add/addnewbill', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
                                what: whatInput,
                                data: dateInput,
                                describe: descriptionInput,
                                amount: amountInput,
                                type: selectedPaymentMethod
                                    }),
        });
        const data = await response.json();
        console.log('Response data:', data);

       
      } catch (error) {
        console.error('Fetch error:', error);
        // Handle network errors or other exceptions
      } 
    }); 
  } else {
    console.error('Add form not found');
  }

async function addCategoryButtons() {
  //const categories = ['Food', 'Transport', 'Entertainment', 'Bills', 'Other']; // Example categories

  try{
      const categoryContainer = document.getElementById('categoryButtons');
      const response = await fetch('/bills/category/fetchCategory');
        if(!response.ok){
            throw new Error(`HTTP ERROR! from addCategoryButtons !  Status ${response.status}`)
          }
        console.log('fetching fetchCategory ')
        const categories = await response.json();
              categories.forEach(category => {
                  const button = document.createElement('button');
                  button.type = 'button';
                  button.className = 'category-button';


                  const icon = document.createElement('img');
                  icon.src = new URL(category.icon_url, window.location.origin).href;

                 

                  icon.alt = `${category} icon`; 
                  icon.className = 'category-icon'

                  const textSpanBtn = document.createElement('span');
                  textSpanBtn.textContent = category.name;
                  button.appendChild(icon);
                  button.appendChild(textSpanBtn);

                  button.dataset.categoryName = category.name;

                  const clickedBtnCategory = document.querySelectorAll('.category-button');

                  button.addEventListener('click', (e)=> {
                        const categoryBtndocument  = document.querySelectorAll('.category-button')
                        categoryBtndocument.forEach((btn) => {
                          btn.classList.remove('active')
                        });
                      if (e.target.closest('.category-button')) {
                        const button = e.target.closest('.category-button');
                        selectedCategory = button.dataset.categoryName;
                      }
                  console.log('Selected category from fetchingCategory:', button.dataset.categoryName);
                  button.classList.add('active');
                  });
                  categoryContainer.appendChild(button);
              });
     }catch(error){
        console.error('Error fetching category data:', error);
     }
}









 


});