import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <nav>
            <li className="navlink cart__link"><Link to="/cart">Cart</Link></li>
            <li className="navlink products__link"><Link to="/products">Products</Link></li>
        </nav>
    );
}

export default Nav;