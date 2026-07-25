// Modal Logic
function toggleModal() {
    const modal = document.getElementById('loginModal');
    modal.classList.toggle('active');
}

// Bilingual Toggle Logic (English <-> Urdu RTL)
let currentLang = 'en';

function toggleLanguage() {
    const html = document.documentElement;
    const body = document.body;
    const elements = document.querySelectorAll('[data-en][data-ur]');

    if (currentLang === 'en') {
        // Switch to Urdu
        currentLang = 'ur';
        html.lang = 'ur';
        body.setAttribute('dir', 'rtl');

        elements.forEach(el => {
            el.textContent = el.getAttribute('data-ur');
        });
    } else {
        // Switch to English
        currentLang = 'en';
        html.lang = 'en';
        body.setAttribute('dir', 'ltr');

        elements.forEach(el => {
            el.textContent = el.getAttribute('data-en');
        });
    }
}
//Login Handling Function
// Login Handling Function
function handleLogin(event) {
    event.preventDefault();

    const emailInput = event.target.querySelector(' input[type="email"]');
    const passwordInput = event.target.querySelector('input[type="password"]');

    const validEmail = "student@lishan.com";
    const validPassword = "password123";

    if (emailInput === validEmail && passwordInput === validPassword) {
        toggleModal();
        alert(`Welcome back! Logged in as: ${emailInput}`);
        window.location.href = 'dashdoard.html';
    } else {
        alert("Invalid email or password");
    }
}
