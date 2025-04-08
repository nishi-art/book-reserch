import React from 'react'
import { useState } from 'react';

const BookList = ({ data }) => {
    console.log(data);
    const [isAnimating, setIsAnimating] = useState(false);
    const startTitleAnimation = (e) => {
        if(!isAnimating && e.target.tagName === 'P') {
            //const bookName = e.target.querySelector('.book-name');
            e.target.animate([
                {transform: 'translateX(100%)'},
                {transform: 'translateX(-100%)'}],
                {
                    duration: 10000,
                    iterations: Infinity,
                    easing: 'linear',
                });
            setIsAnimating(true);
        }
    }
    const stopTitleAnimation = (e) => {
        if(isAnimating && e.target.tagName === 'P') {
            const animations = e.target.getAnimations();
            animations.forEach((animation) => animation.cancel());
            e.target.style.transform = 'translateX(0px)';
            setIsAnimating(false);
        }
    }
    return (
        <>
            <div className='book-list'>
                {data.Items.map((element) => 
                    <div className='book-info' key={element.Item.isbn}>
                        <div className='book-title' onMouseEnter={startTitleAnimation} onMouseLeave={stopTitleAnimation}><p className='book-name'>{element.Item.title}</p></div>
                        <div className='book-img' ><a href={element.Item.itemUrl}><img src={element.Item.largeImageUrl} alt="" /></a></div>
                        <p className='book-price'>&yen;{element.Item.itemPrice}</p>
                    </div>
                )}
            </div>
        </>
  )
}

export default BookList