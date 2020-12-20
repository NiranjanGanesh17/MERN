import React from 'react';
import '../styles/hero.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider';


function Home() {

    const [{ recipe }, dispatch] = useStateValue();
    const [data, setData] = useState([]);


    useEffect(() => {

        const data = async () => await axios.get('/home').then((d) => { setData(d.data) })
        data();

    }, [recipe])

    return (
        <div >
            <div id='banner'></div>
            <div id='filter'><h4>MOST LIKED RECIPES</h4></div>

            <div id='display'>
                {data.map((item) => {
                    return <Link id="link" class="col-lg-4 col-md-6  col-sm-6 col-xs-6" to='/content'>
                        <div id="card" onClick={() => dispatch({ type: 'send', value: item })}>
                            <img src={item.image} id="food" alt="image" />
                            <h5 key={item._id}>{item.RecipeName}</h5>
                        </div></Link>
                })}

            </div>

        </div>


    )
}

export default Home
