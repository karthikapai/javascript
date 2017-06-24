var todoList = {
  todos: [],
  
  displayTodos: function() {
    if (this.todos.length === 0) {
      console.log ("There are no to dos");
    } else {
      console.log ("My Todos:");
      for(i=0;i<this.todos.length;i++) {
        console.log(this.todos[i].todoText + " " + this.todos[i].completed);  
      }
    }
  },
  
  addTodo: function(newTodo) {
    this.todos.push({
      todoText: newTodo,
      completed: false
    });
    view.displayTodos();
  },
  
  changeTodo: function(position, newTodo) {
    this.todos[position].todoText = newTodo;
    view.displayTodos();
  },

  deleteTodo: function(position) {
    this.todos.splice(position, 1);
    view.displayTodos();
  },
  
  toggleCompleted: function(position) {
    this.todos[position].completed = !this.todos[position].completed;
    view.displayTodos();
  },
  
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    
    this.todos.forEach(function(todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });
    
    if (completedTodos === totalTodos) {
      this.todos.forEach (function(todo) {
        todo.completed = false;
      });  
    } else {
 
      this.todos.forEach (function(todo) {
        todo.completed = true;
      });
    }
    
    view.displayTodos();
  }
};

var handlers = {
  
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
  },
  
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
  },
  
  deleteTodo: function(position) {
    // var deleteTodoPositionInput = document.getElementById('deleteTodoPositionInput');
    todoList.deleteTodo(position);
    // deleteTodoPositionInput.value = '';
  },
  
  toggleCompleted: function() {
    var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
  },
};

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
  
    todoList.todos.forEach(function(todo, position) {
      var todoLi = document.createElement('li');
      var todoTextWithCompletion = '';
      
     if (todo.completed === true) {
      todoTextWithCompletion = "(x) " + todo.todoText + (" ");  
        } else {
      todoTextWithCompletion = "( ) " + todo.todoText + (" ");
        }
      
      todoLi.id = position;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }, this);
  },
  
  createDeleteButton: function(){
    var deleteButton = document.createElement('button');
    deleteButton.className = 'deleteButton';
    deleteButton.textContent = 'Delete';
    return deleteButton;
  },
  
  setupEventListeners: function() {
    var todosUl = document.querySelector('ul');
    document.addEventListener('click', function(event) {
      var elementClicked = event.target;
      if (elementClicked.className === 'deleteButton') {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));   
      }
    });
  }
  
};

view.setupEventListeners();
