import React from 'react';
import '../styles/about.css';
import abtpg1 from '../images/abtpg1.jpg';
import { motion } from 'framer-motion';
import { pageVariants } from './Home';

function About() {
    return (
        <motion.div exit='out' animate='in' initial='out' variants={pageVariants}>
            <div id='bannerabt'>
                <img id='bnr' src={abtpg1} alt="" />
            </div>
            <div id='filter'><h4>ABOUT US</h4></div>
            <div id="abt">
                <h3>
                    WELCOME TO NOT WITHOUT SALT.</h3>
                <p id='abtme'>
                    I happily share my passion for all things salted; sweet and savory, in hope that you too will find pleasure, joy and sustenance in good food. Your kitchen is a place to be creative and productive. Meals are meant to be savored and enjoyed. Good food is simple, fresh, seasonal and delicious. Not Without Salt is a tool for helping you eat well and enjoy the process of cooking and baking real, good food.

                    Thank you for visiting. It is my joy to teach, share and cook with you.

                    This blog is ever changing, evolving and growing but the one thing that remains constant is how happy it makes me to read comments and emails from you, the reader. What started out as a place to share my constant cravings for good food has now turned into a community.
                </p>
            </div>

        </motion.div>
    )
}

export default About
