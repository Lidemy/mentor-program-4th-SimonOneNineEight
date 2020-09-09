/* eslint no-undef: 0 */
/* eslint no-use-before-define: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-useless-escape: 0 */
/* eslint prefer-template: 0 */

$(document).ready(() => {
  // add Todos
  let todoCount = 0;
  let incompleteTodoCount = 0;
  const template = `
    <div class='todo_detail d-flex border-bottom mt-3 pb-3 justify-content-between'>
      <div class="custom-control-lg custom-checkbox text-monospace pl-5">
        <label>
          <input type="checkbox" id='todo' class="todo_check custom-control-input">
          <div class="todo_content custom-control-label pl-3">{newToDo}</div>
        </label>
      </div>
      <button type="button" class="btn_remove_todo btn btn-outline-secondary mr-3">&#x2716</button>
    </div>
    `;

  const params = new URLSearchParams(window.location.search);
  const todoId = params.get('id');
  $.getJSON(`http://localhost:8080/todo_list/api_todo.php?id=${todoId}`, (resp) => {
    const data = JSON.parse(resp.comments.todo);
    for (let i = 0; i < data.length; i += 1) {
      const todo = data[i];
      const input = todo.content;
      $('.todo_list').prepend(template.replace('{newToDo}', escapeOutput(input)));
      // clear the input box
      todoCount += 1;
      if (!todo.status) {
        incompleteTodoCount += 1;
      } else {
        $('#todo').prop('checked', true);
      }
    }
    updateToDoCount();
  });

  $('.add_todo_form button').on('click', () => {
    addToDo();
  });

  $('#add_todo').keydown((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addToDo();
    }
  });

  // remove Todos
  $('.todo_list').on('click', '.btn_remove_todo', (e) => {
    const parent = $(e.target).parent();
    parent.remove();
    const isChecked = parent.find('.todo_check').is(':checked');
    todoCount -= 1;
    if (!isChecked) {
      incompleteTodoCount -= 1;
    }
    updateToDoCount();
  });

  // change todo status
  $('.todo_list').on('change', '.todo_check', (e) => {
    const target = $(e.target);
    const isChecked = target.is(':checked');
    if (isChecked) {
      target.parents('.todo_detail').addClass('checked');
      incompleteTodoCount -= 1;
    } else {
      target.parents('.todo_detail').removeClass('checked');
      incompleteTodoCount += 1;
    }
    updateToDoCount();
  });

  // remove all completed todos
  $('.todo_clear_completed').click(() => {
    $('.todo_detail.checked').each((i, el) => {
      todoCount -= 1;
      el.remove();
    });
  });
  // filter todos
  $('.todo_category').click((e) => {
    const target = $(e.target);
    $('.todo_category div').removeClass('active');
    target.addClass('active');
    if (target.hasClass('todo_category_all')) {
      $('.todo_detail').each((i, el) => {
        const element = $(el);
        element.removeClass('todo_no_display');
      });
    } else if (target.hasClass('todo_category_active')) {
      // filter incompleted todos
      $('.todo_detail').each((i, el) => {
        const element = $(el);
        if (element.hasClass('checked')) {
          element.addClass('todo_no_display');
        } else {
          element.removeClass('todo_no_display');
        }
      });
    } else {
      // filter completed todos
      $('.todo_detail').each((i, el) => {
        const element = $(el);
        if (!element.hasClass('checked')) {
          element.addClass('todo_no_display');
        } else {
          element.removeClass('todo_no_display');
        }
      });
    }
  });

  // get todo info for api
  $('.save_todo').click(() => {
    const todos = [];
    $('.todo_detail').each((i, element) => {
      const checked = $(element).hasClass('checked');
      const content = $(element).find('.todo_content').text();
      todos.push({
        status: checked,
        content,
      });
    });
    const todosData = JSON.stringify(todos);
    $.ajax({
      type: 'POST',
      url: 'http://localhost:8080/todo_list/api_save_todos.php',
      data: {
        todo: todosData,
      },
      success: (resp) => {
        const respId = resp.id;
        window.location = 'index.html?id=' + respId;
      },
    });
  });

  function updateToDoCount() {
    $('.incomplete_todo_count').text(incompleteTodoCount);
  }

  function addToDo() {
    const newToDo = $('#add_todo').val();
    if (!newToDo) return;
    $('.todo_list').prepend(template.replace('{newToDo}', escapeOutput(newToDo)));
    // clear the input box
    $('#add_todo').val('');
    todoCount += 1;
    incompleteTodoCount += 1;
    updateToDoCount();
  }

  function escapeOutput(toOutput) {
    return toOutput.replace(/\&/g, '&amp;')
      .replace(/\</g, '&lt;')
      .replace(/\>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/\'/g, '&#x27')
      .replace(/\//g, '&#x2F');
  }
});
