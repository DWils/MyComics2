import React, { useState, Fragment } from 'react';
import Axios from 'axios';
import Header from './Header'
import 'bootstrap/dist/css/bootstrap.css';
import { Button , Modal} from 'antd';

const Subscribe = () => {

    const subscriber =
    {
        'nickname': '',
        'pass': '',
        'verificationPass': '',
        'email': '',
        'isAdmin': 1
    }
    const [visible, setVisible] = useState(false)

    const showModal = () => {
        setVisible(true)
    };

    const submit = event => {
        event.preventDefault()
        console.log(subscriber);
        Axios.post("http://localhost:55688/customer", subscriber)
            .then(response => {
                if (response.id > 0) {
                    alert("vous êtes maintenant enregistré, il ne reste plus qu'a vous connecter:)");
                } else {
                    alert("une erreur s'est produite, veuillez contacter un administrateur");
                }
            })
    };

    const handleChange = e => {
        e.preventDefault();
        subscriber[e.target.name] = e.target.value;
    };
    return (
        <div>
            <Button type="inscription" className="btn-modal-inscription" onClick={showModal}>
                Inscription
            </Button>
            <Modal title="Inscription"
                visible={visible}
                onOk={}>

                <div>
                    <form id="comicsForm" className="form-customer" onSubmit={submit}>
                        <div className="row">

                            <input onChange={handleChange} name="nickname" id="form-login" type="text" placeholder="Login" className="col form-control m-1" />
                        </div>
                        <div className="row">

                            <input onChange={handleChange} name="pass" id="form-password" type="text" placeholder="Password" className="col form-control m-1" />
                        </div>
                        <div className="row">

                            <input onChange={handleChange} name="verificationpass" id="form-password-confirm" type="text" placeholder="Confirm your password" className="col form-control m-1" />
                        </div>
                        <div className="row">

                            <input onChange={handleChange} name="email" id="form-email" type="text" placeholder="Enter your email" className="col form-control m-1" />
                        </div>
                        <button className="col btn btn-header form-control m-1" type="submit">Valider</button>
                    </form>
                </div>
            </Modal>
        </div>


    );
}
export default Subscribe;