import React from 'react'
import Phone from './Phone/Phone'

const phones = (props) => props.phones.map((phone) => {
  console.log(phone.img_url)
  return <Phone
    name={phone.name}
    img={phone.img_url}
    price={phone.price}
    stock={phone.stock}
    key={phone.id} />
})

export default phones
