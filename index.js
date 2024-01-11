function getTemplate() {
    const original = document.querySelector("#template");
    const template = original.cloneNode(true);
    template.id = "";
    return template;
}

const main = document.querySelector("main");
const library = []

class Book {
    constructor(title, author, nbPages, isRead) {
        this.title = title;
        this.author = author;
        this.nbPages = nbPages;
        this.isRead = isRead;
        this.id = library.length;
        library[this.id] = this;
        this.create()
    }

    create() {
        const newBook = getTemplate();
        newBook.id = this.id;
        main.appendChild(newBook);
        this.update()
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
    }
}
