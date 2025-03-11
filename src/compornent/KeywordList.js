import React from 'react'

const KeywordList = ({ keywordList, handleRemoveKeyword }) => {
    return (
        <>
            {
            keywordList.length > 0 && 
                <div>
                    <p>キーワード一覧</p>
                    <ul className='keyword-list'>
                    {
                    keywordList.map((keyword) => 
                        <div className='keyword'  key={keyword.id}>
                            <li>{keyword.name}</li>
                            <button onClick={() => handleRemoveKeyword(keyword.id)}>×</button>
                        </div>)
                    }
                    </ul>
                </div>
            }
        </>
    )
}

export default KeywordList