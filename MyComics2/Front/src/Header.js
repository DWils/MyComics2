import React, { useState } from 'react';
import logo from './img/logo.svg';
import { Link } from 'react-router-dom';
import Axios from 'axios'

const Header = () => {

    const subscriber =
    {
        'nickname': '',
        'pass': ''
    };

    const [identity, setIdentity] = useState(false);
    const [member, setMember] = useState({
        id : 0,
        nickname : '',
        favorite : []
    })


    const authentificate = e => {
        e.preventDefault();
        console.log(subscriber);
        Axios.post("http://localhost:55688/customer/identification", subscriber)
            .then(response => {
                if (response.data.nickname != null) {
                    setMember({nickname: response.data.nickname})
                    console.log(member.nickname);
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
        </form><div><Link to="/subscribe" className="btn btn-header">Inscription</Link></div></div>)
    }

    const connectionSucceed = () => {
        return(<div><p>{member.nickname}</p>
        <Link to="/addComics" className="btn btn-header">Ajouter un Comics</Link></div>)
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