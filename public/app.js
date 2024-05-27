document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');

    if (!form) {
        console.error("Form not found");
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log("Form submitted");

        const title = document.querySelector('input[name="title"]').value;
        console.log("Title:", title);

        const response = await fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: title })
        });

        console.log("Response status:", response.status);

        if(response.ok) {
            const result = await response.json();
            console.log("Success response:", result);
            print(result.message);
            alert(result.message);
        } else {
            const error = await response.json();
            console.log("Error response:", error);
            alert(error.message);
        }
    });

    fetchTodos();
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
                    //alert(result.message);
                    form.closest('tr').remove();
                } else {
                    const error = await response.json();
                    alert('Failed to delete TODO: ' + error.message);
                }
            }
        });
    });
}
