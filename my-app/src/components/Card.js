import React from 'react';

const Card = (props) => {
  const { cardData } = props;
  return (
    <div className='card'>
      <img src={cardData.image} className='image' alt={cardData.value}/>
    </div>
  )
}

export default Card;