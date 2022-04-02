import React,{ useContext } from 'react';
import { Link } from 'react-router-dom';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import useUser from '../../hook/useUser';
import { CartContext } from "../../context/cart";

import './header.css';
import CustomizedBadges from '../badge';



const Header = () => {
    const [thisUser, isAdmin] = useUser()
    const { cart, total, } = useContext(CartContext);
    const badgeContent = cart.length ? cart.length : 0;
    return (
        <header className="main-head">
            <nav>
                
                <ul>
                   <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/dishes">Dishes</Link>
                    </li>
                    <li style={{backgroundColor:"lightblue"}}>
                        <Link to="/cart"> <CustomizedBadges badgeContent={badgeContent}/></Link>
                    </li>
                    {!thisUser&&!isAdmin&&<li>
                        <Link to="/login">Login</Link>
                    </li>}
                     {isAdmin && <li>
                        <Link to="/admin">For Admin</Link>
                    </li>}
                    <li>
                    {thisUser && <li><AmplifySignOut /></li>}
                    </li>
                </ul>
                <h6 className="logger">{thisUser && `Welcome ${thisUser && isAdmin ? `admin: ${thisUser}`:thisUser}`}</h6>
            </nav>
            
        </header>
    )
}

export default Header
