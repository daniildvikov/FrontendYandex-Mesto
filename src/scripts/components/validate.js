const resetFormValidation = (form, settings) => {
  const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
  const errorElements = Array.from(form.querySelectorAll(`.${settings.errorClass}`));
  
  inputs.forEach((input) => {
    input.classList.remove(settings.inputErrorClass);
  });
  
  errorElements.forEach((errorElement) => {
    errorElement.textContent = "";
    errorElement.classList.remove(settings.errorClass);
  });

  const submitButton = form.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputs, submitButton, settings);
};

export const enableValidation = (settings) => {
  const forms = document.querySelectorAll(settings.formSelector);
  
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => e.preventDefault());
    setEventListeners(form, settings);
    const popup = form.closest('.popup');
    const closeButton = popup.querySelector('.popup__close');
    closeButton.addEventListener("click", () => {
      resetFormValidation(form, settings);
    });

    popup.addEventListener("click", (e) => {
      if (e.target === popup) { 
        resetFormValidation(form, settings);
      }
    });
  });
};


const setEventListeners = (form, settings) => {
  const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
  const submitButton = form.querySelector(settings.submitButtonSelector);

  toggleButtonState(inputs, submitButton, settings);

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(form, input, settings);
      toggleButtonState(inputs, submitButton, settings);
    });
  });
};

const checkInputValidity = (form, input, settings) => {
  if (!input.validity.valid) {
    showInputError(form, input, settings);
  } else {
    hideInputError(form, input, settings);
  }
};

const showInputError = (form, input, settings) => {
  const errorElement = form.querySelector(`.popup__error_${input.name}`);
  if (errorElement) {
    input.classList.add(settings.inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(settings.errorClass);
  }
};

const hideInputError = (form, input, settings) => {
  const errorElement = form.querySelector(`.popup__error_${input.name}`);
  if (!errorElement) {
    console.warn(`Error element not found for input: ${input.name}`);
    return;
  }
  input.classList.remove(settings.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(settings.errorClass);
};

const hasInvalidInput = (inputs) => {
  return inputs.some((input) => !input.validity.valid);
};

export const toggleButtonState = (inputs, button, settings) => {
  if (hasInvalidInput(inputs)) {
    button.classList.add(settings.inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(settings.inactiveButtonClass);
    button.disabled = false;
  }
};
