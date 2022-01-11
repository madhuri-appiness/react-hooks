import React ,{useContext} from 'react';
import { BookContext } from '../context/bookContext';


const BookDetail =({book})=>{
    const {dispatch} = useContext(BookContext);

    return (
       <li onClick={()=> dispatch({type:'REMOVE_BOOK', id:book.id})}>
           <div>{book.title}</div>
           <div>{book.author}</div>

       </li>
    )
}


export default BookDetail;