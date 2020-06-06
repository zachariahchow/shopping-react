import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './layout/Header';
import Nav from './layout/Nav';
import SearchInput from './Search/SearchInput';
import SearchResults from './Search/SearchResults';
import Cart from './Cart/Cart';
import ShopContext from '../context/shop-context';

//Reducers

const cartReducer = (curCart, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return [...curCart, action.item];
        case 'REMOVE_FROM_CART':
            return curCart.filter(item => item.id !== action.itemId);
        case 'SET_CART':
            return [...curCart];
        default:
            throw new Error('Something went wrong with the Cart, bitch');
    }
}

const httpReducer = (httpState, action) => {
    switch (action.type) {
        case 'SEND':
            return { loading: true, error: null };
        case 'RESPONSE':
            return { ...httpState, loading: false };
        case 'ERROR':
            return { ...httpState, error: action.errorMessage };
        case 'CLEAR':
            return { ...httpState, error: null };
        default:
            throw new Error('Bad!');
    }
}

const App = () => {

    //States

    const [cartProducts, dispatchCart] = useReducer(cartReducer, []);
    const [httpState, dispatchHttp] = useReducer(httpReducer, {
        loading: false,
        error: null
    })
    const [productList, setProductList] = useState();
    const [searchedProducts, setSearchedProducts] = useState([]);
    const [searchInputValue, setSearchInputValue] = useState(null);
    // const [cartItems, setCartItems] = useState([]);

    //

    const getProducts = async () => {
        dispatchHttp({ type: 'SEND' });

        try {

            const url = '/products.json';
            const response = await axios.get(url);
            dispatchHttp({ type: 'RESPONSE' });
            setProductList(response.data);
            setSearchedProducts(response.data);

        } catch (e) {
            dispatchHttp({ type: 'ERROR', errorMessage: 'Some shit happened' });
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
                    !cartProducts.includes(product));
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

        if (!cartProducts.find(prod => prod.id == addedProduct.id)) {
            dispatchCart({ type: 'ADD_TO_CART', item: addedProduct });
            // setCartItems([...cartItems, addedProduct]);
        }

        const updatedSearchItems = searchedProducts
            .filter(prod => prod.id != addedProduct.id);

        setSearchedProducts(updatedSearchItems);
    }

    useEffect(() => {
        console.log(cartProducts);
    }, [cartProducts]);

    //

    const removeFromCartClickHandler = (ev) => {
        const removedProduct = cartProducts.find(prod => prod.id == ev.target.dataset.productId);
        console.log(removedProduct);

        // const updatedCartItems = cartItems
        //     .filter(item => item.id !== removedProduct.id);

        dispatchCart({ type: 'REMOVE_FROM_CART', itemId: removedProduct.id });
        dispatchCart({ type: 'SET_CART' });
        // setCartItems(updatedCartItems);

        searchedProducts.splice(removedProduct.id - 1, 0, removedProduct);

        setSearchedProducts(searchedProducts);
    }

    return (
        <main>
            <BrowserRouter >
                <Route path="/" component={Header}/>
                <Route path="/" component={Nav}/>
                <ShopContext.Provider
                    value={
                        {
                            changeHandler: searchInputChangeHandler,
                            submitBtnClickHandler: submitBtnClickHandler,
                            addToCartClickHandler: addToCartClickHandler,
                            removeFromCartClickHandler: removeFromCartClickHandler
                        }
                    }
                >
                    <SearchInput />
                    <Route path="/cart" exact render={() => <Cart products={cartProducts} clickHandler={removeFromCartClickHandler}/>} />
                    {productList && <Route path="/" exact render={() => <SearchResults products={searchedProducts} clickHandler={addToCartClickHandler}/>} />}
                </ShopContext.Provider>
            </BrowserRouter>
        </main>
    );
}

export default App;