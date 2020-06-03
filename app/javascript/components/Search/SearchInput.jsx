import React from 'react';

const SearchInput = ({ changeHandler, clickHandler }) => {
    return (
        <div className="search-input__container">
            <input type="text" className="search-input" onChange={changeHandler}/>
            <button className="search-submit__btn" onClick={clickHandler}>Search</button>
        </div>
    );
}

export default SearchInput;