// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    loadCategories();
});

function loadCategories() {
    fetch('load_categories.php')
        .then(response => response.json())
        .then(data => {
            const categoriesSection = document.getElementById('categories');
            data.forEach(category => {
                const categoryElement = document.createElement('div');
                categoryElement.className = 'category';
                categoryElement.innerHTML = `<h3>${category.name}</h3>`;
                categoryElement.addEventListener('click', () => {
                    loadBooks(category.id);
                });
                categoriesSection.appendChild(categoryElement);
            });
        });
}

function loadBooks(categoryId) {
    fetch(`load_books.php?category_id=${categoryId}`)
        .then(response => response.json())
        .then(data => {
            const booksSection = document.getElementById('books');
            booksSection.innerHTML = ''; // Clear previous books

            data.forEach(book => {
                const bookElement = document.createElement('div');
                bookElement.className = 'book';
                bookElement.innerHTML = `
                    <h4>${book.title}</h4>
                    <p>Author: ${book.author}</p>
                    <a href="${book.pdf_link}" target="_blank">Read PDF</a>
                `;
                booksSection.appendChild(bookElement);
            });
        });
}

function searchBooks() {
    const query = document.getElementById('searchInput').value;
    fetch(`search_books.php?query=${query}`)
        .then(response => response.json())
        .then(data => {
            const booksSection = document.getElementById('books');
            booksSection.innerHTML = ''; // Clear previous books

            data.forEach(book => {
                const bookElement = document.createElement('div');
                bookElement.className = 'book';
                bookElement.innerHTML = `
                    <h4>${book.title}</h4>
                    <p>Author: ${book.author}</p>
                    <a href="${book.pdf_link}" target="_blank">Read PDF</a>
                `;
                booksSection.appendChild(bookElement);
            });
        });
}
