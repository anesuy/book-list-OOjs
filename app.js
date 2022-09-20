//Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI Constructor
function UI() {}

UI.prototype.addBookToList = function (book) {
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
};

//clear fields function
UI.prototype.clearFields = function(){
  document.getElementById('title').value=''
  document.getElementById('author').value=''
  document.getElementById('isbn').value=''
}

//show alerts
UI.prototype.showAlert = function(message, classname){
  


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
  if(title === '' || author === '' || isbn === '' ){
    //error alert
    UI.showAlert('PLease fill in all fields')
  }else{

  //add book to list
  ui.addBookToList(book);

  //clear fields
  ui.cleaFilter()
  }


  e.preventDefault();
}
