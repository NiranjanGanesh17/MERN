import React from 'react';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useStateValue } from '../StateProvider';
import Modal from '@material-ui/core/Modal';
import { makeStyles, InputBase } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core'
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




toast.configure()

function Login(props) {

    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    const [{ session }, dispatch] = useStateValue();
    const [auth, setAuth] = useState(false);
    const [detail, setDetail] = useState({ username: '', email: '', password: '' });
    const [open, setOpen] = useState(true);
    const [register, setRegister] = useState(false);



    const handleClose = () => {
        setOpen(true);
    };

    let userRegister = (e) => {
        e.preventDefault()
        if (detail.username && detail.password && detail.email) {
            axios.post(`/users/signup`, detail)
                .then((res) => {
                    if (res.data === 'User Exists') {
                        toast.error(res.data)
                    }
                    else {
                        localStorage.setItem('token', res.data.token); dispatch({ type: 'isloggedin', value: true })
                        props.history.push('/recipes'); toast.success('Registered')
                    }
                })
                .catch((err) => { console.log(err) })
        }
        else { toast.error('Make Sure All Fields Are Filled') }

    }

    var login = (e) => {
        e.preventDefault()

        if (detail.username && detail.password && detail.email) {
            console.log((detail))
            axios.post('/users/login', detail)
                .then((res) => {

                    localStorage.setItem('token', res.data.token); dispatch({ type: 'isloggedin', value: true });
                    toast.success('Successfully logged In')
                    props.history.push('/recipes')

                })
                .catch(err => { if (err.response.status !== 200) { toast.error('invalid user username or password') } })
        }
        else { toast.error('Make Sure All Fields Are Filled') }

    }

    return (
        <div id='banner3'>


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper}>




                    {register ? <React.Fragment> <h2 id="simple-modal-title">Create an account</h2> <span id="spaan"><p>Already have an account?</p> <a id="port" onClick={() => { setRegister(!register) }}>Login</a></span>  <form onSubmit={userRegister} >

                        <TextField id="standard-basic" label="email" type='email' fullWidth onChange={(e) => setDetail({ ...detail, email: e.target.value })} /><br />

                        <TextField id="standard-basic" label="username" fullWidth type='text' onChange={(e) => setDetail({ ...detail, username: e.target.value })} /><br />

                        <TextField id="standard-basic" label="password" fullWidth type='password' onChange={(e) => setDetail({ ...detail, password: e.target.value })} /> <br /><br />
                        <div id="btns">
                            <button class="btn btn-primary" id='submit' type='submit'>Register</button>

                            <button id='home' onClick={() => { props.history.push('/home') }} class='btn btn-primary'>Home</button>
                        </div>
                    </form> </React.Fragment> : <React.Fragment><h2 id="simple-modal-title">Login</h2>  <span id="spaan"><p>New User?</p><a id="port" onClick={() => { setRegister(!register) }}>Create an account</a></span>

                            <form onSubmit={login} >

                                <TextField id="standard-basic" label="email" type='email' fullWidth onChange={(e) => setDetail({ ...detail, email: e.target.value })} /><br />

                                <TextField id="standard-basic" label="username" fullWidth type='text' onChange={(e) => setDetail({ ...detail, username: e.target.value })} /><br />

                                <TextField id="standard-basic" label="password" fullWidth type='password' onChange={(e) => setDetail({ ...detail, password: e.target.value })} /> <br /><br />
                                <div id="btns">
                                    <button class="btn btn-primary" id='submit' type='submit'>Login</button>

                                    <button id='home' onClick={() => { props.history.push('/home') }} class='btn btn-primary'>Home</button>
                                </div>


                            </form></React.Fragment>}


                </div>

            </Modal>
        </div>



    )
}

export default Login
