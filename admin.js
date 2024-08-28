// admin_scripts.js

document.addEventListener('DOMContentLoaded', () => {
    loadCategories();
    loadBooks();
    
    document.getElementById('addCategoryForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const categoryName = document.getElementById('categoryName').value;
        addCategory(categoryName);
    });

    document.getElementById('addBookForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('bookTitle').value;
        const author = document.getElementById('bookAuthor').value;
        const category = document.getElementById('bookCategory').value;
        const pdfLink = document.getElementById('bookPdfLink').value;
        addBook(title, author, category, pdfLink);
    });
});

function loadCategories() {
    fetch('admin_load_categories.php')
        .then(response => response.json())
        .then(data => {
            const categoriesList = document.getElementById('categoriesList');
            const bookCategorySelect = document.getElementById('bookCategory');
            categoriesList.innerHTML = ''; // Clear previous categories
            bookCategorySelect.innerHTML = ''; // Clear previous options

            data.forEach(category => {
                const categoryElement = document.createElement('div');
                categoryElement.className = 'category';
                categoryElement.innerHTML = `
                    <h3>${category.name}</h3>
                    <button onclick="deleteCategory(${category.id})">Delete</button>
                `;
                categoriesList.appendChild(categoryElement);

                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                bookCategorySelect.appendChild(option);
            });
        });
}

function loadBooks() {
    fetch('admin_load_books.php')
        .then(response => response.json())
        .then(data => {
            const booksList = document.getElementById('booksList');
            booksList.innerHTML = ''; // Clear previous books

            data.forEach(book => {
                const bookElement = document.createElement('div');
                bookElement.className = 'book';
                bookElement.innerHTML = `
                    <h4>${book.title}</h4>
                    <p>Author: ${book.author}</p>
                    <a href="${book.pdf_link}" target="_blank">Read PDF</a>
                    <button onclick="deleteBook(${book.id})">Delete</button>
                `;
                booksList.appendChild(bookElement);
            });
        });
}

function addCategory(name) {
    fetch('admin_add_category.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `name=${encodeURIComponent(name)}`
    })
    .then(response => response.text())
    .then(() => {
        loadCategories(); // Refresh category list
    });
}

function addBook(title, author, category, pdfLink) {
    fetch('admin_add_book.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}&category_id=${encodeURIComponent(category)}&pdf_link=${encodeURIComponent(pdfLink)}`
    })
    .then(response => response.text())
    .then(() => {
        loadBooks(); // Refresh book list
    });
}

function deleteCategory(id) {
    fetch(`admin_delete_category.php?id=${id}`, { method: 'DELETE' })
        .then(response => response.text())
        .then(() => {
            loadCategories(); // Refresh category list
        });
}

function deleteBook(id) {
    fetch(`admin_delete_book.php?id=${id}`, { method: 'DELETE' })
        .then(response => response.text())
        .then(() => {
            loadBooks(); // Refresh book list
        });
}
