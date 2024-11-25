// Select DOM elements
const addTodo = document.querySelector('#todo-input');
const form = document.querySelector('form');
const todoListUl = document.querySelector('#todo-list');

// Array to hold todo items
const todos = [];

// Function to create a new todo item
const createTodoItem = (todo, index) => {
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-list');
    todoItem.innerHTML = `
        <span class="todo-text">${index + 1}. ${todo}</span>
        <div>
            <button class="edit-button" type="button">Edit</button>
            <button class="delete-button" type="button">Delete</button>
        </div>
    `;
    return todoItem;
};

// Event listener for form submission
form.addEventListener('submit', e => {
    e.preventDefault(); 

    const todo = addTodo.value.trim(); 

    if (todo.length) {
        todos.push(todo); 
        const todoItem = createTodoItem(todo, todos.length - 1); 
        todoListUl.appendChild(todoItem);
        addTodo.value = ''; 
    }
});

// Event listener for editing and deleting todos
todoListUl.addEventListener('click', (e) => {
    const todoItem = e.target.closest('li'); 
    if (e.target.classList.contains('delete-button')) {
        if (todoItem) {
            const index = Array.from(todoListUl.children).indexOf(todoItem); 
            todos.splice(index, 1); 
            todoListUl.removeChild(todoItem); 
            updateTodoIndices(); 
        }
    } else if (e.target.classList.contains('edit-button')) {
        const todoText = todoItem.querySelector('.todo-text'); 
        const currentText = todoText.textContent.split('. ')[1]; 
        const newText = prompt('Edit your task:', currentText); 
        if (newText !== null && newText.trim().length) {
            const index = Array.from(todoListUl.children).indexOf(todoItem); 
            todos[index] = newText.trim(); 
            todoText.textContent = `${index + 1}. ${newText.trim()}`; 
        }
    }
});


const updateTodoIndices = () => {
    const todoItems = todoListUl.querySelectorAll('.todo-text');
    todoItems.forEach((item, index) => {
        item.textContent = `${index + 1}. ${todos[index]}`;
    });
};