import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import '../styles/login.css';
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify';




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
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function Logout() {

    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);


    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div id='banner3'>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper} id="logout">
                    {/* <h2>LogOut</h2> */}
                    <button class='btn btn-primary' onClick={() => { localStorage.removeItem('token'); toast.warn('logged out'); window.location = '/' }}>Logout</button>
                </div>
            </Modal>
        </div>
    )
}

export default Logout
