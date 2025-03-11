import React from 'react';
import KeywordList from './KeywordList';

const Reserch = ({ keyword, setKeyword, keywordList, handleAddKeyword, handleRemoveKeyword, getBooks }) => {
    
    return (
        <>
            <div className='reserch-main'>
                <div className='serch-box'>
                    <form className='form' onSubmit={handleAddKeyword}>
                        <input className='serch' type="text" placeholder='キーワードを追加する' onChange={e => {setKeyword(e.target.value.trim())}} value={keyword} />
                        <button className='select-btn btn' type='submit'>+</button>
                    </form>
                    <button className='serch-btn btn' onClick={getBooks}></button>
                </div>
                <div className='reserch-main-content'>
                    <div><KeywordList keywordList={keywordList} handleRemoveKeyword={handleRemoveKeyword} /></div>
                </div>
            </div>
        </>
    )
}

export default Reserch