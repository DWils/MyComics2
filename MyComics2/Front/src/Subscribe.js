import React, { useState, Fragment } from 'react';
import Axios from 'axios';
import Header from './Header'
import { Modal, Button } from 'antd'
import 'bootstrap/dist/css/bootstrap.css';

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

    const handleCancel = e => {
        setVisible(false)
    };

    const handleChange = e => {
        e.preventDefault();
        subscriber[e.target.name] = e.target.value;
    };
    return (
        <Fragment>
            <Button type="inscription" className="btn-modal-inscription" onClick={showModal}>
                Inscription
        </Button>
            <Modal
                title="Inscription"
                visible={visible}
                onOk={submit}
                onCancel={handleCancel}
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>,
                    <Button key="submit" type="primary" onClick={submit}>
                        Submit
                    </Button>,
                ]}
            >
                <div className="form-customer">
                    <label htmlFor="">Identifiant :</label>
                    <input onChange={handleChange} value={subscriber.nickname} name="nickname" id="form-login" type="text" placeholder="Identifiant" />
                    <label htmlFor="">Mot de Passe :</label>
                    <input onChange={handleChange} value={subscriber.pass} name="pass" id="form-password" type="text" placeholder="mot de passe" />
                    <label htmlFor="">Confirmez votre mot de passe :</label>
                    <input onChange={handleChange} value={subscriber.passverification} name="verificationPass" id="form-password-confirm" type="text" placeholder="Confirmez votre mot de passe" />
                    <label htmlFor="">Email :</label>
                    <input onChange={handleChange} value={subscriber.email} name="email" id="form-email" type="text" placeholder="Entrez votre adresse mail" />
                </div>
            </Modal>
        </Fragment>
    );
}
export default Subscribe;