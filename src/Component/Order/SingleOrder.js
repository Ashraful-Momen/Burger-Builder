import React from 'react'

const SingleOrder = (props) => {
    // console.log(props);
    const ingredientSummary = props.order.ingredients.map(item=>{
        return(
                <span style={{
                    border: "1px solid grey",
                    boxShadow: "1px 1px #888888",
                    borderRadius: "5px",
                    padding: "5px",
                    marginRight:"5px"
                  }} key={item.type}>{item.amount}X<span style={{textTransform:"capitalize"}}>{item.type}</span></span>
            
        )
    })
  return (
    <div style={{
        border: "1px solid grey",
        boxShadow: "1px 1px #888888",
        borderRadius: "5px",
        padding: "20px",
        margin:"10px"
      }}>
        <p>Order Number: {props.order.id}</p>
        <p>Order Address: {props.order.customer.deliveryAddress}</p>
        <hr/>
        {ingredientSummary}
        <hr/>

        <p>Price: {props.order.price} BDT</p>

    </div>
  )
}

export default SingleOrder