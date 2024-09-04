

document.addEventListener('DOMContentLoaded', () => {
      fetchTotalCategories()
      fetchTableRecents()
      addCurrentDate();
        

      const btnRedirectAdd = document.getElementById('btn-redirect-add');
      const btnRedirectAll = document.getElementById('btn-redirect-all');
      
      if (btnRedirectAdd) {
          btnRedirectAdd.addEventListener('click', () => {
              window.location.href = '/add'; 
          });
      }
  
      if (btnRedirectAll) {
          btnRedirectAll.addEventListener('click', () => {
              window.location.href = '/bills'; 
          });
      }
  
      // Handle any other actions if needed
      const redirectionAction = document.getElementById('date-download');
      if (redirectionAction) {
          redirectionAction.addEventListener('click', () => {
              // Add any specific action you want here
               ('Date download clicked');
          });
      }


      function addCurrentDate(){
        const getCurrentDate =()=> new Date().toLocaleString('en-GB', {day: '2-digit', month: '2-digit', year: '2-digit'}).replace(/\//g, '/');
        const dateDownloadDiv = document.getElementById('date-download');
        const span = document.createElement('span');
       //TODO : create durrent date
        // span.textContent = getCurrentDate;
        //dateDownloadDiv.appendChild(span)
      }
    

        async function fetchTotalCategories(){
            const response = await fetch('/dashboard/totals');

            if(!response.ok){
                throw new Error(`HTTP ERROR! from add totals !  Status ${response.status}`)
              }

            const total =   await response.json();
             ('######################## : ', total);
            displayTotal(total)
            displayTotalWolt(total)
            displayTotalHouse(total)
            displayTotalUtilities(total)
            displayTotalWedding(total)
            displayTotalShopping(total)
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
                    ('wolt : ', woltResult)
                   const pTotal= woltResult[0].total_amount;
                   p.textContent = `${pTotal} ₪`;
                   
                }else{    
                    p.textContent = `0 ₪`;
                    
               }
               container.appendChild(p);

           }catch (err){
             ('err', err)
           }
            
            
            
        }
        function displayTotalHouse(total){
          
            const result = total;
            const container = document.getElementById('total-house-month') || document.body;
            const p = document.createElement('p');
           
            const shoppingResult = result.filter(item => item.what ===  'בית');   
             ('shopping : ', shoppingResult)
            const pTotal= shoppingResult[0].total_amount;
            
            p.textContent = `${pTotal} ₪`;
            container.appendChild(p);
            
            
        }
        function displayTotalUtilities(total){
          
            const result = total;
            const container = document.getElementById('total-utilities-month') || document.body;
            const p = document.createElement('p');
           
            const utilitiesResult = Array.isArray(result) ? result.filter(item => item.what ===  'חשבונות') : [];   
             console.log('Utilities : ', utilitiesResult);
             var pTotal = '0' ;
             if (utilitiesResult.length === 0) {
                 pTotal= 0;
                } else {
                pTotal= utilitiesResult[0].total_amount;
            }
             
            p.textContent = `${pTotal} ₪`;
            container.appendChild(p);
            
            
        }

        function displayTotalWedding(total){
          
            const result = total;
            const container = document.getElementById('total-weddings') || document.body;
            const p = document.createElement('p');
           
            const weddingResult = result.filter(item => item.what ===  'חתונה');  
       
            console.log('Wedding : ', weddingResult)
            const pTotal= weddingResult[0].total_amount;
            
            p.textContent = `${pTotal} ₪`;
            container.appendChild(p);
            
            
        }
        function displayTotalShopping(total){
          
            const result = total;
            const container = document.getElementById('total-shopping') || document.body;
            const p = document.createElement('p');
           
            const shoppingResult = Array.isArray(result) ? result.filter(item => item.what ===  'שופינג') :[];  
       
            var sTotal = '0' ;
            if(shoppingResult.length === 0){
                 sTotal = '0' ;
            }else{
                 sTotal= shoppingResult[0].total_amount;
            }
            
            p.textContent = `${sTotal} ₪`;
            container.appendChild(p);
            
            
        }
        function dislayTableRecent(table){
             ('the recents tables !', table)
            const tableRecents= document.getElementById('table-recents-li');

            const list = document.getElementById('table-recents-li');
            


            table.forEach( t => {
                const item = document.createElement('div');
                const date = new Date(t.date) 
                const day = date.getUTCDate().toString().padStart(2, '0');
                const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');

                item.className = 'receive-item';
               /*  const divAva = document.createComment('div');
                        divAva.className = 'avatar';
                const divDet = document.createElement('div'); 
                        divAva.className = 'details'         
                const divName = document.createElement('div');
                        divName.className = 'name'  
                const divEmail = document.createElement('div');
                        divEmail.className = 'email'
                const divAmount = document.createElement('div');
                        divAmount.className = 'amount'  
                        
                 divDet.appendChild(divName);       
                 divDet.appendChild(divEmail);
                 divAva.append(divDet);  
                 tableRecents.append(item);    */  

                item.innerHTML = `
                    <div class="avatar">${t.what.charAt(0)}</div>
                    <div class="details">
                        <div class="name">${day}/${month}</div>
                        <div class="email">${t.description}</div>
                    </div>
                    <div class="amount">-₪ ${t.amount}</div>
                `;
                tableRecents.append(item); 
                



              /*   const list = document.createElement('li');
                const span = document.createElement('span');
                const div = document.createElement('div');
                const pdate = document.createElement('p');
                const pone = document.createElement('p'); 
                const pamount = document.createElement('p'); 
                
                const date = new Date(t.date) 
                const day = date.getUTCDate().toString().padStart(2, '0');
                const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
               
                
                 (`${day}/${month}`)
                pdate.textContent = `${day}/${month}`;
                pone.textContent = `${t.description}`;
                pamount.textContent = `${t.amount}₪`;
                span.textContent = `${t.what}`
                

                div.appendChild(pdate);
                div.appendChild(pone);
                list.appendChild(span);
                list.appendChild(div);
                list.appendChild(pamount);
 */



                //tableRecents.appendChild(list);

            })


        }





});