let myLibrary=[];
let i=0;
addBookToLibrary("book name","i am author",26,true);
addBookToLibrary("book name","i am author",26,true);
addBookToLibrary("book name hjhgfgfghfhjghgjhghj","i am author hjjhjhjjhjhjhjh",26,true);
addBookToLibrary("Lord Of The Rings","J R R Tolkien",26,true);
addBookToLibrary("book name","i am author",26,true);
addBookToLibrary("book name","i am author",26,true);
addBookToLibrary("book name","i am author",26,true);
addBookToLibrary("book name","i am author",26,true);
addBookToLibrary("book name","i am author",26,true);
addBookToLibrary("book name","i am author",26,true);
addBookToLibrary("book name","i am author",26,true);
addBookToLibrary("book name","i am author",26,true);
display();

function Book(title,author,pages,read){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
}

function addBookToLibrary(title,author,pages,read){
    const newBook = new Book(title,author,pages,read);
    myLibrary.push(newBook);
}

function display(){
    myLibrary.forEach(book => {
        const div=document.createElement('div');
        div.style.cssText="background-color:#cfa67c;width:10%; height:90%; font-family: 'Eagle Lake'; display:flex; flex-direction:column; align-items:center; border:4px solid darkgoldenrod";
        const h4=document.createElement('h4');
        h4.textContent= book.title;
        div.appendChild(h4);
        const bookAuthor=document.createElement('h5');
        bookAuthor.textContent= book.author; 
        div.appendChild(bookAuthor);
        const bookPage=document.createElement('h5');
        bookPage.textContent= book.pages + " pages";
        div.appendChild(bookPage);
        const bookRead=document.createElement('button');

        bookRead.style.border="none";
        bookRead.style.borderRadius="3px";
        if(book.read==true){
            bookRead.textContent="READ";
            bookRead.style.backgroundColor="green";
        }
        else{
            bookRead.textContent="NOT READ";
            bookRead.style.backgroundColor="red";
        }       
        div.appendChild(bookRead);
        let shelfId=getShelf();
        const shelf= document.querySelector(shelfId);
        shelf.appendChild(div);
        bookRead.addEventListener('click',function(){
            book.read=!book.read;
            if(book.read==true){
                bookRead.textContent="READ";
                bookRead.style.backgroundColor="green";
            }
            else{
                bookRead.textContent="NOT READ";
                bookRead.style.backgroundColor="red";
            }
        });
    
    });
    let shelfId=getShelf();
    const shelf= document.querySelector(shelfId);
    const div=document.createElement('div');
    div.style.cssText="background-color:#cfa67c;width:10%; font-family: 'Eagle Lake';  height:90%; display:flex; flex-direction:column; align-items:center; border:4px solid darkgoldenrod";
    const p= document.createElement('p');
    p.textContent="Add Book";
    div.append(p);
    const img=document.createElement('img');
    img.setAttribute("src","plus-sign.png");
    img.height=60;
    img.width=80;
    div.append(img);
    shelf.append(div);
}

function getShelf(){
    i++;
    if(i<=6){
        return "#shelf1";
    }
    if(i<=12){
        return "#shelf2";
    }
    if(i<=18){
        return "#shelf3";
    }
}
