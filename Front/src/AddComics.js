import React , { useState , useEffect , Fragment } from 'react'
import Axios from 'axios'
import Header from './Header'
import 'bootstrap/dist/css/bootstrap.css';

const AddComics = () => {
    const [categories, setCategories] = useState([])
    const [comicsId, setComicsId] = useState(0)
    const [reload, setReload] = useState(true)
    const [comic , setComic] = useState( 
    { 
        title : '' ,
        writer : '' ,
        categoryId : 0,
        synopsis : '',
        content : ''
    })

    let formDataCover = new FormData();

    useEffect(() => {
        Axios.get("http://localhost:55688/category").then(response => {
            setCategories(response.data);
        })
    }, [reload])

    const changeImage = (event) => {
        formDataCover.append("image", event.target.files[0])
    }

    const fieldChange = (e) => {
        e.persist();  

        setComic({...comic, [e.target.name]: e.target.value}); 
    }

    const sendForm = (event) => {
        event.preventDefault()
        Axios.put(`http://localhost:55688/comics/${comicsId}`, comic).then(response => {
            if (response.data.id > 0) {
                alert("votre oeuvre a bien été enregistré")
            }
            else {
                alert("erreur serveur")
            }
        })
    }

    const uploadImage = (event) => {
        event.preventDefault();
        Axios.post("http://localhost:55688/comics",formDataCover).then(response=> {
            if(response.data.id > 0) {
                alert(`image envoyée votre oeuvre est enregistré au n° ${response.data.id}`)
                setComicsId(response.data.id)
            }
            else {
                alert("erreur serveur");
            }
        })
    }

    return (
        <Fragment>
            <div><Header/></div>

            <div className="container m-200" style={{ marginTop: 200, position: "fixed", left: "20%" , backgroundColor : "black"}}>
                <form id="comicsForm" name="comicsForm" onSubmit={sendForm}>
                    <div className="row">
                        <input onChange={fieldChange} type="text" placeholder="Titre comic" className="col form-control m-1" name="title" />
                    </div>
                    <div className="row">
                        <input onChange={fieldChange} type="text" placeholder="Auteur comic" className="col form-control m-1" name="writer" />
                    </div>

                    <div className="row">
                        <select onChange={fieldChange} name="categoryId" className="col form-control m-1">
                            <option>Choisissez une catégorie</option>
                            {categories.map((cat, index) => <option key={index} value={cat.id}>{cat.title}</option>)}
                        </select>
                    </div>

                    <div className="container">
                        <div className="input-group">
                            <div className="custom-file">

                                <input type="file" onChange={changeImage} className="custom-file-input" id="customFile" name="image" accept="image/png, image/jpeg" />
                                <label className="custom-file-label" htmlFor="customFile">Choisir une image:</label>
                            </div>
                            <div class="input-group-append">
                        <button class="btn btn-outline-secondary" onClick={uploadImage} type="button">Upload</button>
                    </div>

                        </div>
                    </div>
                    <div className="row">
                        <textarea onChange={fieldChange} className="col form-control m-1" name="synopsis">

                        </textarea>
                    </div>
                    <div className="row">
                        <textarea onChange={fieldChange} className="col form-control m-1" name="content">

                        </textarea>
                    </div>
                    <div className="row">
                        <button className="col btn btn-header form-control m-1" type="submit" disabled ={(comicsId > 0) ? false : true}>Valider</button>
                        
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default AddComics
