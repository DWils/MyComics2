import React, { useState, useEffect } from 'react'
import { Fragment } from 'react'
import Detail from './Detail'



const Card = props => {

    const [favList,setFavList] = useState(props.favourites.some(fav => fav.title == props.comic.title)) 
    const [openDetail, setOpenDetail] = useState(false)

    const btnAddFav = () =>{
        return (<button type="button" className="btn btn-header" onClick={() => (props.addFavorites(props.comic), setFavList(true))} > Ajouter aux favoris</button>)
        
    }

    const btnRemoveFav = () =>{
        return (<button type="button" className="btn btn-header" onClick={() => (props.removeFavorites(props.comic),setFavList(false))} > Retirer des favoris</button>)
    }

    return (
        <Fragment>
        <div className="card">
            <img src={`data:image/jpeg;base64,${props.comic.coverImage}`} />
            <span className="cardBtn">
                <button type="button" className="btn btn-header" onClick={() => props.detailModal(props.comic)}>Détail</button>
                {(favList || props.favColor == "red") ? btnRemoveFav() : btnAddFav()}
            </span>
        </div >
        <Detail comic= {props.comic}/></Fragment>)


}

export default Card;
