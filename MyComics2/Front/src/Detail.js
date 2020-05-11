import React from 'react';
import IconCross from './IconCross'

const Detail = ({ comic, onClose }) => (
    <div className="content">
        <div className="content__background">
            <div className="content__background__shadow" />
            <img src={`data:image/jpeg;base64,${comic.coverImage}`} />
        </div>
        <div className="content__area">
            <div className="content__area__container">
                <div className="content__title">{comic.title}</div>
                <div className="content__description">
                    {comic.synopsis}
                </div>
            </div>
            <button className="content__close" onClick={onClose}>
                <IconCross />
            </button>
        </div>
    </div>
);

export default Detail;