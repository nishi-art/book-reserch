import React from 'react'

const BookList = ({ data }) => {
    console.log(data);
    
    return (
        <>
            <div className='book-list'>
                {data.Items.map((element) => 
                    <div className='book-info' key={element.Item.isbn}>
                        <img className='book-img' src={element.Item.largeImageUrl} alt="" />
                    </div>
                )}
            </div>
        </>
  )
}

export default BookList