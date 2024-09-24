
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('date').valueAsDate = new Date();
  const addBillForm = document.getElementById('billForm');
  let selectedCategory = '';
  let selectedPaymentMethod = '';


  addCategoryButtons();

  setTimeout(() => {
     ('DOM fully loaded');
  }, 100);
   ('DOM fully loaded');



  const paymentButtons = document.querySelectorAll('.payment-button');
  paymentButtons.forEach(button => {
    button.addEventListener('click', () => {
        paymentButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        selectedPaymentMethod = button.dataset.method;
         ('Selected payment method:', selectedPaymentMethod);
    });
  });
  const categoryClickedButtons = document.querySelectorAll('.category-button');
  categoryClickedButtons.forEach(button => {
    button.addEventListener('click', () => {
      categoryClickedButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
  });
  

  const backArrow = document.getElementById('redirect-button');
  if (backArrow) {
      backArrow.addEventListener('click', (event) => {
          event.preventDefault(); // Prevent the default anchor behavior
          window.location.href = '/dashboard'; // Redirect to the dashboard
      });
  }



  const confirmForm = document.getElementById('add-button')
  if (confirmForm) {
    confirmForm.addEventListener('click', async (e) => {
      e.preventDefault();

       ('Form submitted ####################################');
      e.preventDefault
       ('Form submitted ####################################');

    
      
      const whatInput = selectedCategory;

      const dateInput = document.getElementById('date').value;

      const descriptionInput = document.getElementById('description').value;
       (amount)

      const amountInput = document.getElementById('amount').value;

      
       ('what input:', whatInput);
       ('date input:', dateInput);
       ('description input:', descriptionInput);
       ('amount input:', amountInput);

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
         ('Response data:', data);

       
      } catch (error) {
        console.error('Fetch error:', error);
        // Handle network errors or other exceptions
      } 

      addBillForm.reset();
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
         ('fetching fetchCategory ')
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
                   ('Selected category from fetchingCategory:', button.dataset.categoryName);
                  button.classList.add('active');
                  });
                  categoryContainer.appendChild(button);
              });
     }catch(error){
        console.error('Error fetching category data:', error);
     }
}









 


});