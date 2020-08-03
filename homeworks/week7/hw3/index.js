const addToDo = document.querySelector('.add_to_do');
const toDoList = document.querySelector('.to_do_list');
addToDo.querySelector('.submit_to_do').addEventListener('click',
  () => {
    const input = addToDo.querySelector('input[name=to_do_content]').value;
    const newToDo = document.createElement('div');
    newToDo.classList.add('things_to_do');
    newToDo.innerHTML = `
    <label class='to_do_checkbox'>
      <input class='checkbox' type='checkbox'/>
      <span class='checkbox__customize'></span>
    <span class='check_box_content'>${input}</span>
    </label>
    <button class='to_do_delete'>&#x2716</button>`;
    toDoList.appendChild(newToDo);
  });

toDoList.addEventListener('click',
  (e) => {
    if (e.target.classList.contains('to_do_delete')) {
      toDoList.removeChild(e.target.parentNode);
    }
  });
