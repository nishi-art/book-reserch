import React from 'react'

const Menulist = ({ reserch }) => {
    return (
        <>
            <ul className='menulist'>
                <li onClick={reserch}>書籍を探す</li>
                <li>お気に入り</li>
            </ul>
            <hr/>
        </>
    )
}

export default Menulist