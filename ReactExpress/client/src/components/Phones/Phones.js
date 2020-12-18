import React, {useContext} from 'react'
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

    const changeBasket = contextValue.state.changeBasket
    let items = contextValue.state.items
    const item = items.find(x => x.id === id)
    if (item) {
      const quantity = item.quantity
      items = items.filter(x => x.id !== id)
      items.push({ name, id, quantity: quantity + 1, price, img })
    } else {
      items.push({ name, id, quantity: 1, price, img })
    }
    const setBasket = contextValue.state.setItems
    changeBasket(items.length)
    setBasket(items)
  }


  const allPhones = props.phones
  const selectedPhones = allPhones.filter((x, i) => i >= props.startIndex && i <= props.stopIndex)
  console.log(props.startIndex)
  console.log(props.stopIndex)
  console.log(selectedPhones)

  return (
    selectedPhones.map((phone) => {
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
