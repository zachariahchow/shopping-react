import React from 'react';

const Cart = ({ products, clickHandler }) => {

    const cartItems = products.map(prod => {
        return (
            <div className="cart-product__container">
                <div className="product-image__container">
                    <img src={prod.image_url} alt="" className="product-image"/>
                </div>
                <h3 className="product-name">Item: {prod.name}</h3>
                <h3 className="product-price">Price: {prod.price}</h3>
                <h4 className="product-description">Description: {prod.description}</h4>
                <button className="product-delete-cart__btn" data-product-id={prod.id} onClick={clickHandler}>Remove from Cart</button>
            </div>
        )
    })

    return (
        <div className="cart__container">
            <h2 className="cart__header">Cart</h2>
            {cartItems}
        </div>
    );
}

export default Cart;