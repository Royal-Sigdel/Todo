document.getElementById('todo-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.querySelector('input[name="title"]').value;

    const response = await fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            title: title
        })
    });

    if (response.ok) {
        const result = await response.json();
        alert(result.message);
        window.location.reload();
    } else {
        const error = await response.json();
        console.log(error.message);
        alert(error.message);
    }
});

async function fetchTodos() {
    const response = await fetch('/');
    const data = await response.text();
    document.documentElement.innerHTML = data;
    setupDeleteForms();
}

function setupDeleteForms() {
    document.querySelectorAll('.inline-form').forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const id = form.closest('tr').dataset.id;
            if (confirm("Are you sure you want to delete this item?")) {
                const response = await fetch(`/${id}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    const result = await response.json();
                    alert(result.message);
                    form.closest('tr').remove();
                } else {
                    const error = await response.json();
                    alert('Failed to delete TODO: ' + error.message);
                }
            }
        });
    });
}

window.onload = fetchTodos;
