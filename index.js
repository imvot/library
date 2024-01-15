function getTemplate() {
    const original = document.querySelector("#template");
    const template = original.cloneNode(true);
    template.id = "";
    return template;
}

class Book {
    constructor({title, author, nbPages, isRead, id=library.length}) {
        this.title = title;
        this.author = author;
        this.nbPages = nbPages;
        this.isRead = isRead;
        this.id = id;
        library[this.id] = this;
        this.create()
    }

    create() {
        const newBook = getTemplate();
        newBook.id = this.id;

        const readStatusCheckbox = newBook.querySelector(".book-itemCheckbox > input");
        readStatusCheckbox.checked = this.isRead;
        const changeChecked = function(e) {
            this.isRead = e.target.checked;
            this.update();
        }.bind(this);
        readStatusCheckbox.addEventListener("change", changeChecked);

        const deleteButton = newBook.querySelector(".book-itemClose > button");
        const deleteBook = function() {
            this.delete(); 
        }.bind(this);
        deleteButton.addEventListener("click", deleteBook);

        main.appendChild(newBook);
        this.update();
    }

    update() {
        const book = document.getElementById(this.id);
        const title = book.querySelector(".book-itemTitle");
        title.innerText = this.title;
        const author = book.querySelector(".book-itemAuthor");
        author.innerText = this.author;
        const nbPages = book.querySelector(".book-itemPages");
        nbPages.innerText = `${this.nbPages} pages`;
        const readStatus = book.querySelector(".book-itemStatus");
        readStatus.innerText = this.isRead ? "Read" : "Not Read"
        this.save();
    }

    save() {
        localStorage.setItem("library", JSON.stringify(library));
    }

    delete() {
        const book = document.getElementById(this.id);
        main.removeChild(book);
        delete library[this.id];
    }
}

const main = document.querySelector("main");

const dialog = document.querySelector("#addBook");
const addBookButton = document.querySelector(".header-button");
addBookButton.addEventListener("click", () => dialog.showModal());

const form = document.querySelector(".addBook-form");
form.addEventListener("submit", e => {
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);
    new Book({
        title: inputs.title,
        author: inputs.author,
        nbPages: inputs["nb-pages"],
        isRead: inputs["read-status"]
    });
})

const storageLibrary = localStorage.getItem("library");
const library = !storageLibrary ? [] : JSON.parse(storageLibrary);
if(storageLibrary) {
    library.forEach(bookData => {
        new Book(bookData) 
    })
}
