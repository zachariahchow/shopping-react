import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchInput from './Search/SearchInput';
import SearchResults from './Search/SearchResults';
import Cart from './Cart/Cart';

const App = () => {

    //States

    const [productList, setProductList] = useState();
    const [searchedProducts, setSearchedProducts] = useState([]);
    const [searchInputValue, setSearchInputValue] = useState(null);
    const [cartItems, setCartItems] = useState([]);

    //

    const getProducts = async () => {

        try {

            const url = '/products.json';
            const response = await axios.get(url);
            setProductList(response.data);

        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    //

    const searchInputChangeHandler = (ev) => {
        setSearchInputValue(ev.target.value);
    }

    const submitBtnClickHandler = (ev) => {

        const filteredProducts = productList
            .filter(product => {
                return product.name.toLowerCase().includes(searchInputValue.toLowerCase());
            });

        if (filteredProducts.length > 0)
            setSearchedProducts(filteredProducts);
    }

    useEffect(() => {
        setProductList(searchedProducts);
        console.log(searchedProducts);
    }, [searchedProducts]);

    //

    const addToCartClickHandler = (ev) => {
        // const productId = ev.target.dataset.productId;
        const addedProduct = productList
            .find(prod =>
                prod.id == ev.target.dataset.productId
            );

        console.log(addedProduct);

        if (!cartItems.find(prod => prod.id == addedProduct.id)) {
            setCartItems(cartItems.concat(addedProduct));
        }
    }

    useEffect(() => {
        console.log(cartItems);
    }, [cartItems]);

    return (
        <main>
            <SearchInput changeHandler={searchInputChangeHandler} clickHandler={submitBtnClickHandler}/>
            <Cart products={cartItems}/>
            {productList ? <SearchResults products={productList} clickHandler={addToCartClickHandler}/> : null}
        </main>
    );
}

export default App;