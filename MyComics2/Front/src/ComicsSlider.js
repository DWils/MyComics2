import React, { useState, useEffect, Fragment } from 'react'
import Axios from 'axios'
import Star from './Star'
import './ComicsSlider.scss'
import Slider from "react-slick";
import Card from "./Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const ComicsSlider = ({ sliderName }) => {

    const [reload, setReload] = useState(false)
    const [comics, setComics] = useState([]);
  

    useEffect(() => {
        Axios.get("http://localhost:55688/comics").then(response => {
            setComics(response.data);
        })
            .catch(err => console.log(err))
    }, [reload])

    const search = event => {
        const recherche = event.target.value
        if (recherche != "") {
            Axios
                .get(`http://localhost:55688/comics/recherche/${recherche}`)
                .then(response => {
                    setComics(response.data);

                })
                .catch(err => console.log(err))
        }
        else {
            Axios.get("http://localhost:55688/comics").then(response => {
                console.log(response.data);
                setComics(response.data);
            })
                .catch(err => console.log(err))
        }
    }

 

    const settings = {
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const mesFav = () => {
        alert("hello")
    }

    return (
        <Fragment>

            <div class="form__group field">
                <input type="input" class="form__field" placeholder="title" name="title" id='title' onChange={search} />
                <label for="name" class="form__label">{sliderName}</label>
            </div>

            <div className="row btn-mesFav m-5">
                <div className="col-md-2 btn btn-genre">
                    <span className="mesFav" onClick={mesFav}>Vos Favoris</span>
                </div>
            </div>

            <div className='cards-slider'>
                <Slider {...settings} className='cards-slider-wrapper'>
                    {
                        comics.map(comic => <Card comic={comic}/>
                            )
                    }
                </Slider>
            </div>
        </Fragment>
    )
}

export default ComicsSlider
