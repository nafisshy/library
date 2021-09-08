let myLibrary=[];//the collection of books is maintained in this array
let i=0;//this is a helping varible used to keep track of number of books in each shelf
let bookNumber=0;
let shelfNo=1;

function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

if (storageAvailable('localStorage')) {
    // Yippee! We can use localStorage awesomeness
    console.log("storage avialable");
    if(localStorage.getItem('library')) {
        myLibrary=JSON.parse(window.localStorage.getItem('library'));
        display();
      } else {
        console.log("storage available but could not be accesed");
        initial_books();
      }
  }
  else {
    console.log("storage is not available");
    //Adding two books to the display
    initial_books();
}

function initial_books(){
    addBookToLibrary("Pride and Prejudice","Jane Austen",328,true);
    addBookToLibrary("Epic of Gilgamesh","Sin-Leki-Anini",12,true);
    display();
}
appending_new_book_btn();
function update_library(){
    window.localStorage.setItem('library', JSON.stringify(myLibrary));
}
function Book(title,author,pages,read){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
}

function addBookToLibrary(title,author,pages,read){
    const newBook = new Book(title,author,pages,read);
    myLibrary.push(newBook);
    update_library();
}

function display(){
    myLibrary.forEach((book)=> {
        addBookToShelf(book);   
    });  
}

function addBookToShelf(book){
    const div=document.createElement('div');
        div.style.cssText="background-color:#cfa67c;width:14%; height:90%; font-family: 'Eagle Lake'; display:flex; flex-direction:column; align-items:center; justify-content:space-around; border:4px solid darkgoldenrod";
        const bookTitle=document.createElement('p');
        bookTitle.textContent= book.title;
        bookTitle.style.minHeight="0";
        bookTitle.style.fontWeight="bold";
    div.appendChild(bookTitle);
    if(book.title.length>18){
        bookTitle.classList.toggle("zoom");//zooms the title on hover in case title is too long because the font size gets smaller as the length increases to fit inside the div
    }
        const bookAuthor=document.createElement('p');
        bookAuthor.textContent= book.author;
        bookAuthor.style.minHeight="0";
    div.appendChild(bookAuthor);
    if(book.author.length>18){
        bookAuthor.classList.toggle("zoom");//zooms the author on hover in case author name is too long because the font size gets smaller as the length increases to fit inside the div
    }
        const bookPage=document.createElement('p');
        bookPage.textContent= book.pages + " pages";
        bookPage.style.minHeight="0";
    div.appendChild(bookPage);
        const bookRead=document.createElement('button');

        bookRead.style.border="none";
        bookRead.style.borderRadius="5%";
        bookRead.style.paddingTop="0";
        bookRead.style.color="#e0e0e0";
        if(book.read==true){
            bookRead.textContent="READ";
            bookRead.style.backgroundColor="green";
        }
        else{
            bookRead.textContent="NOT READ";
            bookRead.style.backgroundColor="red";
        }       
    div.appendChild(bookRead);
        const remove=document.createElement('button');

        remove.style.border="none";
        remove.style.borderRadius="5%";
        remove.style.paddingTop="0";
        remove.textContent="REMOVE";
        remove.style.backgroundColor="#008080";
        remove.style.color="#e0e0e0";
    div.appendChild(remove);
    div.dataset.bookNumber=bookNumber++;//associating book number withe the div displaying that particular book
        let shelfId=getShelf();
        const shelf= document.querySelector(shelfId);
        shelf.appendChild(div);
        resize_to_fit(bookTitle,div,20);
        resize_to_fit(bookAuthor,div,15);
        resize_to_fit(bookPage,div,10);
        bookRead.addEventListener('click',function(){
            book.read=!book.read;
            update_library();
            if(book.read==true){
                bookRead.textContent="READ";
                bookRead.style.backgroundColor="green";
            }
            else{
                bookRead.textContent="NOT READ";
                bookRead.style.backgroundColor="red";
            }
        });
        remove.addEventListener('click',()=>remove_book(div));
}

function appending_new_book_btn(){
    let shelfId=getShelf();
    if(shelfId!="#shelf1"&&shelfId!="#shelf2"&&shelfId!="#shelf3"){
        create_new_shelf();
    }
    const shelf= document.querySelector(shelfId);
    const div=document.createElement('div');
    div.setAttribute("id","add-bk-btn");
    div.style.cssText="background-color:#cfa67c;width:14%; font-family: 'Eagle Lake'; height:90%; display:flex; flex-direction:column; align-items:center; border:4px solid darkgoldenrod";
    const p= document.createElement('p');
    p.textContent="Add New Book";
    div.append(p);
    const img=document.createElement('img');
    img.setAttribute("src","plus-sign.png");
    img.height=60;
    img.width=80;
    div.append(img);
    shelf.append(div);
    div.addEventListener('click',()=>{
        const form = document.getElementById("book-form");
         form.style.display="block";

    });

}

function getShelf(){
    ++i;
    if(i%6==0){
        shelfNo++;
        create_new_shelf();
        i++;
    }
        return "#shelf"+shelfNo;
}

function resize_to_fit(node,nodeContainer,initialFontSize) {
    do{
    node.style.fontSize = (initialFontSize--) + 'px';
    if(initialFontSize==0){
        break;
    }
    }while(node.clientWidth >= nodeContainer.clientWidth);
  }

  function closeForm(){
      const form = document.getElementById("book-form");
      form.style.display="none";
  }

  function add_book(){
      //acceseses form inputs to create a new book and adds it to library
      let bookTitle=document.getElementById("book-title").value;
      let author=document.getElementById("author").value;
      let pages=document.getElementById("pages").value;
      let read=document.getElementById("read").checked;
      remove_add_book_btn();
      addBookToLibrary(bookTitle,author,pages,read);
      displayLastBook();
      appending_new_book_btn();
      closeForm();
  }

  function remove_add_book_btn(){
      document.getElementById("add-bk-btn").remove();
      i--;
  }

  function displayLastBook(){
      let book= myLibrary[myLibrary.length-1];
      addBookToShelf(book);
  }

  function remove_book(book){
    let confirmed=confirm("Are you sure? This book will be deleted");
    if(!confirmed){
        return;
    }
    let currentBookNumber=book.dataset.bookNumber;
    myLibrary.splice(currentBookNumber,1);
    update_library();
    book.remove();
  }

  function create_new_shelf(){
      const container=document.getElementById("container");
      const newShelf=document.createElement('div');
      newShelf.setAttribute("id","shelf"+shelfNo);
      newShelf.classList.toggle('shelf');
      container.append(newShelf);
  }

  function clearLibrary(){
    let confirmed=confirm("Are you sure? All the books will be deleted!");
    if(!confirmed){
        return;
    }
      myLibrary=[];
      update_library();
      const books = document.querySelectorAll('[data-book-number]');
      books.forEach(book=>book.remove());
      const shelfs = document.querySelectorAll('.shelf');
      shelfs.forEach(shelf=>shelf.remove());
      shelfNo=1;
      create_new_shelf();
      appending_new_book_btn();
  }
