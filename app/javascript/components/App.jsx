import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchInput from './Search/SearchInput';
import SearchResults from './Search/SearchResults';

const App = () => {

    //States

    const [productList, setProductList] = useState();

    const [searchedProducts, setSearchedProducts] = useState([]);

    const [searchInputValue, setSearchInputValue] = useState(null);
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
        console.log(searchInputValue);
    }

    const submitBtnClickHandler = (ev) => {

        const filteredProducts = productList
            .filter(product => {
                console.log(product.name.toLowerCase());
                console.log(searchInputValue);
                return product.name.toLowerCase().includes(searchInputValue.toLowerCase());
            });

        console.log(filteredProducts);

        if (filteredProducts.length > 0)
            setSearchedProducts(filteredProducts);
    }

    useEffect(() => {
        setProductList(searchedProducts);
        console.log(searchedProducts);
    }, [searchedProducts]);

    return (
        <main>
            <SearchInput changeHandler={searchInputChangeHandler} clickHandler={submitBtnClickHandler}/>
            {productList ? <SearchResults products={productList}/> : null}
        </main>
    );
}

export default App;