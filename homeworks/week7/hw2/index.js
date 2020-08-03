/* eslint no-restricted-syntax: 0 */

const elements = document.querySelectorAll('.FAQ__detail');
for (const element of elements) {
  element.addEventListener('click',
    () => {
      const answer = element.querySelector('.FAQ__answer');
      answer.classList.toggle('hide-content');
    });
}
