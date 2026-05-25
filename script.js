// Menú hamburguesa
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', navLinks.classList.contains('active'));
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});
// Animación de barras de habilidad
const skillBars = document.querySelectorAll('.skill-progress');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
            observer.unobserve(bar);
        }
    });
}, { threshold: 0.3 });

skillBars.forEach(bar => observer.observe(bar));
// Validación del formulario
const form = document.querySelector('.contact-form');
const fields = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    message: document.getElementById('message')
};

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateField(fieldName) {
    const field = fields[fieldName];
    const error = document.getElementById(fieldName + 'Error');
    let isValid = true;
    let errorMsg = '';

    if (fieldName === 'name') {
        isValid = field.value.trim().length >= 2;
        errorMsg = 'El nombre debe tener al menos 2 caracteres';
    }
    if (fieldName === 'email') {
        isValid = validateEmail(field.value);
        errorMsg = 'Por favor ingresa un email válido';
    }
    if (fieldName === 'message') {
        isValid = field.value.trim().length >= 10;
        errorMsg = 'El mensaje debe tener al menos 10 caracteres';
    }

    error.textContent = errorMsg;
    error.style.display = isValid ? 'none' : 'block';
    field.style.borderColor = isValid ? '#e0e0e0' : '#e74c3c';
}

// Validar en tiempo real
Object.keys(fields).forEach(key => {
    fields[key].addEventListener('blur', () => validateField(key));
    fields[key].addEventListener('input', () => validateField(key));
});

// Submit del formulario
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    Object.keys(fields).forEach(key => validateField(key));
    
    const allValid = Object.keys(fields).every(key => {
        if (key === 'name') return fields[key].value.trim().length >= 2;
        if (key === 'email') return validateEmail(fields[key].value);
        if (key === 'message') return fields[key].value.trim().length >= 10;
    });
    
    if (allValid) {
        alert('¡Mensaje enviado exitosamente!');
        form.reset();
        Object.values(fields).forEach(field => field.style.borderColor = '#e0e0e0');
    }
});

console.log('Portafolio cargado correctamente');
