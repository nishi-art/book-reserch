import React from 'react';
import classNames from 'classnames';

const KeywordList = ({ keywordList, handleRemoveKeyword, handleToggleChecked, visibleKeywordList, isHover, setIsHover }) => {
    const handleMouseEnter = () => {
        setIsHover(true);
    }
    const handleMouseLeave = () => {
        setIsHover(false);
    }
    const classnames = classNames({
        'keyword-list': visibleKeywordList || isHover,
        'keyword-list-none': !visibleKeywordList && !isHover
    });

    return (
        <>
            {
            keywordList.length > 0 && 
                <div>
                    <p className='list-title' onMouseEnter={visibleKeywordList ? null : handleMouseEnter} onMouseLeave={visibleKeywordList ? null : handleMouseLeave}>キーワード一覧</p>
                    <ul className={classnames} onMouseEnter={visibleKeywordList ? null : handleMouseEnter} > {/* 問題点 ホバーしない */}
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
                                    <label><input type="radio" name='genre' value='0' onChange={handleToggleChecked} />全て</label>
                                </div>
                                <div>
                                    <label><input type="radio" name='genre' value='9' onChange={handleToggleChecked} />コミック</label>
                                </div>
                                <div>
                                    <label><input type="radio" name='genre' value='1' onChange={handleToggleChecked} />単行本</label>
                                </div>
                                <div>
                                    <label><input type="radio" name='genre' value='2' onChange={handleToggleChecked} />文庫</label>
                                </div>
                                <div>
                                    <label><input type="radio" name='genre' value='3' onChange={handleToggleChecked} />新書</label>
                                </div>
                                <div>
                                    <label><input type="radio" name='genre' value='4' onChange={handleToggleChecked} />全集・双書</label>
                                </div>
                                <div>
                                    <label><input type="radio" name='genre' value='5' onChange={handleToggleChecked} />事・辞典</label>
                                </div>
                                <div>
                                    <label><input type="radio" name='genre' value='6' onChange={handleToggleChecked} />図鑑</label>
                                </div>
                                <div>
                                    <label><input type="radio" name='genre' value='7' onChange={handleToggleChecked} />絵本</label>
                                </div>
                                <div>
                                    <label><input type="radio" name='genre' value='8' onChange={handleToggleChecked} />カセット、CDなど</label>
                                </div>
                                <div>
                                    <label><input type="radio" name='genre' value='10' onChange={handleToggleChecked} />ムック、その他</label>
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