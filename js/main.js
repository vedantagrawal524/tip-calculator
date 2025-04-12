const billInput = document.getElementById('bill');
const peopleInput = document.getElementById('people');
const customInput = document.querySelector('.custom');
const tipButtons = document.querySelectorAll('.tip-button');
const tipDisplay = document.querySelector('.tip');
const totalDisplay = document.querySelector('.total');
const resetButton = document.querySelector('.reset');

const billError = document.querySelector('.bill-error');
const peopleError = document.querySelector('.people-error');

let tipValue = 0;

// Tip Buttons
tipButtons.forEach(button => {
     button.addEventListener('click', () => {
          tipButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          tipValue = parseFloat(button.value);
          customInput.value = '';
          calculateTip();
     });
});

// Custom
customInput.addEventListener('input', () => {
     tipButtons.forEach(btn => btn.classList.remove('active'));
     tipValue = parseFloat(customInput.value) / 100 || 0;
     calculateTip();
});

// Bill Error
function handleBillError() {
     const bill = parseFloat(billInput.value);
     if (billInput.value === '' || bill > 0) {
          billError.classList.add('hide');
          billInput.classList.remove('error');
     } else {
          billError.classList.remove('hide');
          billInput.classList.add('error');
     }
     calculateTip();
}

// People Error
function handlePeopleError() {
     const people = parseInt(peopleInput.value);
     if (peopleInput.value === '' || people > 0) {
          peopleError.classList.add('hide');
          peopleInput.classList.remove('error');
     } else {
          peopleError.classList.remove('hide');
          peopleInput.classList.add('error');
     }
     calculateTip();
}

// Calculation
function calculateTip() {
     const bill = parseFloat(billInput.value);
     const people = parseInt(peopleInput.value);

     if (bill > 0 && people > 0) {
          const tipAmount = (bill * tipValue) / people;
          const totalAmount = (bill * (1 + tipValue)) / people;

          tipDisplay.textContent = `$${tipAmount.toFixed(2)}`;
          totalDisplay.textContent = `$${totalAmount.toFixed(2)}`;
     } else {
          tipDisplay.textContent = '$0.00';
          totalDisplay.textContent = '$0.00';
     }
}

// RESET 
resetButton.addEventListener('click', () => {
     billInput.value = '';
     peopleInput.value = '';
     customInput.value = '';
     tipDisplay.textContent = '$0.00';
     totalDisplay.textContent = '$0.00';
     tipButtons.forEach(btn => btn.classList.remove('active'));
     billError.classList.add('hide');
     peopleError.classList.add('hide');
     billInput.classList.remove('error');
     peopleInput.classList.remove('error');
     tipValue = 0;
});


billInput.addEventListener('input', handleBillError);
peopleInput.addEventListener('input', handlePeopleError);
