import React, {useState} from 'react';

const NewSong =({addSong})=>{
    const [title,setTitle] =useState('');
    const handleSubmit=(e)=>{
        e.preventDefault();
        addSong(title);
        setTitle('');
    }
    return(
        <form onSubmit={handleSubmit}>
            <label>Song Name</label>
            <input type="text" value={title} required onChange={(e)=>{setTitle(e.target.value)}} />
            <input type="submit" value="add song"/>
        </form>
    )
}

export default NewSong;