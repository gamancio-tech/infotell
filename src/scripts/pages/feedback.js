const FORM_ID = 'mjdl53ztusf'; 

const introSection = document.getElementById('intro-section');
const formSection = document.getElementById('form-section');
const thanksSection = document.getElementById('thanks-section');
const form = document.getElementById('feedback-form');
const formStatus = document.getElementById('form-status');
const thanksName = document.getElementById('thanks-name');
const charCount = document.getElementById('char-count');
const feedbackComments = document.getElementById('feedback-comments');

const steps = Array.from(form.querySelectorAll('.feedback-step'));
let currentStepIndex = 0;

// Update char counter
if (feedbackComments) {
    feedbackComments.addEventListener('input', (e) => {
        charCount.textContent = e.target.value.length;
    });
}

// Show specific step
function showStep(index) {
    steps.forEach((step, i) => {
        step.style.display = i === index ? 'block' : 'none';
    });
    currentStepIndex = index;
    
    // Smooth scroll to top of form
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Start evaluation button
const btnStart = document.getElementById('btn-start-evaluation');
if (btnStart) {
    btnStart.addEventListener('click', () => {
        introSection.style.display = 'none';
        formSection.style.display = 'flex'; // Usando flex para centralizar a tela de wizard
        showStep(0);
    });
}

// Next buttons logic
form.querySelectorAll('.btn-step--next').forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const currentStepEl = steps[currentStepIndex];
        
        // Validate inputs in current step
        const inputs = Array.from(currentStepEl.querySelectorAll('input, textarea, select'));
        let isValid = true;
        for (const input of inputs) {
            if (!input.checkValidity()) {
                input.reportValidity();
                isValid = false;
                break;
            }
        }
        
        if (!isValid) return;

        // If it's the last step, submit the form!
        if (currentStepIndex >= steps.length - 1) {
            form.dispatchEvent(new Event('submit', { cancelable: true }));
        } else {
            showStep(currentStepIndex + 1);
        }
    });
});

// Back buttons logic
form.querySelectorAll('.btn-step--back').forEach((btn) => {
    btn.addEventListener('click', () => {
        if (currentStepIndex > 0) {
            showStep(currentStepIndex - 1);
        } else {
            // Back to intro
            formSection.style.display = 'none';
            introSection.style.display = 'block';
        }
    });
});

// Outro Service toggle logic
const checkboxOutro = document.getElementById('checkbox-outro');
const otherServiceContainer = document.getElementById('other-service-container');
if (checkboxOutro && otherServiceContainer) {
    checkboxOutro.addEventListener('change', (e) => {
        if (e.target.checked) {
            otherServiceContainer.style.display = 'block';
        } else {
            otherServiceContainer.style.display = 'none';
            // Optional: clear input if user unchecks it
            const input = otherServiceContainer.querySelector('input');
            if (input) input.value = '';
        }
    });
}

// News Email toggle logic
const newsRadios = form.querySelectorAll('input[name="fi-text-receive_news"]');
const emailContainer = document.getElementById('email-container');
if (newsRadios.length > 0 && emailContainer) {
    newsRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const input = emailContainer.querySelector('input');
            if (e.target.value === 'sim' || e.target.value === 'depois') {
                emailContainer.style.display = 'block';
                if (input) input.required = true;
            } else {
                emailContainer.style.display = 'none';
                if (input) {
                    input.required = false;
                    input.value = '';
                }
            }
        });
    });
}

// Satisfaction conditional feedback
const satisfactionRadios = form.querySelectorAll('input[name="fi-text-satisfaction"]');
const satisfactionBox = document.getElementById('satisfaction-feedback-box');
satisfactionRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        const value = parseInt(e.target.value, 10);
        if (value >= 9) {
            satisfactionBox.style.display = 'flex';
        } else {
            satisfactionBox.style.display = 'none';
        }
    });
});

// Form submission via Forminit
const script = document.createElement('script');
script.src = 'https://forminit.com/sdk/v1/forminit.js';
script.onload = () => {
    const forminit = new Forminit();

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = steps[currentStepIndex].querySelector('.btn-step--next');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> ENVIANDO...';
        submitBtn.disabled = true;
        
        formStatus.style.display = 'block';
        formStatus.textContent = 'Enviando sua avaliação...';

        const formData = new FormData(form);
        const { error } = await forminit.submit(FORM_ID, formData);

        if (error) {
            formStatus.textContent = error.message;
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            return;
        }

        // Success!
        const userName = formData.get('fi-sender-fullName') || 'Cliente';
        const thanksName = document.getElementById('thanks-name');
        if (thanksName) thanksName.textContent = userName.split(' ')[0]; // first name
        
        formSection.style.display = 'none';
        thanksSection.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
};
document.head.appendChild(script);