document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.main-nav');

  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const isOpen = navigation.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.querySelector('span:last-child').textContent = isOpen ? '×' : '☰';
    });
  }

  const filterButtons = document.querySelectorAll('.filter-button');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selectedFilter = button.dataset.filter;
      filterButtons.forEach((filter) => {
        const isActive = filter === button;
        filter.classList.toggle('active', isActive);
        filter.setAttribute('aria-pressed', String(isActive));
      });
      projectCards.forEach((card) => {
        const matches = selectedFilter === 'all' || card.dataset.category.includes(selectedFilter);
        card.hidden = !matches;
      });
    });
  });

  const form = document.querySelector('.contact-form');
  if (!form) return;

  const fields = {
    name: { input: form.elements.name, error: document.querySelector('#name-error'), message: 'Indiquez votre nom.' },
    email: { input: form.elements.email, error: document.querySelector('#email-error'), message: 'Indiquez une adresse email valide.' },
    message: { input: form.elements.message, error: document.querySelector('#message-error'), message: 'Écrivez quelques mots sur votre projet.' }
  };
  const feedback = form.querySelector('.form-feedback');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let isValid = true;
    Object.values(fields).forEach((field) => {
      field.error.textContent = '';
      field.input.removeAttribute('aria-invalid');
    });

    if (!fields.name.input.value.trim()) {
      fields.name.error.textContent = fields.name.message;
      fields.name.input.setAttribute('aria-invalid', 'true');
      isValid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.input.value.trim())) {
      fields.email.error.textContent = fields.email.message;
      fields.email.input.setAttribute('aria-invalid', 'true');
      isValid = false;
    }
    if (!fields.message.input.value.trim()) {
      fields.message.error.textContent = fields.message.message;
      fields.message.input.setAttribute('aria-invalid', 'true');
      isValid = false;
    }

    feedback.className = 'form-feedback ' + (isValid ? 'success' : 'error');
    feedback.textContent = isValid ? 'Merci, votre message est prêt à partir. Je vous répondrai rapidement.' : 'Vérifiez les champs signalés avant d’envoyer le formulaire.';
    if (!isValid) {
      form.querySelector('[aria-invalid="true"]').focus();
    }
  });
});