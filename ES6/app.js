class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");
    //create tr for values
    const row = document.createElement("tr");

    //insert columns
    const colTitle = document.createElement("td");
    colTitle.innerText = book.title;
    const colAuthor = document.createElement("td");
    colAuthor.innerText = book.author;
    const colIsbn = document.createElement("td");
    colIsbn.innerText = book.isbn;
    const colDelete = document.createElement("td");
    const colAnchor = document.createElement("a");
    colAnchor.classList.add("delete");
    colAnchor.innerText = "X";
    colAnchor.setAttribute("href", "#");
    colDelete.appendChild(colAnchor);
    //append to row
    row.appendChild(colTitle);
    row.appendChild(colAuthor);
    row.appendChild(colIsbn);
    row.appendChild(colDelete);

    list.appendChild(row);
    //observation: these bunch of lines could be easily done with a simple html syntaxe under a "row.innerHTML" as it's shown through the course, BUT...I didn't want that.I wanted to create each part with JS because it's a JS file. But I'm aware this could be solved with 5 lines of code.
  }

  showAlert(message, className) {
    //crete div
    const divAlert = document.createElement("div");
    //add classes
    divAlert.className = `alert-${className}`;
    //add text
    divAlert.appendChild(document.createTextNode(message));
    //insert into the DOM
    //get parent element
    const container = document.querySelector(".container");
    //get form
    const form = document.querySelector("#book-form");
    //insert alert
    container.insertBefore(divAlert, form);

    //timeout
    setTimeout(function () {
      document.querySelector(`.alert-${className}`).remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === "delete") {
      //the target is an <a> for the delete icon. its parent it's a <td>, and its parent's parent is the <tr> WHICH IT'S WHAT WE WANT. so....
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

//////////////////////////////////////////////////////
//Local Storage Class
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();
    console.log(books)
    if (!books) {
      console.log('no books')
    } else {
      console.log(books)
      books.forEach(function(book) {
        const ui = new UI();
  
        //add book to UI
        ui.addBookToList(book);
      });
    }
  }

  static addBook(book) {
    console.log(book);
    const books = Store.getBooks();
    if (!books) {
      console.log('no add books')
    } else {
      console.log(books);
      books.push(book);
      
      localStorage.setItem("books", JSON.stringify(books));
    }
  }

  static RemoveBook(isbn) {
    const books = Store.getBooks();

    //books.forEach(function(book, i){
    //  if(book.isbn === isbn) {
    //    books.splice(i, 1)
    //  }
    //}) 
    //<!--método aplicado no curso, onde um simples filter resolveria-->

    const filteredBooks = books.filter(book => book.isbn !== isbn);
    
    localStorage.setItem('books', JSON.stringify(filteredBooks));
  }
}

////////////////////////////////////////////////////////////////////
//DOM Load Event

document.addEventListener("DOMContentLoaded", Store.displayBooks);

////////////////ADD ITEM
//Event Listeners
const form = document.getElementById("book-form");
form.addEventListener("submit", formSubmit);

function formSubmit(e) {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  //Instantiate book
  const book = new Book(title, author, isbn);

  //instantiate UI
  const ui = new UI();

  //validate
  if (title === "" || author === "" || isbn === "") {
    //error alert
    ui.showAlert("Please fill in all fields", "error");
  } else {
    //add book to list
    ui.addBookToList(book);

    //////////////////////Add to LocalStorage
    Store.addBook(book);

    //show success
    ui.showAlert("Book Added", "success");

    //clear fields
    ui.clearFields();
  }

  e.preventDefault();
}

////////////////DELETE ITEM
//event listener
const bookListItem = document.getElementById("book-list");
bookListItem.addEventListener("click", deleteItem);
//it triggers once you click everywhere in the element (<tbody>), so the deleteIcon must be targeted

function deleteItem(e) {
  //instantiate UI
  const ui = new UI();

  //delete book
  ui.deleteBook(e.target);

  // Remove from LS
  // each book has a different ISBN, so we're gonna use it's number as a ID.
  Store.RemoveBook(e.target.parentElement.previousElementSibling.textContent);

  //show message
  ui.showAlert("Book Removed", "success");

  e.preventDefault();
}
