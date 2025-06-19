// Section Switching
function showSection(id) {
  document.querySelectorAll('.content-section').forEach(sec => {
    sec.classList.add('hidden');
    sec.classList.remove('active');
  });
  const activeSection = document.getElementById(id);
  activeSection.classList.remove('hidden');
  activeSection.classList.add('active');
}

// =========================
// Enhanced To-Do App
// =========================

const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.innerHTML = `
      <span class="todo-text">${todo.text}</span>
      <button class="delete-btn" onclick="removeTodo(${index})">🗑</button>
    `;
    if (todo.completed) li.querySelector('.todo-text').classList.add('completed');
    li.querySelector('.todo-text').onclick = () => toggleTodo(index);
    todoList.appendChild(li);
  });
}

function addTodo() {
  const value = todoInput.value.trim();
  if (value) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push({ text: value, completed: false });
    localStorage.setItem('todos', JSON.stringify(todos));
    todoInput.value = '';
    loadTodos();
  }
}

function removeTodo(index) {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.splice(index, 1);
  localStorage.setItem('todos', JSON.stringify(todos));
  loadTodos();
}

function toggleTodo(index) {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos[index].completed = !todos[index].completed;
  localStorage.setItem('todos', JSON.stringify(todos));
  loadTodos();
}

// Initialize To-Do
loadTodos();

// =========================
// Interactive Product Listing
// =========================

const products = [
  
  { name: "Laptop", category: "tech", price: 43000, rating: 4.7 },
  { name: "smart phones", category: "tech", price: 1500, rating: 4.2 },
  { name: "JavaScript Book", category: "books", price: 1500, rating: 4.5 },
  { name: "IEEE books", category: "books", price: 900, rating: 4.5 },
  { name: "marketing", category: "books", price: 9000, rating: 4.5 },
  
];




function filterAndSortProducts() {
  const category = document.getElementById('category-filter').value;
  const sortBy = document.getElementById('sort-by').value;

  let filtered = category === 'all'
    ? [...products]
    : products.filter(p => p.category === category);

  if (sortBy === 'price') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  renderProducts(filtered);
}

function renderProducts(list) {
  const container = document.getElementById('product-list');
  container.innerHTML = '';
  list.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product-card';
    div.innerHTML = `
      <h4>${p.name}</h4>
      <p><strong>Category:</strong> ${p.category}</p>
      <p><strong>Price:</strong> $${p.price}</p>
      <p><strong>Rating:</strong> ${p.rating} ⭐</p>
    `;
    container.appendChild(div);
  });
}

// Listeners for both filters
document.getElementById('category-filter').addEventListener('change', filterAndSortProducts);
document.getElementById('sort-by').addEventListener('change', filterAndSortProducts);

// Initial render
filterAndSortProducts();