import React from 'react';
import { useContext, useEffect, useState } from 'react';
import "../styles/content.css";
import axios from 'axios';
import { useStateValue } from '../StateProvider';
import { TextField } from '@material-ui/core';
import { MdFavorite } from "react-icons/md";
import { AiFillSound } from "react-icons/ai";
import contentpg from '../images/contentpg.jpg';



function Content() {

    const [{ recipe, session }, dispatch] = useStateValue();

    const [remove, setRemove] = useState({ recipe_id: '', comment_id: '' })
    const [comment, setComment] = useState({ username: '', comment: '', id: '' });
    const [update, setUpdate] = useState({ comment: '', recipe_id: '', comment_id: '' })
    const [likebtn, setLikebtn] = useState(false);
    const [voices, setVoices] = useState([]);
    const [spk, setSpk] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    const [photos, setPhotos] = useState({
        first: 'https://images.pexels.com/photos/2072162/pexels-photo-2072162.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200'
        , second: 'https://images.pexels.com/photos/2072162/pexels-photo-2072162.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200'
    })


    useEffect(() => {
        const synth = window.speechSynthesis;
        let voice = []
        const getVoices = () => {
            voice = synth.getVoices();
            console.log(voice)
            setVoices(voice)

        }
        getVoices();
        if (synth.onvoiceschanged !== undefined) {
            synth.onvoiceschanged = getVoices;
        }

        imgs()
        console.log(photos.first)
        var spliting = () => {
            let splited = recipe.Ingredients.split(',');
            setIngredients(splited)
            setComment({ ...comment, id: recipe._id })
            setUpdate({ ...update, recipe_id: recipe._id })
            setRemove({ ...remove, recipe_id: recipe._id })
        }
        spliting()
    }, [recipe])

    const imgs = () => {
        fetch("https://api.pexels.com/v1/search?page=5&per_page=100&query=food", {
            headers: { Authorization: '563492ad6f91700001000001af9f952067c94c5bb4ac9f564a93213f' }
        })
            .then(response => response.json())
            .then((res) => {
                console.log(res)
                let r = (Math.floor(Math.random() * 50 + 1));
                let s = (Math.floor(Math.random() * 30 + 1)); let ar = [];
                ar.push(res.photos[r].src.landscape);
                ar.push(res.photos[s].src.landscape); setPhotos({ ...photos, first: ar[0], second: ar[1] })
            })
            .catch(err => console.log(err))
    }


    var createComment = (e) => {
        e.preventDefault()
        axios.post('/content', comment).then((res) => { dispatch({ type: 'send', value: res.data }) })
    }

    var postLike = () => {
        setLikebtn(true)
        axios.get(`/like?${recipe._id}`).then((res) => { dispatch({ type: 'send', value: res.data }) })
    }

    var updateComment = () => {
        axios.post('/content/update', update).then((res) => { dispatch({ type: 'send', value: res.data }) })
    }

    var removeComment = (e) => {
        console.log(e.target.value)
        setRemove({ ...remove, comment_id: e.target.value })
        axios.post('/content/delete', remove).then((res) => { dispatch({ type: 'send', value: res.data }) })

    }

    var speakIt = () => {

        const synth = window.speechSynthesis;
        setSpk(true)
        if (synth.speaking) {
            console.log('Already Speaking...')
        }
        const speakText = new SpeechSynthesisUtterance(recipe.Instructions)
        console.log(voices[0])
        speakText.voice = voices[0];
        synth.speak(speakText);

        speakText.onend = (e) => {
            setSpk(false)
            console.log('ended')
        }
        speakText.onerror = (e) => {
            console.log('something went wrong')
        }
    }

    return (

        <React.Fragment>

            <div >

                <div id='banner3'>
                    <img id="bnr" src={contentpg} alt="" />
                </div>
                <div id='filter'></div><br />
                <div id="heading">
                    <h2>{recipe.RecipeName}</h2>
                </div>
                <div id='display2'>


                    <div id="subheading">
                        <span id='CD'>  <h4>{recipe.Course}</h4>
                            <h4>{recipe.Diet}</h4></span>
                    </div><br />


                    <img src={photos.first} alt="img" /><br />
                    <span>
                        <h2>Ingredients</h2>
                    </span><br />
                    <div id='ingredients'>

                        {ingredients.map((i) => { return <li>{i}</li> })}

                    </div><br />

                    <img src={photos.second} alt="img" /><br />

                    <div id="instructions">
                        <span id='ins'>
                            <h2>Instructions</h2>  <button onClick={speakIt} disabled={spk} class='btn btn-primary'  ><AiFillSound /></button></span>
                        <p>{recipe.Instructions}</p>
                    </div>

                    <hr />
                    <span id="like"><button class={likebtn ? "btn btn-danger" : "btn btn-primary"} disabled={likebtn} onClick={postLike}>like   <MdFavorite /></button>

                    </span><br />

                    <form id="comment_form" onSubmit={createComment}>

                        <div id="addcomments">
                            <h4>Comments </h4>
                            <div id="innercomment">

                                <TextField id="standard-basic" label="enter your name" required type='text' onChange={(e) => setComment({ ...comment, username: e.target.value })} /><br />

                            </div>
                            <div id="innercomment">

                                <TextField id="standard-basic" label="enter your comment" required type='text' onChange={(e) => setComment({ ...comment, comment: e.target.value })} />

                            </div><br />

                            <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                    </form>

                    <div><br />
                        <h5>Comments Section</h5>
                        <div id='comments_section'>

                            {recipe.comments.map((one) => {

                                if ((one.user_name && one.comment_body) !== '') {
                                    return <div id='inner_comments_section' class="col-lg-3 col-md-6  col-sm-6 col-xs-6">
                                        <p key={one._id}>{one.user_name}</p>
                                        <p>{one.comment_body}</p>
                                        <TextField id="standard-basic" label="edit your comment" required type='text' onChange={(e) => { setUpdate({ ...update, comment: e.target.value, comment_id: one._id }) }} /><br />
                                        {/* <input type="text" name="edit" id="edit" required placeholder="edit your comment" onChange={(e) => { setUpdate({ ...update, comment: e.target.value, comment_id: one._id }) }} /><br /> */}
                                        <span id="btns"><button id="editbtn" class="btn btn-primary" onClick={updateComment}>Edit</button>
                                            <button id="remove" class="btn btn-danger" value={one._id} onClick={removeComment} >Delete</button></span>

                                    </div>
                                }


                            })}
                        </div>


                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Content
