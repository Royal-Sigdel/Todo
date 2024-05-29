document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');

    if (!form) {
        console.error("Form not found");
        return;
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        await addTodo();
    });

    fetchTodos();
});

async function addTodo() {

    var todoInput = document.querySelector('input[name="title"]').value;
    if (todoInput.trim() === '') {
        alert('Please enter a todo item.');
        return;
    }

    console.log('Adding todo:', todoInput);


    document.querySelector('input[name="title"]').value = '';

    try {
        const response = await fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'title': todoInput })
        });

        console.log("Response status:", response.status);

        if (response.ok) {
            const result = await response.json();
            console.log("Success response:", result);
            alert(result.message);

            location.reload();
        } else {
            const error = await response.json();
            console.log("Error response:", error);
            alert(error.message);
        }
    } catch (error) {
        console.error("Error occurred while adding todo:", error);
        alert("An error occurred while adding the todo item.");
    }
}

async function fetchTodos() {
    try {
        const response = await fetch('/');
        const data = await response.text();
        document.documentElement.innerHTML = data;
        setupDeleteForms();
    } catch (error) {
        console.error("Error occurred while fetching todos:", error);
    }
}

function setupDeleteForms() {
    document.querySelectorAll('.inline-form').forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const id = form.closest('tr').dataset.id;
            if (confirm("Are you sure you want to delete this item?")) {
                try {
                    const response = await fetch(`/${id}`, {
                        method: 'DELETE'
                    });

                    if (response.ok) {
                        const result = await response.json();
                        form.closest('tr').remove();
                    } else {
                        const error = await response.json();
                        alert('Failed to delete TODO: ' + error.message);
                    }
                } catch (error) {
                    console.error("Error occurred while deleting todo:", error);
                }
            }
        });
    });
}
