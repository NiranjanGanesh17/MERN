import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import '../styles/model.css'

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 300,
        // height: 500,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


function Model({ handleData, setServings, setDiet, setTime, open, handleClose }) {


    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);



    return (

        <div id=''>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper} id="filtermodel">


                    <form id="options2" onSubmit={handleData}  >
                        <div id="hiddendropdown">
                            {/* <label id='lbl' for="">servings</label> */}
                            <select name="servings" class="btn btn-default dropdown-toggle" id="hiddenServings" onChange={(e) => setServings(e.target.value)} >
                                <option active>Servings</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>
                        </div>
                        <div id="hiddendropdown">
                            {/* <label id='lbl' for="">Diet</label> */}
                            <select name="diet" aria-expanded="true" class="btn btn-default dropdown-toggle" id="hiddenDiet" onChange={(e) => setDiet(e.target.value)}>
                                <option active>Diet</option>
                                <option value="Vegetarian"> Vegetarian</option>
                                <option value="High Protein Non Vegetarian">High Protein Non Vegetarian</option>
                                <option value="Diabetic Friendly">diabetic-friendly</option>
                            </select>
                        </div>
                        <div id="hiddendropdown">
                            {/* <label id='lbl' for="">preparation time</label> */}
                            <select name="time" class="btn btn-default dropdown-toggle" id="hiddenTime" onChange={(e) => setTime(e.target.value)}>
                                <option active>Time</option>
                                <option value="20-30">20-30 MINS</option>
                                <option value="30-40">30-40 MINS</option>
                                <option value="more than one hour">more than one hour</option>
                            </select>
                        </div>
                        <button class="btn btn-primary" id='submit' type="submit" >Submit</button>
                    </form>
                </div>
            </Modal>
        </div>

    )
}

export default Model
