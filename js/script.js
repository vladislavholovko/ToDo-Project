	// if (localStorage.getItem('task')!==null){
     //    if 	(confirm('Існують збержені завдання відкрити їх?')){
     //        JSON.parse(localStorage.getItem('task'));
     //        // var j = console.log(j);
     //    } else {
     //        alert("Дані будуть видалені");
     //        localStorage.clear();
     //    }}

//Функція додавання завдання ==================================
function createTodoItem(title){
	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	checkbox.className = 'checkbox mr-2 ';

	const label = document.createElement('label');
	label.innerText = title;
	label.className = 'title mr-2 col-8 ';

	const editInput = document.createElement('input');
	editInput.type = 'text';
	editInput.className = 'textfield mr-2';

	var setTime = new Date();
	const setData = document.createElement('label');
	setData.innerText =  setTime.getHours() +':'+ setTime.getMinutes() +':'+ setTime.getSeconds();
	setData.className = 'mr-2 col-1';

    const upButton = document.createElement('button');
    upButton.innerHTML = '&#x2191;';
    upButton.className = 'reorder-up mr-2'

	const downButton = document.createElement('button');
	downButton.innerHTML= '&#x2193;';
	downButton.className = 'reorder-down mr-2'

	const editButton = document.createElement('button');
	editButton.innerText = 'Змінити';
	editButton.className = 'edit mr-2';

	const deleteButton = document.createElement('button');
	deleteButton.innerHTML = '&#x2718;';
	deleteButton.className = 'delete mr-2 col-1';

	const listItem = document.createElement('li');
	listItem.className = 'todo-item list-group-item m-1 rounded justify-content-around';

	listItem.appendChild(checkbox);  // Поміщаємо всі ці елементи в рядок списку
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(setData);
    listItem.appendChild(upButton);
    listItem.appendChild(downButton);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);

    // localStorage.setItem('task', JSON.stringify(listItem));
 	bindEvents(listItem);
    return listItem; //Повертаємо вміст рядка списку
}
	var i = [createTodoItem()];
console.log(i);
//Функціонал кнопок====================s

function bindEvents(todoItem) { 
	//Виконуємо пошук елементів
    const checkbox = todoItem.querySelector('.checkbox');   
    const editButton = todoItem.querySelector('button.edit');
    const deleteButton = todoItem.querySelector('button.delete');
    const upButton = todoItem.querySelector('button.reorder-up')
    const downButton = todoItem.querySelector('button.reorder-down')
    //Прослуховуємо елементи
    checkbox.addEventListener('change', toggleTodoItem);
    editButton.addEventListener('click', editTodoItem);
    deleteButton.addEventListener('click', deleteTodoItem);
    upButton.addEventListener('click', upTodoItem);
    downButton.addEventListener('click', downTodoItem);
}

// Функція деактевації виконаного елемента
function toggleTodoItem(){				
	const listItem = this.parentNode;
	listItem.classList.toggle('disabled');

}

//Функція зміни завдання
function editTodoItem(){  
	const listItem = this.parentNode;
    const title = listItem.querySelector('.title');
    const editInput = listItem.querySelector('.textfield');
    const isEditing = listItem.classList.contains('editing');

    if (isEditing){
    	title.innerText = editInput.value;
    	this.innerText = "Змінити";
    } else {
    	editInput.value = title.innerText;
    	this.innerText = "Зберегти";
    }
    listItem.classList.toggle('editing');
}

//Функція видалення завдання
function deleteTodoItem(){
	const listItem = this.parentNode;
	todoList.removeChild(listItem);
}

//Функція переміщення вгору
function upTodoItem(){
	var $current = $(this).closest('li')
    var $previous = $current.prev('li');
    if($previous.length !== 0){
    $current.insertBefore($previous);
    }
   return false;
}

//Функція переміщення вниз
function downTodoItem() {
	var $current = $(this).closest('li')
	var $next = $current.next('li');
	if($next.length !== 0){
	$current.insertAfter($next);
	}
    	return false;
}

// =============================

function addTodoItem(event){ 
	event.preventDefault(); // Щоб не оновлювалася сторінка

	if (addInput.value === '') return alert('Введіть назву задачі.'); //Перевіряємо, щоб не були пусті значення

	const todoItem = createTodoItem(addInput.value); // Створюємо константу із введеного значенння
	todoList.appendChild(todoItem); 
	addInput.value = '';
}

const todoForm = document.getElementById('todo-form');
const addInput = document.getElementById('add-input');
const todoList = document.getElementById('todo-list');
const todoItems = document.querySelectorAll('.todo-item');

todoForm.addEventListener('submit',addTodoItem);


