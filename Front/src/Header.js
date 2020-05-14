import React, { useState } from 'react';
import logo from './img/logo.svg';
import { Link } from 'react-router-dom';
import Axios from 'axios'
import Subscribe from './Subscribe'
import AddComics from './AddComics'

const Header = () => {

    

    const subscriber =
    {
        'nickname': '',
        'pass': ''
    };
    const [vosFav, setVosFav] = useState([])
    const [identity, setIdentity] = useState(false);
    const [member, setMember] = useState({
        id : 0,
        nickname : '',
        favorite : []
    })


    const authentificate = e => {
        e.preventDefault();
        Axios.post("http://localhost:55688/customer/identification", subscriber)
            .then(response => {
                if (response.data.nickname != null) {
                    setMember({nickname: response.data.nickname, id : response.data.id})
                    setIdentity(true);
                } else {
                    alert("une erreur s'est produite, veuillez revérifier votre mot de passe ou votre pseudo");
                }
            })
    };

    const handleChange = e => {
        e.preventDefault();
        subscriber[e.target.name] = e.target.value;
    };

    const formConnexion = () => {
        return (<div><form className="form-group form-header" onSubmit={authentificate}>
            
            <div className="login">
                <span className="text">Login :</span>
                <input type="text" class="form-control input-header" aria-label="login" aria-describedby="basic-addon1" name="nickname" onChange={handleChange}></input>
            </div>
            <div className="password">
                <span className="text">Password :</span>
                <input type="password" class="form-control input-header" aria-label="password" aria-describedby="basic-addon1" name="pass" onChange={handleChange}></input>
            </div>
            <button type="submit" className="btn btn-header">Connexion</button>
        </form><Subscribe>Inscription</Subscribe></div>)
    }

    const connectionSucceed = () => {
        sessionStorage.setItem('connectedMember',member.nickname)
        const connectedMember = sessionStorage.getItem('connectedMember')
        return(<div><p>{connectedMember}</p><AddComics/></div>)
    }

    return (
        <header className="App-header">
            <div className="header container-fluid">
                <Link to="/" className="logo"><img src={logo} alt="Logo my comics" /></Link>
                <div className="register">
                    {identity ? connectionSucceed() : formConnexion() }
                </div>
            </div>



        </header>
    );
}

export default Header;