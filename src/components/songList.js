import React, { useState,useEffect } from 'react';
import uuid from 'uuid/v1'
import NewSong from './newsongForm';

const SongList = () => {
    const [songs, setSongs] = useState([
        { title: 'first song', id: 1 },
        { title: 'second song', id: 2 },
        { title: 'third song', id: 3 }
    ]);
    const [age,setAge]= useState(20)
    const addSong=(title)=>{
        setSongs([
            ...songs,{title:title,id:uuid()}
        ])
    }

    //runs when there is any change in songs 
    useEffect(()=>{
        console.log('use effect hook ran',songs)
    },[songs]);

     //runs when there is any change in age 
    useEffect(()=>{
        console.log('use effect hook ran',age)
    },[age])
    return (
        <div className="song-list">
            <ul>
                {songs.map(song=>{
                    return (<li key={song.id}>{song.title}</li>)
                })}
                <NewSong addSong={addSong}/>
                <button onClick={()=>setAge(age+1)}>add 1 age to {age} </button>
            </ul>
        </div>
    )
}

export default SongList;