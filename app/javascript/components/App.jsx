import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './layout/Header';
import Nav from './layout/Nav';
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
            setSearchedProducts(response.data);

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
                return (product.name.toLowerCase()
                    .includes(searchInputValue.toLowerCase()) &&
                    !cartItems.includes(product));
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
            setCartItems([...cartItems, addedProduct]);
        }

        const updatedSearchItems = searchedProducts
            .filter(prod => prod.id != addedProduct.id);

        setSearchedProducts(updatedSearchItems);
    }

    useEffect(() => {
        console.log(cartItems);
    }, [cartItems]);

    //

    const removeFromCartClickHandler = (ev) => {
        const removedProduct = cartItems.find(prod => prod.id == ev.target.dataset.productId);
        console.log(removedProduct);

        const updatedCartItems = cartItems
            .filter(item => item.id !== removedProduct.id);

        setCartItems(updatedCartItems);

        searchedProducts.splice(removedProduct.id - 1, 0, removedProduct);

        setSearchedProducts(searchedProducts);
    }

    return (
        <main>
            <BrowserRouter >
                <Route path="/" component={Header}/>
                <Route path="/" component={Nav}/>
                <SearchInput changeHandler={searchInputChangeHandler} clickHandler={submitBtnClickHandler}/>
                <Route path="/cart" exact render={() => <Cart products={cartItems} clickHandler={removeFromCartClickHandler}/>} />
                {productList ? <SearchResults products={searchedProducts} clickHandler={addToCartClickHandler}/> : null}
            </BrowserRouter>
        </main>
    );
}

export default App;