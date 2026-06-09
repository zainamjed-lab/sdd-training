const form        = document.getElementById('contact-form');
const successCard = document.getElementById('success-card');
const submitBtn   = document.getElementById('submit-btn');
const resetBtn    = document.getElementById('reset-btn');
const messageEl   = document.getElementById('message');
const charCount   = document.getElementById('char-count');

// ── Char counter ──
messageEl.addEventListener('input', () => {
  const len = messageEl.value.length;
  charCount.textContent = len;
  charCount.style.color = len > 900 ? '#dc2626' : '';
});

// ── Validation helpers ──
function setError(fieldId, errId, show) {
  const field = document.getElementById(fieldId);
  const err   = document.getElementById(errId);
  field.classList.toggle('invalid', show);
  err.classList.toggle('visible', show);
}

function clearErrors() {
  document.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
  document.querySelectorAll('.field-error.visible').forEach(el => el.classList.remove('visible'));
}

function validate() {
  let valid = true;

  const name    = document.getElementById('full-name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const company = document.getElementById('company').value.trim();
  const subject = document.getElementById('subject').value;
  const message = messageEl.value.trim();

  if (!name) {
    setError('full-name', 'err-full-name', true);
    valid = false;
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!email || !emailOk) {
    setError('email', 'err-email', true);
    valid = false;
  }

  if (!company) {
    setError('company', 'err-company', true);
    valid = false;
  }

  if (!subject) {
    setError('subject', 'err-subject', true);
    valid = false;
  }

  if (message.length < 10) {
    setError('message', 'err-message', true);
    valid = false;
  }

  return valid;
}

// ── Clear error on field change ──
['full-name', 'email', 'company', 'subject'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => {
    const errId = 'err-' + id;
    setError(id, errId, false);
  });
});

messageEl.addEventListener('input', () => setError('message', 'err-message', false));

// ── Submit ──
form.addEventListener('submit', (e) => {
  e.preventDefault();
  clearErrors();

  if (!validate()) {
    const firstInvalid = form.querySelector('.invalid');
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  // Simulate network delay then show success
  setTimeout(() => {
    form.classList.add('hidden');
    successCard.classList.remove('hidden');
  }, 800);
});

// ── Reset ──
resetBtn.addEventListener('click', () => {
  form.reset();
  charCount.textContent = '0';
  clearErrors();
  successCard.classList.add('hidden');
  form.classList.remove('hidden');
  submitBtn.disabled = false;
  submitBtn.textContent = 'Send Message';
});
