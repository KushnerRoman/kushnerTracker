

document.addEventListener('DOMContentLoaded', () => {
      fetchTotalCategories()
      fetchTableRecents()
        

        async function fetchTotalCategories(){
            const response = await fetch('/dashboard/totals');

            if(!response.ok){
                throw new Error(`HTTP ERROR! from add totals !  Status ${response.status}`)
              }

            const total =   await response.json();
            console.log('######################## : ', total);
            displayTotal(total)
            displayTotalWolt(total)
            displayTotalHouse(total)
            displayTotalUtilities(total)
        }
        async function fetchTableRecents(){
            const tableRecents = document.getElementById('recent-sales');
            const response = await fetch('/dashboard/recentsreceivs');

            if(!response.ok){
                throw new Error(`HTTP ERROR! from add totals !  Status ${response.status}`)
              }

            const tables =   await response.json();  
            dislayTableRecent(tables)

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
           try{
               const woltResult = result.filter(item => item.what === 'הזמנות');   
               if (woltResult.length > 0 ){
                   console.log('wolt : ', woltResult)
                   const pTotal= woltResult[0].total_amount;
                   p.textContent = `${pTotal} ₪`;
                   
                }else{    
                    p.textContent = `0 ₪`;
                    
               }
               container.appendChild(p);

           }catch (err){
            console.log('err', err)
           }
            
            
            
        }
        function displayTotalHouse(total){
          
            const result = total;
            const container = document.getElementById('total-house-month') || document.body;
            const p = document.createElement('p');
           
            const shoppingResult = result.filter(item => item.what ===  'קניות');   
            console.log('shopping : ', shoppingResult)
            const pTotal= shoppingResult[0].total_amount;
            
            p.textContent = `${pTotal} ₪`;
            container.appendChild(p);
            
            
        }
        function displayTotalUtilities(total){
          
            const result = total;
            const container = document.getElementById('total-utilities-month') || document.body;
            const p = document.createElement('p');
           
            const utilitiesResult = result.filter(item => item.what ===  'חשבונות');   
            console.log('shopping : ', utilitiesResult)
            const pTotal= utilitiesResult[0].total_amount;
            
            p.textContent = `${pTotal} ₪`;
            container.appendChild(p);
            
            
        }
        function dislayTableRecent(table){
            console.log('the recents tables !', table)
            const tableRecents= document.getElementById('table-recents-li');
            table.forEach( t => {
                const list = document.createElement('li');
                const span = document.createElement('span');
                const div = document.createElement('div');
                const pdate = document.createElement('p');
                const pone = document.createElement('p'); 
                const pamount = document.createElement('p'); 

                const date = t.date;
                
                console.log(date)
                pdate.textContent = `${t.date}`;
                pone.textContent = `${t.description}`;
                pamount.textContent = `${t.amount}₪`;
                span.textContent = `${t.what}`
                

                div.appendChild(pdate);
                div.appendChild(pone);
                list.appendChild(span);
                list.appendChild(div);
                list.appendChild(pamount);
                tableRecents.appendChild(list);

            })


        }





});