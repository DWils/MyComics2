import React, { Component } from 'react';
import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Tuiles from './Tuiles';
import category from './Category';
import Header from './Header'
import herolarge from './img/herolarge.jpg';
import Garfield from './img/Garfield.png';
import Footer from './Footer';
import ComicsSlider from './ComicsSlider';


class App extends Component {

  state = {
    category,
    comics: [],
    // favorites : JSON.parse(localStorage.getItem('favorites'))
  };

  async componentDidMount() {
    let response = await fetch(`http://localhost:55688/comics`);
    const comics = await response.json();
    this.setState({ comics });
  }


  render() {
   

    const categoryName = Object.keys(this.state.category).map(key => {
      return (
        <Tuiles name={key} />
      )
    })

    return (
      <div className="App">
        <link href="https://fonts.googleapis.com/css?family=Pacifico|Roboto&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css?family=Kalam&display=swap" rel="stylesheet"></link>

        <Header />


        {/* //////HERO////// */}
        <div className="hero container-fluid">
          <img src={herolarge} alt="Photo d'une planche de Garfield" />
          <div className="container hero">
            <div className="col-md-4 presentation">
              <img src={Garfield} alt="" />
            </div>
            <button className="col-md-4 btn btn-play">
              <span >Lire</span>
            </button>
          </div>
          <div className="overlay"></div>
        </div>
        {/* //////FIN HERO////// */}

        {/* //////CATEGORY////// */}
        <div className="categorys container">
          <div className="row tuiles">
            {categoryName}
          </div>
        </div>


        <ComicsSlider sliderName='Rechercher une BD'/>


        <Footer />


      </div >
    );
  }
}
export default App;
