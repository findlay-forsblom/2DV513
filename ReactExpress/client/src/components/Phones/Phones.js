import React, { useContext } from 'react'
import Phone from './Phone/Phone'
import MyContext from '../../contexts/Mycontext'

const Phones = (props) => {
  const contextValue = useContext(MyContext)
  function handleBasket (id) {
    const phones = props.phones
    const phone = phones.find(x => x.id_products === id)
    const name = phone.name
    const price = phone.price
    const img = phone.img_url
    const stock = phone.stock

    const changeBasket = contextValue.state.changeBasket
    let items = contextValue.state.items
    const item = items.find(x => x.id === id)
    if (item) {
      const quantity = item.quantity
      items = items.filter(x => x.id !== id)
      items.push({ name, id, quantity: quantity + 1, price, img, stock })
    } else {
      items.push({ name, id, quantity: 1, price, img, stock })
    }
    const setBasket = contextValue.state.setItems
    let itemCounter = 0

    for (let i = 0; i < items.length; i++) {
      itemCounter += items[i].quantity
    }
    changeBasket(itemCounter)
    setBasket(items)
  }

  const allPhones = props.phones
  return (
    allPhones.map((phone) => {
      return <Phone
      name={phone.name}
      img={phone.img_url}
      price={phone.price}
      stock={phone.stock}
      rating={phone.rating}
      key={phone.id_products}
      handleClick={handleBasket.bind(this, phone.id_products)}
      link={`/comments/${phone.id_products}`}/>
    }
    )
  )
}

export default Phones
