// Data derived from the video
const servicesData = [
    { id: 1, name: "Dry Cleaning", price: 200, image: "https://placehold.co/600x400/e2e8f0/475569?text=Dry+Cleaning" },
    { id: 2, name: "Leather & Suede Cleaning", price: 999, image: "https://placehold.co/600x400/e2e8f0/475569?text=Leather+%26+Suede" },
    { id: 3, name: "Ironing", price: 30, image: "https://placehold.co/600x400/e2e8f0/475569?text=Ironing" },
    { id: 4, name: "Wedding Dress Cleaning", price: 2400, image: "https://placehold.co/600x400/e2e8f0/475569?text=Wedding+Dress" },
    { id: 5, name: "Wash And Fold", price: 140, image: "https://placehold.co/600x400/e2e8f0/475569?text=Wash+And+Fold" },
    { id: 6, name: "Stain Removal", price: 500, image: "https://placehold.co/600x400/e2e8f0/475569?text=Stain+Removal" }
];


let currentServiceIndex = 0;
let cartItems = [];

const elServiceImage = document.getElementById('serviceImage');
const elServiceName = document.getElementById('serviceName');
const elServicePrice = document.getElementById('servicePrice');

const btnSkip = document.getElementById('btnSkip');
const btnAdd = document.getElementById('btnAdd');

const cartTable = document.getElementById('cartTable');
const cartBody = document.getElementById('cartBody');
const emptyState = document.getElementById('emptyState');
const elTotalAmount = document.getElementById('totalAmount');

const bookingForm = document.getElementById('bookingForm');
const successMessage = document.getElementById('successMessage');

function init() {
    renderCurrentService();
    updateCartDisplay();
}

function formatPrice(amount) {
    return `₹${amount.toFixed(2)}`;
}

function renderCurrentService() {
    const service = servicesData[currentServiceIndex];
    

    const card = document.getElementById('serviceCard');
    card.style.opacity = 0.5;
    
    setTimeout(() => {
        elServiceImage.src = service.image;
        elServiceName.textContent = service.name;
        elServicePrice.textContent = formatPrice(service.price);
        card.style.opacity = 1;
    }, 150);
}

function nextService() {
    currentServiceIndex = (currentServiceIndex + 1) % servicesData.length;
    renderCurrentService();
}

function updateCartDisplay() {
    cartBody.innerHTML = ''; 
    let total = 0;

    if (cartItems.length === 0) {
        cartTable.style.display = 'none';
        emptyState.style.display = 'flex';
    } else {
        cartTable.style.display = 'table';
        emptyState.style.display = 'none';

        cartItems.forEach((item, index) => {
            total += item.price;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td class="price">${formatPrice(item.price)}</td>
            `;
            cartBody.appendChild(row);
        });
    }

    elTotalAmount.textContent = formatPrice(total);
}


btnSkip.addEventListener('click', () => {
    nextService();
    successMessage.style.display = 'none';
});

btnAdd.addEventListener('click', () => {
    const serviceToAdd = servicesData[currentServiceIndex];
    cartItems.push(serviceToAdd);
    updateCartDisplay();
    nextService();
    successMessage.style.display = 'none';
});


bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
        alert("Please add at least one item to your cart before booking.");
        return;
    }

    successMessage.style.display = 'flex';
    
    setTimeout(() => {
        bookingForm.reset();
        cartItems = [];
        updateCartDisplay();
    }, 3000); 
});

init();