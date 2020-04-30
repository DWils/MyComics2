import React from 'react'



const Tuiles = ({ name }) => {

    return(
        <div className="category col-md-3">
            <div className="speech">
                <img src={`${process.env.PUBLIC_URL}/img/category/logo-${name}.png`} alt="" />
            </div>
        </div>

    )
}

export default Tuiles;