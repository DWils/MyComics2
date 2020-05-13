import React, { useState, useEffect, Fragment } from 'react'
import Axios from 'axios'
import { Modal, Button } from 'antd'
import './Subscribe.css';
import 'bootstrap/dist/css/bootstrap.css';

const AddComics = () => {
    const [categories, setCategories] = useState([])
    const [comicsId, setComicsId] = useState(0)
    const [reload, setReload] = useState(true)
    const [visible, setVisible] = useState(false)
    const [comic, setComic] = useState(
        {
            title: '',
            writer: '',
            categoryId: 0,
            synopsis: '',
            content: ''
        })

    let formDataCover = new FormData();

    const showModal = () => {
        setVisible(true)
    };

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

        setComic({ ...comic, [e.target.name]: e.target.value });
    }

    const sendForm = (event) => {
        event.preventDefault()
        Axios.put(`http://localhost:55688/comics/${comicsId}`, comic).then(response => {
            if (response.data.id > 0) {
                alert("votre oeuvre a bien été enregistré")
                window.location.reload(false);
            }
            else {
                alert("erreur serveur")
                window.location.reload(false);
            }
        })
    }

    const handleCancel = e => {
        setVisible(false)
    };

    const uploadImage = (event) => {
        event.preventDefault();
        Axios.post("http://localhost:55688/comics", formDataCover).then(response => {
            if (response.data.id > 0) {
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
            <button type="button" className="btn btn-header" onClick={showModal}>Ajouter un Comics</button>
            <Modal
                title="AddComics"
                visible={visible}
                onOk={sendForm}
                onCancel={handleCancel}
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>,
                    <Button key="submit" type="primary" onClick={sendForm}>
                        Envoyer
                    </Button>,
                ]}
            >
                <form id="comicsForm" name="comicsForm" onSubmit={sendForm}>
                    <div className="row">
                        <label htmlFor="">Titre :</label>
                        <input onChange={fieldChange} type="text" className="col form-control m-1" name="title" />
                    </div>
                    <div className="row">
                        <label htmlFor="">Auteur :</label>
                        <input onChange={fieldChange} type="text" placeholder="Auteur comic" className="col form-control m-1" name="writer" />
                    </div>

                    <div className="row">
                        <label htmlFor="">Catégorie :</label>
                        <select onChange={fieldChange} name="categoryId" className="col form-control m-1">
                            <option>Choisissez une catégorie</option>
                            {categories.map((cat, index) => <option key={index} value={cat.id}>{cat.title}</option>)}
                        </select>
                    </div>
                    <p>Merci de charger l'image de la couverture avant d'enregistrer le reste du comics</p>
                    <div className="container">
                        <div className="input-group">
                            <div className="custom-file">

                                <label htmlFor="">Couverture :</label>
                                <input type="file" onChange={changeImage} name="image" accept="image/png, image/jpeg" />
                            </div>
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary" onClick={uploadImage} type="button">Upload</button>
                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <label htmlFor="">Synopsis :</label>
                        <textarea onChange={fieldChange} className="col form-control m-1" name="synopsis">

                        </textarea>
                    </div>
                    <div className="row">
                        <label htmlFor="">Contenu :</label>
                        <textarea onChange={fieldChange} className="col form-control m-1" name="content">

                        </textarea>
                    </div>
                </form>
            </Modal>
        </Fragment>
    )
}

export default AddComics
