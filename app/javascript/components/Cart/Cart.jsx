import React from 'react';
import ShopContext from '../../context/shop-context';

const Cart = ({ products }) => {

    let cartItems;

    if (products) {
        cartItems = products.map(prod => {

            return (
                <ShopContext.Consumer>
                    {context =>
                <div className="cart-product__container">
                    <div className="product-image__container">
                        <img src={prod.image_url} alt="" className="product-image"/>
                    </div>
                    <h3 className="product-name">Item: {prod.name}</h3>
                    <h3 className="product-price">Price: {prod.price}</h3>
                    <h4 className="product-description">Description: {prod.description}</h4>
                    <button className="product-delete-cart__btn" data-product-id={prod.id} onClick={context.removeFromCartClickHandler}>Remove from Cart</button>
                </div>
                }
            </ShopContext.Consumer>
            )
        })

    } else {
        cartItems = null;
    }

    const subtotal = products.reduce((acc, prod) => {
        return acc + prod.price;
    }, 0)

    const gst = (subtotal * 1.07);

    const total = subtotal + gst + 7

    return (
        <div className="cart__container">
            <h2 className="cart__header">Cart</h2>
            <h4 className="cart__subtotal">Subtotal: ${subtotal.toFixed(2)}</h4>
            <h4 className="cart__gst">GST(7%): ${gst.toFixed(2)}</h4>
            <h4 className="cart__total">Total: ${cartItems.length ? `${total.toFixed(2)} (incl. $7 shipping fee)` : 0}</h4>
            {cartItems}
        </div>
    );
}

export default Cart;