import React, { useState, useEffect } from 'react'

const BookList = ({ data }) => {
    const [isAnimating, setIsAnimating] = useState(() => 
        JSON.parse(localStorage.getItem('isAnimating')) ?? false);
    useEffect(() => {localStorage.setItem('isAnimating', JSON.stringify(isAnimating))}, [isAnimating]);

    //書籍タイトルのアニメーション開始
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
    //書籍タイトルのアニメーション停止、位置のリセット
    const stopTitleAnimation = (e) => {
        if(isAnimating) {
            const targetAnimations = e.target.tagName === 'DIV' ? e.target.querySelector('p').getAnimations() : e.target.getAnimations();
            targetAnimations.forEach((animation) => animation.cancel());
            e.target.style.transform = 'translateX(0px)';
            setIsAnimating(false);
        }
    };

    const [currentPage, setCurrentPage] = useState(() => 
        JSON.parse(localStorage.getItem('currentPage')) || 1);
    useEffect(() => {
        localStorage.setItem('currentPage', JSON.stringify(currentPage))
    }, [currentPage]);

    //１ページ当たりの書籍表示数
    const itemsPerPage = 24;
    //総ページ数の計算
    const totalPages = Math.ceil(data.count / itemsPerPage);
    //現在のページに表示するアイテムの取得
    const currentPageItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageItems = data.Items.slice(startIndex, endIndex);
        return pageItems;
    };
    //ページの切り替え
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
                        <button className='before-btn' onClick={() => handlePageChange(currentPage - 1)}>前のページ</button>
                    )}
                    <p className='current-page'>{currentPage}</p>
                    {currentPage < totalPages && (
                        <button className='after-btn' onClick={() => handlePageChange(currentPage + 1)}>次のページ</button>
                    )}
                </div>
            )}
        </>
  )
}

export default BookList