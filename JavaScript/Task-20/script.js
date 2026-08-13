let buttons = document.querySelectorAll(".btn-action");

buttons.forEach(button => {
    button.addEventListener('click', () => {

        if (button.innerText.includes("Add Item")) {
            button.innerText = "Remove Item ⊖"
            button.style.color = "#f20707ff"
        } else {
            button.innerText = "Add Item ⊕"
            button.style.color = "#000000b8"
        }
    });
});
let tableData = [
    {
        Sl: 1,
        serviceName: "DryCleaning",
        Price: "200",
    },
    {
        Sl: 1,
        serviceName: "Wash & Fold",
        Price: "100",
    },
    {
        Sl: 1,
        serviceName: "Ironing",
        Price: "30",
    },
    {
        Sl: 1,
        serviceName: "Stain Removal",
        Price: "500",
    },
    {
        Sl: 1,
        serviceName: "Leather & Suede Cleaning",
        Price: "999",
    },
    {
        Sl: 1,
        serviceName: "Wedding Dress Cleaning",
        Price: "2800",
    },
]



let data = document.querySelector('.table-row')
let totalAmount = document.querySelector('.totalAmount')
let totalSum = 0;

const updateSerialNumbers = ()=>{
    const rows = data.querySelectorAll('tr');
    rows.forEach((row , index)=>{
        row.cells[0].textContent = index + 1 ;
    });
};

let singleItem = (item, index) => {
    const tableHTML = `
        <tr id="row-${index}">
            <td></td>
            <td>${item.serviceName}</td>
            <td>${item.Price}</td>
        </tr>
    `
    data.innerHTML += tableHTML;
    updateSerialNumbers()

}
tableData.forEach((item, index) => {
  const btn = document.querySelector(`#addBtn-${index + 1}`);
  if (!btn) return;

  btn.addEventListener('click', () => {
    const rowToRemove = document.getElementById(`row-${index}`);

    if (btn.innerText.includes('Add Item')) {
      if (rowToRemove) {
        rowToRemove.remove();
        updateSerialNumbers();
      }
      totalSum -= Number(item.Price);
    } else {
      singleItem(item, index);
      totalSum += Number(item.Price);
    }

    totalAmount.textContent = totalSum;
    console.log(totalSum);
  });
});




submitBtn.addEventListener('click',(e)=>{
    e.preventDefault();

    let inputs = document.querySelectorAll('.form-group input')

    let Filled = true;

    inputs.forEach((input)=>{
        if (input.value.trim() === ''){
            Filled = false;
            }
        });

        if (!Filled){
            alert('Please fill in all the required fields before submitting.');

        }else{
            alert('Form Submitted Successfully')
        }
    
});


const bookingForm = document.getElementById('booking-form');

if (bookingForm) {
  bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submit-btn');
    submitBtn.innerText = 'Sending...';

    const fullName = document.getElementById('fullName').value;
    const userEmail = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const totalAmount = document.querySelector('.totalAmount') ? document.querySelector('.totalAmount').innerText : '';


    const templateParams = {
      from_name: fullName,
      to_email: userEmail,
      phone_number: phone,
      total_amount: totalAmount
    };

    emailjs.send('service_xtn7d0o', 'template_sqpfkb7', templateParams)
      .then(function (response) {
        alert('Booking successful! A confirmation email has been sent to ' + userEmail);
        bookingForm.reset();
        submitBtn.innerText = 'Book now';
      }, function (error) {
        console.error('EmailJS Error:', error);
        alert('Failed to send confirmation email. Please check your EmailJS configuration.');
        submitBtn.innerText = 'Book now';
      });
  });
}












