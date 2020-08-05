/* eslint no-restricted-syntax: 0 */
/* eslint no-alert:0 */

document.querySelector('.form').addEventListener('submit',
  (e) => {
    e.preventDefault();
    let hasError = false;
    const values = {};
    const elements = document.querySelectorAll('.required');
    for (const element of elements) {
      const textInputs = element.querySelector('input[type=text]');
      const radios = element.querySelectorAll('input[type=radio]');
      if (textInputs) {
        values[textInputs.name] = textInputs.value;
        if (!textInputs.value) {
          element.classList.remove('hide-error');
          hasError = true;
        } else {
          element.classList.add('hide-error');
        }
      } else if (radios.length) {
        const hasValue = [...radios].some(radio => radio.checked);
        if (!hasValue) {
          element.classList.remove('hide-error');
          hasError = true;
        } else {
          element.classList.add('hide-error');
        }
      }
    }
    values.advice = document.querySelector('input[name=advice]').value;
    if (!hasError) {
      alert(JSON.stringify(values));
    }
  });
