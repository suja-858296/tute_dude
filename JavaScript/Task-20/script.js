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


let dryCleaningBtn1 = document.querySelector('#addBtn-1')
let dryCleaningBtn2 = document.querySelector('#addBtn-2')
let dryCleaningBtn3 = document.querySelector('#addBtn-3')
let dryCleaningBtn4 = document.querySelector('#addBtn-4')
let dryCleaningBtn5 = document.querySelector('#addBtn-5')
let dryCleaningBtn6 = document.querySelector('#addBtn-6')
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
dryCleaningBtn1.addEventListener('click', () => {
    if (dryCleaningBtn1.innerText.includes('Add Item')) {
        let rowToRemove = document.getElementById('row-0')
        if(rowToRemove){
            rowToRemove.remove();

            updateSerialNumbers()
        }
        totalSum  -= Number(tableData[0].Price)
        totalAmount.textContent = totalSum
    }else{
        singleItem(tableData[0],0)
        totalSum += Number(tableData[0].Price)
        totalAmount.textContent = totalSum;
        console.log(totalSum)
    }
    });
    

dryCleaningBtn2.addEventListener('click', () => {
    if (dryCleaningBtn2.innerText.includes('Add Item')) {
        let rowToRemove = document.getElementById('row-1')
        if(rowToRemove){
            rowToRemove.remove();

            updateSerialNumbers()
        }
        totalSum  -= Number(tableData[1].Price)
        totalAmount.textContent = totalSum
    }
    else{
        singleItem(tableData[1],1)
        totalSum += Number(tableData[1].Price)
        totalAmount.textContent = totalSum;
        console.log(totalSum)
    }
    });

dryCleaningBtn3.addEventListener('click', () => {
    if (dryCleaningBtn3.innerText.includes('Add Item')) {
        let rowToRemove = document.getElementById('row-2')
        if(rowToRemove){
            rowToRemove.remove();

            updateSerialNumbers()
        }
        totalSum  -= Number(tableData[2].Price)
        totalAmount.textContent = totalSum
    }
    else{
        singleItem(tableData[2],2)
        totalSum += Number(tableData[2].Price)
        totalAmount.textContent = totalSum;
        console.log(totalSum)
    }
    });


dryCleaningBtn4.addEventListener('click', () => {
    if (dryCleaningBtn4.innerText.includes('Add Item')) {
        let rowToRemove = document.getElementById('row-3')
        if(rowToRemove){
            rowToRemove.remove();

            updateSerialNumbers()
        }
        totalSum  -= Number(tableData[3].Price)
        totalAmount.textContent = totalSum
    }
    else{
        singleItem(tableData[3],3)
        totalSum += Number(tableData[3].Price)
        totalAmount.textContent = totalSum;
        console.log(totalSum)
    }
    });

dryCleaningBtn5.addEventListener('click', () => {
    if (dryCleaningBtn5.innerText.includes('Add Item')) {
        let rowToRemove = document.getElementById('row-4')
        if(rowToRemove){
            rowToRemove.remove();

            updateSerialNumbers()
        }
        totalSum  -= Number(tableData[4].Price)
        totalAmount.textContent = totalSum
    }
    else{
        singleItem(tableData[4],4)
        totalSum += Number(tableData[4].Price)
        totalAmount.textContent = totalSum;
        console.log(totalSum)
    }
    });

dryCleaningBtn6.addEventListener('click', () => {
    if (dryCleaningBtn6.innerText.includes('Add Item')) {
        let rowToRemove = document.getElementById('row-5')
        if(rowToRemove){
            rowToRemove.remove();

            updateSerialNumbers()
        }
        totalSum  -= Number(tableData[5].Price)
        totalAmount.textContent = totalSum
    }
    else{
        singleItem(tableData[5],5)
        totalSum += Number(tableData[5].Price)
        totalAmount.textContent = totalSum;
        console.log(totalSum)
    }
    });


let submitBtn = document.querySelector('.btn-submit')

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











