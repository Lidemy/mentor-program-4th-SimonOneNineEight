const request = require('request');
const process = require('process');

const apiUrl = 'https://lidemy-book-store.herokuapp.com/';
const command = process.argv[2];
const content = process.argv[3];
const patchChange = process.argv[4];

const list = () => {
  request({
    url: `${apiUrl}books?_limit=20`,
  }, (error, body) => {
    if (error) {
      console.log('error');
      return;
    }
    const data = JSON.parse(body);
    for (let i = 0; i < data.length; i += 1) {
      console.log(`${data[i].id} ${data[i].name}`);
    }
  });
};

const read = (id) => {
  request({
    url: `${apiUrl}/books/${id}`,
  }, (error, body) => {
    if (error) {
      console.log('error');
      return;
    }
    const data = JSON.parse(body);
    console.log(data);
  });
};

const create = (bookName) => {
  request.post(`${apiUrl}books/`, { form: { name: `${bookName}` } });
};

const deleteBook = (id) => {
  request.delete(`${apiUrl}books/${id}`, (error) => {
    if (error) {
      console.log('error');
      return;
    }
    console.log(`Book ID: ${id} has been deleted`);
  });
};

const update = (id, newName) => {
  request.patch(`${apiUrl}books/${id}`, { form: { name: `${newName}` } });
  console.log(`Book ID: ${id} has been updated`);
};

switch (command) {
  case 'list':
    list();
    break;
  case 'read':
    read(content);
    break;
  case 'create':
    create(content);
    break;
  case 'delete':
    deleteBook(content);
    break;
  case 'update':
    update(content, patchChange);
    break;
  default:
    console.log('Availiable commands: list, read, create, delete, update');
}
