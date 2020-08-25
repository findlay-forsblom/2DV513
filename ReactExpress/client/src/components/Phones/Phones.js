import React from 'react'
import Phone from './Phone/Phone'

const phones = (props) => props.phones.map((phone) => {
  return <Phone
    name={phone.name}
    img={phone.img_url}
    price={phone.price}
    stock={phone.stock}
    rating={phone.rating}
    key={phone.id_products}
    link={`/comments/${phone.id_products}`}/>
})

export default phones
