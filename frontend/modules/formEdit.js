import validator from 'validator';

export default class Edit {
  constructor(formEdit) {
    this.form = document.querySelector(formEdit);
  }

  init() {
    this.events();
  }

  events() {
    if (!this.form) return;
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      this.validate(e);
    });
  }

  validate(e) {
    const el = e.target;
    const emailInput = el.querySelector('input[name="email"]');
    const nameInput = el.querySelector('input[name="name"]');
    const lastNameInput = el.querySelector('input[name="lastName"]');
    const telInput = el.querySelector('input[name="tel"]');

    let error = false;

    if (!validator.isEmail(emailInput.value)) {
      alert('E-mail inválido');
      error = true;
    }

    if (validator.isEmpty(nameInput.value)) {
      alert('Nome não pode estar vazio');
      error = true;
    }

    if (validator.isEmpty(lastNameInput.value)) {
      alert('Sobrenome não pode estar vazio');
      error = true;
    }

    if (!validator.isMobilePhone(telInput.value, 'pt-BR')) {
      alert('Telefone inválido');
      error = true;
    }

    if (!error) {
        alert('Formulário validado com sucesso!');

      this.form.submit(); // Se tudo estiver ok, envia o formulário
    }
  }
}