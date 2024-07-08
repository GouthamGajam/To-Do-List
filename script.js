document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task');
    const taskDesc = document.getElementById('dis');
    const todoList = document.querySelector('.container2');

    const fetchTasks = async () => {
        try {
            const response = await fetch('/task'); // Adjust the route as needed
            const tasks = await response.json();
            todoList.innerHTML = '';
            tasks.forEach(task => {
                addTaskToDOM(task);
            });
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const addTaskToDOM = task => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.id = task._id;
        card.innerHTML = `
            <div class="close-btn">&times;</div>
            <div class="card-body">
                <h5 class="card-title">${task.Name}</h5>
                <p class="card-text">${task.Task}</p>
            </div>
        `;
        todoList.appendChild(card);
    };

    const addTask = async (name, task) => {
        try {
            const response = await fetch('/task/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Name: name, Task: task })
            });
            const newTask = await response.json();
            addTaskToDOM(newTask.taskk); // Adjust response as per your API
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const deleteTask = async id => {
        try {
            await fetch(`/task/delete/${id}`, {
                method: 'DELETE'
            });
            const card = todoList.querySelector(`[data-id="${id}"]`);
            todoList.removeChild(card);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    taskForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = taskInput.value.trim();
        const task = taskDesc.value.trim();
        if (name && task) {
            addTask(name, task);
            taskForm.reset();
        }
    });

    todoList.addEventListener('click', e => {
        if (e.target.classList.contains('close-btn')) {
            const id = e.target.closest('.card').dataset.id;
            deleteTask(id);
        }
    });

    fetchTasks();
});