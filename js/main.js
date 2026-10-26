(function() {
  'use strict';

  var CONTACT_ENDPOINT = 'https://api.web3forms.com/submit';
  var ACCESS_KEY = 'REPLACE_WITH_WEB3FORMS_ACCESS_KEY';
  // This key is public by design, restrict it by domain in the provider dashboard; never put the real email in code.

  var yearEl = document.querySelector('[data-year]');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var form = document.getElementById('contact-form');
  if (!form) {
    return;
  }

  var statusEl = document.getElementById('form-status');
  var submitBtn = form.querySelector('button[type="submit"]');

  var messages = {
    valueMissing: 'Este campo es obligatorio.',
    typeMismatch: 'Introduce un correo electrónico válido.',
    tooShort: 'El contenido es demasiado corto.'
  };

  function getErrorMessage(field) {
    var validity = field.validity;
    if (validity.valueMissing) {
      return messages.valueMissing;
    }
    if (validity.typeMismatch) {
      return messages.typeMismatch;
    }
    if (validity.tooShort) {
      return messages.tooShort;
    }
    if (field.type !== 'email') {
      var value = field.value.trim();
      if (value === '') {
        return messages.valueMissing;
      }
      if (field.minLength > 0 && value.length < field.minLength) {
        return messages.tooShort;
      }
    }
    return field.checkValidity() ? '' : 'Revisa este campo.';
  }

  function getErrorEl(field) {
    var id = field.getAttribute('aria-describedby');
    if (!id) {
      return null;
    }
    return document.getElementById(id);
  }

  function showFieldError(field, message) {
    var errorEl = getErrorEl(field);
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.hidden = false;
    }
    field.setAttribute('aria-invalid', 'true');
  }

  function clearFieldError(field) {
    var errorEl = getErrorEl(field);
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.hidden = true;
    }
    field.removeAttribute('aria-invalid');
  }

  function clearAllErrors() {
    var fields = form.querySelectorAll('input, textarea');
    for (var i = 0; i < fields.length; i++) {
      clearFieldError(fields[i]);
    }
  }

  function setStatus(message, state) {
    if (!statusEl) {
      return;
    }
    statusEl.textContent = message;
    if (state) {
      statusEl.setAttribute('data-state', state);
    } else {
      statusEl.removeAttribute('data-state');
    }
  }

  var inputs = form.querySelectorAll('input:not(.form__honeypot), textarea');
  for (var j = 0; j < inputs.length; j++) {
    inputs[j].addEventListener('input', function() {
      clearFieldError(this);
    });
    inputs[j].addEventListener('change', function() {
      clearFieldError(this);
    });
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    setStatus('', null);
    clearAllErrors();

    var honeypot = form.querySelector('[name="botcheck"]');
    if (honeypot && honeypot.checked) {
      form.reset();
      clearAllErrors();
      setStatus('Mensaje enviado correctamente.', 'success');
      return;
    }

    var fields = form.querySelectorAll('input:not(.form__honeypot), textarea');
    var firstInvalid = null;
    for (var k = 0; k < fields.length; k++) {
      var field = fields[k];
      var msg = getErrorMessage(field);
      if (msg) {
        showFieldError(field, msg);
        if (!firstInvalid) {
          firstInvalid = field;
        }
      }
    }

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    if (ACCESS_KEY === 'REPLACE_WITH_WEB3FORMS_ACCESS_KEY') {
      setStatus('El formulario no está configurado todavía.', 'error');
      return;
    }

    var formData = new FormData(form);
    var payload = {};
    formData.forEach(function(value, key) {
      if (key === 'botcheck') {
        return;
      }
      payload[key] = typeof value === 'string' ? value.trim() : value;
    });
    payload.access_key = ACCESS_KEY;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.setAttribute('aria-busy', 'true');
    }

    var controller = new AbortController();
    var timeoutId = setTimeout(function() {
      controller.abort();
    }, 10000);

    fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    }).then(function(response) {
      if (!response.ok) {
        throw new Error('network');
      }
      return response.json();
    }).then(function(data) {
      if (data && data.success === false) {
        setStatus('No se ha podido enviar el mensaje. Inténtalo de nuevo.', 'error');
        return;
      }
      form.reset();
      clearAllErrors();
      setStatus('Mensaje enviado correctamente.', 'success');
    }).catch(function(err) {
      if (err && err.name === 'AbortError') {
        setStatus('La solicitud ha tardado demasiado. Inténtalo de nuevo.', 'error');
        return;
      }
      setStatus('No se ha podido enviar el mensaje. Inténtalo de nuevo.', 'error');
    }).finally(function() {
      clearTimeout(timeoutId);
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.removeAttribute('aria-busy');
      }
    });
  });
})();
