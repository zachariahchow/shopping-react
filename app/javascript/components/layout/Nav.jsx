import React from 'react';

const Nav = () => {
    return (
        <nav>
            <li className="navlink cart__link"><a href="/cart">Cart</a></li>
            <li className="navlink products__link"><a href="/products">Products</a></li>
        </nav>
    );
}

export default Nav;