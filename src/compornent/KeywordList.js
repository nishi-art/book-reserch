import React from 'react';
import classNames from 'classnames';

const KeywordList = ({ keywordList, checked, handleRemoveKeyword, handleToggleChecked, visibleKeywordList, isHover, setIsHover }) => {
    //マウスホバー時のulの表示切替
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
                    <ul className={classnames} onMouseEnter={visibleKeywordList ? null : handleMouseEnter} onMouseLeave={visibleKeywordList ? null : handleMouseLeave}>
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
                                    <label><input type="radio" name='genre' value='0' onChange={handleToggleChecked} checked={checked === '0'} />全て</label>
                                </div>
                                <div>
                                    <label><input type="radio" name='genre' value='9' onChange={handleToggleChecked} checked={checked === '9'} />コミック</label>
                                </div>
                                <div>
                                    <label><input type="radio" name='genre' value='1' onChange={handleToggleChecked} checked={checked === '1'} />単行本</label>
                                </div>
                                <div>
                                    <label><input type="radio" name='genre' value='2' onChange={handleToggleChecked} checked={checked === '2'} />文庫</label>
                                </div>
                                <div>
                                    <label><input type="radio" name='genre' value='3' onChange={handleToggleChecked} checked={checked === '3'} />新書</label>
                                </div>
                                <div>
                                    <label><input type="radio" name='genre' value='4' onChange={handleToggleChecked} checked={checked === '4'} />全集・双書</label>
                                </div>
                                <div>
                                    <label><input type="radio" name='genre' value='5' onChange={handleToggleChecked} checked={checked === '5'} />事・辞典</label>
                                </div>
                                <div>
                                    <label><input type="radio" name='genre' value='6' onChange={handleToggleChecked} checked={checked === '6'} />図鑑</label>
                                </div>
                                <div>
                                    <label><input type="radio" name='genre' value='7' onChange={handleToggleChecked} checked={checked === '7'} />絵本</label>
                                </div>
                                <div>
                                    <label><input type="radio" name='genre' value='8' onChange={handleToggleChecked} checked={checked === '8'} />カセット、CDなど</label>
                                </div>
                                <div>
                                    <label><input type="radio" name='genre' value='10' onChange={handleToggleChecked} checked={checked === '10'} />ムック、その他</label>
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