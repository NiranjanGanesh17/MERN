import React from 'react';
import logo from '../images/logo.png';
import '../styles/navigation.css';
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import login from './login'


function Navigation() {


    const [{ session }, dispatch] = useStateValue();


    return (
        <nav id='navigation'>


            <div id="subdiv1" className="col-lg-3 col-md-12  col-sm-6 col-xs-6" >
                <Link id='btn' to='/recipes'>RECIPES</Link>
                <Link id='btn' to='/home'>HOME</Link>
            </div>
            <img id='logo' src={logo} alt="" />
            <div id="subdiv2" className="col-lg-3 col-md-12 col-sm-6 col-xs-6">
                {/* <Link id='btn' to='/login'>{session ? 'LOGOUT' : 'LOGIN'}</Link> */}
                {session ? <Link id='btn' to='/logout'>LOGOUT</Link> : <Link id='btn' to='/login'>SIGN IN</Link>}
                <Link id='btn' to='/about'>ABOUT</Link>
            </div>


        </nav>
    )
}

export default Navigation
