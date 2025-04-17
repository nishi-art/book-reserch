import React from 'react';
import { useEffect, useState } from 'react';
import KeywordList from './KeywordList';
import BookList from './BookList';

const Reserch = ({ keyword, setKeyword, keywordList, handleAddKeyword, handleRemoveKeyword, data, checked, handleToggleChecked, visibleKeywordList, visibleBookList, handleSerchbtnClick }) => {
    const [isHover, setIsHover] = useState(() => 
        JSON.parse(localStorage.getItem('isHover')) ?? true);
    useEffect(() => {
        localStorage.setItem('isHover', JSON.stringify(isHover));
    }, [isHover]);

    //IshoverはKeywordList.jsのulタグの表示、非表示に使うため下記ではBookListとulが同時に表示されることを防いでいる
    useEffect(() => {
        setIsHover(prevIsHover => !prevIsHover)
    }, [visibleBookList]);

    return (
        <>
            <div className='reserch-main'>
                <div className='serch-box'>
                    <form className='form' onSubmit={handleAddKeyword}>
                        <input className='serch' type="text" placeholder='キーワードを追加する' onChange={e => {setKeyword(e.target.value.trim())}} value={keyword} />
                        <button className='select-btn btn' type='submit'>+</button>
                    </form>
                    <button className='serch-btn btn' onClick={handleSerchbtnClick}></button>
                </div>
                <div className='keyword-content'><KeywordList keywordList={keywordList} checked={checked} handleRemoveKeyword={handleRemoveKeyword} handleToggleChecked={handleToggleChecked} visibleKeywordList={visibleKeywordList} isHover={isHover} setIsHover={setIsHover} /></div>
                {data && visibleBookList && <BookList data={data} />}
            </div>
        </>
    )
}

export default Reserch