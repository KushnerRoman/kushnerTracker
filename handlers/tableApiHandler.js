console.log('Table API Handler script started');

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded');
  
    fetchBillsData();
 
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

function displayBillsData(bills) {
  const container = document.querySelector('.container') || document.body;
  
  // Create table structure
  const table = document.createElement('table');
  table.className = 'bills-table';
  
  // Create table header
  const thead = document.createElement('thead');
  thead.innerHTML = `
    <tr>
      <th>Who</th>
      <th>What</th>
      <th>Date</th>
      <th>Description</th>
      <th>Amount</th>
    </tr>
  `;
  table.appendChild(thead);
  
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
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
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