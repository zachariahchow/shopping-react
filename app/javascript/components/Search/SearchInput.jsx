import React from 'react';
import ShopContext from '../../context/shop-context';

const SearchInput = () => {
    return (
        <ShopContext.Consumer>
            {context =>
                <div className="search-input__container">
                    <input type="text" className="search-input" onChange={context.changeHandler}/>
                    <button className="search-submit__btn" onClick={context.submitBtnClickHandler}>Search</button>
                </div>
            }
        </ShopContext.Consumer>
    );
}

export default SearchInput;