import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchInput from './Search/SearchInput';
import SearchResults from './Search/SearchResults';

const App = () => {

    //States

    const [productList, setProductList] = useState();

    //

    const getProducts = async () => {

        try {

            const url = '/products.json';

            const response = await axios.get(url);

            console.log(response.data);

            setProductList(response.data);


        } catch (e) {

            console.log(e);

        }
    }

    getProducts();

    return (
        <main>
            <SearchInput />
            {productList ? <SearchResults products={productList}/> : null}
        </main>
    );
}

export default App;