document.addEventListener('DOMContentLoaded', () => {
      fetchTotalCategories()
        

        async function fetchTotalCategories(){
            const totalMonthCard = document.getElementById('total-month');
            const response = await fetch('/dashboard/totals');

            if(!response.ok){
                throw new Error(`HTTP ERROR! from add totals !  Status ${response.status}`)
              }

            const total =   await response.json();
            console.log('######################## : ', total);
            displayTotal(total)
            displayTotalWolt(total)
            displayTotalHouse(total)
        }


        function displayTotal(total){
            let totalAmountSum = 0;
            const result = total;
            const container = document.getElementById('total-month') || document.body;
            const p = document.createElement('p');
           total.forEach(e => {
            totalAmountSum += parseFloat(e.total_amount);
           });

            p.textContent = `${totalAmountSum} ₪`;
            container.appendChild(p);
            
            
        }
        function displayTotalWolt(total){
           
            const result = total;
            const container = document.getElementById('total-wolt-month') || document.body;
            const p = document.createElement('p');
           
            const woltResult = result.filter(item => item.what === 'הזמנות');   
            console.log('wolt : ', woltResult)
            const pTotal= woltResult[0].total_amount;
            p.textContent = `${pTotal} ₪`;
            container.appendChild(p);
            
            
        }
        function displayTotalHouse(total){
          
            const result = total;
            const container = document.getElementById('total-house-month') || document.body;
            const p = document.createElement('p');
           
            const shoppingResult = result.filter(item => item.what ===  'קניות ');   
            console.log('shopping : ', shoppingResult)
            const pTotal= shoppingResult[0].total_amount;
            p.textContent = `${pTotal} ₪`;
            container.appendChild(p);
            
            
        }






});