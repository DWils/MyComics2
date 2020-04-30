import React, { useState, useEffect } from 'react'
import Star from './Star'

const Card = props => {

    const [favColor, setFavColor] = useState("lightGrey");
    const [favourites , setFavourites] = useState(()=> {
        const localData = localStorage.getItem('favourites');
        return localData ? JSON.parse(localData) : [];
    })

    useEffect(() => {
        localStorage.setItem('favourites', JSON.stringify(favourites))
    }, [favourites]);

    const manageFavorites = comicName =>{
        if (favColor == "lightGrey") {
            setFavColor("gold");
            addFav(comicName)
        }else{
            setFavColor("lightGrey");  
            removeFav(comicName)
        }
    }

    const addFav = comicName => {
        if(favourites.indexOf(comicName) === -1){
            favourites.push(comicName)
            sessionStorage.setItem(`favourites`, JSON.stringify(favourites))
        }
        else{
            alert("erreur")
            sessionStorage.clear();
        }
        
    }

    const removeFav = comicName => {
        let favIndex = favourites.indexOf(comicName);
        if(favourites.indexOf(comicName) !== -1){
        favourites.splice(favIndex,1);
        sessionStorage.setItem(`favourites`, JSON.stringify(favourites))
        }
    }

    const comicName = props.comic.title;

    return (
        <div className="card">
            <img src={`data:image/jpeg;base64,${props.comic.coverImage}`} />
            <span className="cardBtn">
                <button type="button" className="btn btn-header">Détail</button>
                <button type="button" className="btn btn-light" onClick={() => (manageFavorites(comicName))} ><Star color={favColor} /></button>
            </span>
        </div >)


}

export default Card;
