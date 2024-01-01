function Book(title, author, nbPages, isRead) {
    this.title = title;
    this.author = author;
    this.nbPages = nbPages;
    this.read = isRead;
    this.info = function() {
        readMsg = this.read ? "Already Read" : "Not Read Yet";
        return `${this.title} ${this.author}, ${this.nbPages} pages, ${readMsg}`;
    }
}

const book = new Book("The Hobbit", "Tolkien", 295, true);
console.log(book.info())
