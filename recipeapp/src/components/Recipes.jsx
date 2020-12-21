import React from 'react';
import '../styles/recipes.css';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Paginate from './Paginate';
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import Chart from '../components/Chart';
import banner3 from '../images/banner3.jpg'
import Model from './Model';
import { motion } from 'framer-motion';
import { pageVariants } from './Home';






function Recipes() {

    const [{ session }, dispatch] = useStateValue();


    const [diet, setDiet] = useState('High Protein Non Vegetarian');
    const [servings, setServings] = useState(4);
    const [time, setTime] = useState('30-40');
    const [willfetch, setWillFetch] = useState(false);
    const [data, setData] = useState([]);
    const [currentPage, setcurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(6);
    const [photos, setPhotos] = useState([]);
    const [show, setShow] = useState(false)
    const [open, setOpen] = useState(false);






    useEffect(() => {
        const info = async () => {

            let d = await axios.post(`/recipes?${diet}&${servings}&${time}`);
            setData(d.data)
        }


        info()
    }, [willfetch])

    const handleClose = () => {
        setOpen(!open);
    };

    var handleData = (e) => {
        e.preventDefault()
        setWillFetch(!willfetch)
    }

    //get posts
    const last = currentPage * postsPerPage;
    const first = last - postsPerPage;
    const i = data.slice(first, last)

    //paginator
    let paginator = (num) => setcurrentPage(num);

    return (
        <motion.div exit='out' animate='in' initial='out' variants={pageVariants}>
            <div id='banner1'>
                <img id='bnr' src={banner3} alt="" />
            </div>
            <div id='filter1'>
                <select onClick={handleClose} id='hiddenbtn' name='Filter Recipes' class="btn btn-default dropdown-toggle"> <option id='hiddenoption' active>Filter Recipes</option></select>
                <Model handleData={handleData} handleClose={handleClose} setServings={setServings} setDiet={setDiet} setTime={setTime} open={open} />
                <form id="options1" onSubmit={handleData}  >
                    <div id="dropdown">

                        <select name="servings" class="btn btn-default dropdown-toggle" id="Servings" onChange={(e) => setServings(e.target.value)} >
                            <option active>Servings</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                    </div>
                    <div id="dropdown">

                        <select name="diet" aria-expanded="true" class="btn btn-default dropdown-toggle" id="Diet" onChange={(e) => setDiet(e.target.value)}>
                            <option active>Diet</option>
                            <option value="Vegetarian"> Vegetarian</option>
                            <option value="High Protein Non Vegetarian">High Protein Non Vegetarian</option>
                            <option value="Diabetic Friendly">diabetic-friendly</option>
                        </select>
                    </div>
                    <div id="dropdown">

                        <select name="time" class="btn btn-default dropdown-toggle" id="Time" onChange={(e) => setTime(e.target.value)}>
                            <option active>Time</option>
                            <option value="20-30">20-30 MINS</option>
                            <option value="30-40">30-40 MINS</option>
                            <option value="more than one hour">more than one hour</option>
                        </select>
                    </div>
                    <button class="btn btn-primary" id='submit' type="submit">Submit</button>
                </form>
            </div>


            <div id='display1'>


                {i.map((d) => {
                    return <Link id="link" class="col-lg-4 col-md-6  col-sm-6 col-xs-6" to='/content'>
                        <div id="card" onClick={() => dispatch({ type: 'send', value: d })} onMouseOver={() => { setShow(true) }} onMouseOut={() => { setShow(false) }}>


                            {show ? <React.Fragment><Chart PrepTime={d.PrepTimeInMins} CookTime={d.CookTimeInMins} show={show} />
                                <img src={d.image} id="foodimg" alt="image" /></React.Fragment> : <img src={d.image} id="foodimg" alt="image" />}


                            <h5 key={d._id}>{d.RecipeName}</h5>
                        </div></Link>
                })}
            </div>
            <div id="footer"><Paginate postsPerPage={postsPerPage} totalPosts={data.length} paginator={paginator} /></div>

        </motion.div >
    )
}

export default Recipes
