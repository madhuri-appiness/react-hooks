import React ,{useContext,useEffect,useRef,useState} from 'react';
import { BookContext } from '../context/bookContext';
import Input from './input';

const NewBookForm =()=>{
    const {dispatch} = useContext(BookContext);
    const [title, setTitle] = useState('');
    const [author,setAuthor] = useState('');
    const titleRef = useRef(null);
    const authorRef = useRef(null);

    useEffect(()=>{
        titleRef.current.focus();
    },[])

    const handleSubmit =(e)=>{
        e.preventDefault();
        dispatch({type:'ADD_BOOK',book:{
            title:title,
            author:author
        }});
        setTitle('');
        setAuthor('');
    }

    const titleKeyDown=(e)=>{
        if(e.key === 'Enter'){
            authorRef.current.focus();
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <Input type="text" value={title} onKeyDown={titleKeyDown} ref={titleRef} onChange={(e)=>setTitle(e.target.value)} />
            <Input type="text" value={author} ref={authorRef} onChange={(e)=>setAuthor(e.target.value)} />
            <Input type="submit" value='Add Book' />
        </form>
    )
}


export default NewBookForm;