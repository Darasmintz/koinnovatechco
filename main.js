window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 5);
    }

    const year = document.getElementById('year') || document.getElementById('current-year');
    if (year) {
        year.textContent = new Date().getFullYear();
    }
});

function toggleMenu() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('active');
}

const animateElements = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-delay') || '0';
            setTimeout(() => {
                entry.target.classList.add('animate');
            }, parseFloat(delay) * 1000);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

animateElements.forEach(el => observer.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const forms = document.querySelectorAll('.contact-form, .application-form, .feedback-form');
forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const button = form.querySelector('.submit-button');
        const status = form.querySelector('.form-status');
        const originalText = button.innerHTML;
        button.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i> Sending...`;
        button.disabled = true;

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                if (form.id === 'join-form') {
                    window.location.href = 'https://agreementform.tiiny.site';
                } else {
                    if (status) {
                        status.textContent = 'Message sent successfully!';
                        status.style.color = 'var(--accent)';
                    } else {
                        alert('Message sent successfully!');
                    }
                    form.reset();
                }
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            if (status) {
                status.textContent = 'Error sending message. Please try again.';
                status.style.color = '#ff6b6b';
            } else {
                alert('Error sending message. Please try again.');
            }
        }
        button.innerHTML = originalText;
        button.disabled = false;
    });
});

const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});