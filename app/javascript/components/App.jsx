import React, { useState } from 'react';
import SearchInput from './Search/SearchInput';
import SearchResults from './Search/SearchResults';

const App = () => {
    return (
        <main>
            <SearchInput />
            <SearchResults />
        </main>
    );
}

export default App;