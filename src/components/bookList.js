import React ,{useContext,useState} from 'react';
import { BookContext } from '../context/bookContext';
import BookDetail from './bookDetail';


const BookList =()=>{
    const {books} = useContext(BookContext);
    
    return (
        books.length ? <div style={{'textAlign':'left', marginBottom:'30px'}}>
            <ul>
                {books.map((book)=>{
                    return (<BookDetail book={book} key={book.id}/>)
                })}
            </ul>
        </div>:
        <div> No books</div>
    )
}


export default BookList;