import React from 'react';

const SearchResults = ({ products }) => {

    const productEls = products.map(prod => {
        return (
            <div className="product__container">
                <div className="product-image__container">
                    <img src={prod.url} alt="" className="product-image"/>
                </div>
                <h3 className="product-name">{prod.name}</h3>
                <h3 className="product-price">{prod.price}</h3>
                <h4 className="product-description">{prod.description}</h4>
            </div>
        )
    })
    return (
        <div className="search-results__container">
            {productEls}
        </div>
    );
}

export default SearchResults;