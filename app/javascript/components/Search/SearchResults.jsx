import React from 'react';
import ShopContext from '../../context/shop-context';

const SearchResults = ({ products }) => {

    const productEls = products.map(prod => {
        return (
            <ShopContext.Consumer>
                {context =>
                    <div className="product__container">
                        <div className="product-image__container">
                            <img src={prod.image_url} alt="" className="product-image"/>
                        </div>
                        <h3 className="product-name">Item: {prod.name}</h3>
                        <h3 className="product-price">Price: {prod.price}</h3>
                        <h4 className="product-description">Description: {prod.description}</h4>
                        <button className="product-add-cart__btn" data-product-id={prod.id} onClick={context.addToCartClickHandler}>Add to Cart</button>
                    </div>
                }
            </ShopContext.Consumer>
        )
    })
    return (
        <div className="search-results__container">
            {productEls}
        </div>
    );
}

export default SearchResults;