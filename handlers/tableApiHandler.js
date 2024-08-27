console.log('Table API Handler script started');

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded');
  
    fetchBillsData();
    fetchTotals();
 
});

async function fetchBillsData() {
  try {
    const response = await fetch('/bills/fetchBills');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const bills = await response.json();
    displayBillsData(bills);
  } catch (error) {
    console.error('Error fetching bills data:', error);
    displayErrorMessage('Failed to load bills data. Please try again later.');
  }
}

async function fetchTotals() {
  try {
      const response = await fetch('/bills/fetchTotalBills');
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      updateTotals(result);
      console.log('######################################')
      console.log( 'result filled ',result )
  } catch (error) {
      console.error('Error fetching totals:', error);
  }
}

function updateTotals(totals) {
  const totalsTableBody = document.getElementById('totalsTableBody');
  totalsTableBody.innerHTML = ''; // Clear existing content

  let grandTotal = 0;

  totals.forEach(item => {
      const cell = document.createElement('td');
      cell.innerHTML = `<strong>${item.who}:</strong> ${parseFloat(item.total_amount).toFixed(2)}`;
      totalsTableBody.appendChild(cell);
      grandTotal += parseFloat(item.total_amount);
  });

  // Add grand total
  const grandTotalCell = document.createElement('td');
  grandTotalCell.innerHTML = `<strong>Total:</strong> ${grandTotal.toFixed(2)}`;
  totalsTableBody.appendChild(grandTotalCell);
}

function displayBillsData(bills) {
  const container = document.querySelector('.container') || document.body;
  
  // Create table structure
  const table = document.createElement('table');
  table.className = 'bills-table';
  
  
  // Create table body and populate with data
  const tbody = document.createElement('tbody');
  bills.forEach(bill => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${escapeHtml(bill.who)}</td>
      <td>${escapeHtml(bill.what)}</td>
      <td>${formatDate(bill.date)}</td>
      <td>${escapeHtml(bill.description)}</td>
      <td>${formatAmount(bill.amount)}</td>
    `;
    tbody.appendChild(row);
  });
  table.appendChild(tbody);
  
  // Add table to the container
  container.appendChild(table);
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function formatAmount(amount) {
  return new Intl.NumberFormat('en-US').format(amount);
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function displayErrorMessage(message) {
  const container = document.querySelector('.container') || document.body;
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  container.insertBefore(errorDiv, container.firstChild);
}