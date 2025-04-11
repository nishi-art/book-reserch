import React from 'react'
import { useState } from 'react';

const BookList = ({ data }) => {
    console.log(data);
    const [isAnimating, setIsAnimating] = useState(false);

    const startTitleAnimation = (e) => {
        if(!isAnimating && e.target.tagName === 'P') {
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
    };
    const stopTitleAnimation = (e) => {
        if(isAnimating) {
            const targetAnimations = e.target.tagName === 'DIV' ? e.target.querySelector('p').getAnimations() : e.target.getAnimations();
            targetAnimations.forEach((animation) => animation.cancel());
            e.target.style.transform = 'translateX(0px)';
            setIsAnimating(false);
        }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 24;
    const totalPages = Math.ceil(data.count / itemsPerPage);

    //現在のページに表示するアイテムの取得
    const currentPageItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.Items.slice(startIndex, endIndex);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    return (
        <>
            <div className='book-list'>
                {currentPageItems().map((element) => 
                    <div className='book-info' key={element.Item.isbn}>
                        <div className='book-title' onMouseEnter={startTitleAnimation} onMouseLeave={stopTitleAnimation}><p className='book-name'>{element.Item.title}</p></div>
                        <div className='book-img' ><a href={element.Item.itemUrl}><img src={element.Item.largeImageUrl} alt="" /></a></div>
                        <p className='book-price'>&yen;{element.Item.itemPrice}</p>
                    </div>
                )}
            </div>
            {totalPages > 1 && (
                <div className='pagination'>
                    {currentPage > 1 && (
                        <button onClick={() => handlePageChange(currentPage - 1)}>前のページ</button>
                    )}
                    {currentPage < totalPages && (
                        <button onClick={() => handlePageChange(currentPage + 1)}>次のページ</button>
                    )}
                </div>
            )}
        </>
  )
}

export default BookList