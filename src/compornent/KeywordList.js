import React from 'react'

const KeywordList = ({ keywordList, handleRemoveKeyword, handleToggleChecked }) => {
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
                        <div className='checkbox-content'>
                            <hr/>
                            <p>ジャンルを選択するとより絞り込めます</p>
                            <div className='checkbox-list'>
                                <div>
                                    <input type="checkbox" name='全て' onChange={handleToggleChecked} />
                                    <span>全て</span>
                                </div>
                                <div>
                                    <input type="checkbox" name='コミック' onChange={handleToggleChecked} />
                                    <span>コミック</span>
                                </div>
                                <div>
                                    <input type="checkbox" name='単行本' onChange={handleToggleChecked} />
                                    <span>単行本</span>
                                </div>
                                <div>
                                    <input type="checkbox" name='文庫' onChange={handleToggleChecked} />
                                    <span>文庫</span>
                                </div>
                                <div>
                                    <input type="checkbox" name='新書' onChange={handleToggleChecked} />
                                    <span>新書</span>
                                </div>
                                <div>
                                    <input type="checkbox" name='全集・双書' onChange={handleToggleChecked} />
                                    <span>全集・双書</span>
                                </div>
                                <div>
                                    <input type="checkbox" name='事・辞典' onChange={handleToggleChecked} />
                                    <span>事・辞典</span>
                                </div>
                                <div>
                                    <input type="checkbox" name='図鑑' onChange={handleToggleChecked} />
                                    <span>図鑑</span>
                                </div>
                                <div>
                                    <input type="checkbox" name='絵本' onChange={handleToggleChecked} />
                                    <span>絵本</span>
                                </div>
                                <div>
                                    <input type="checkbox" name='カセット,CDなど' onChange={handleToggleChecked} />
                                    <span>カセット,CDなど</span>
                                </div>
                                <div>
                                    <input type="checkbox" name='ムックその他' onChange={handleToggleChecked} />
                                    <span>ムックその他</span>
                                </div>
                            </div>
                        </div>
                    </ul>
                </div>
            }
        </>
    )
}

export default KeywordList