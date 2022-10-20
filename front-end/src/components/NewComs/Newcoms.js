import React, {useState,useEffect} from "react";
import {useHistory} from "react-router-dom";

import {v4 as uuid} from "uuid";


import axios from "axios";

import "./NewComs.css"

const NewComs = () => {
  const [inputValue, setInputValue] = useState("");

  const [imageAdded, setImageAdded] = useState(false);
  const [imageName, setImageName] = useState("");
  const [UserI, setUser] = useState("");
  const [Coms, setComs] = useState([]);
  const [Id, setId] = useState();
  const [userId, setUserId] = useState("");
  const[pseudos,setpseudos] = useState("")


   useEffect(() => {

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem(`access_token`)}`
  }, []);


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
      const user_id = uuid();
      if (user_id) setUserId(user_id);
    }
  }, [setInputValue]);

  useEffect(() => {
    const pseudoname = JSON.parse(localStorage.getItem("pseudo"));
    if(pseudoname){
      setpseudos(pseudoname)
    }

  },[])









  const inputHandler = (e) => {
    setInputValue(e.target.value);
  };

  const submitHandler = async (e) => {
     e.preventDefault(); 

    const post = new FormData();

    post.append("message", inputValue);
    post.append("post_image", document.getElementById("post_image").files[0]);
    post.append("user_id", UserI);
    post.append("_id", userId);
    post.append("pseudo", pseudos)

    // Requête POST axios
    await axios.post("http://localhost:4200/com/COMS", post);

    // this code is just for MVP, it will be upgrade in final version
      document.location.reload(); 
  };

  const imageAddedToPost = (e) => {
    setImageName(e.target.value.slice(12));
    setImageAdded(true);
  };

  const history = useHistory();

  const [deco, setdeco] = useState();

  useEffect(() => {
    const Mod = async () => {
      localStorage.clear();
      sessionStorage.clear();
      const toRedirect = (link) => {
        history.push(link);
      };
      toRedirect("/");
    };
    if (deco !== undefined) Mod();
  }, [deco]);




  return (
    <form
      onSubmit={submitHandler}
      method="POST"
      action="/api/post"
      encType="multipart/form-data"
    >
      <button id="btndeco" onClick={setdeco}>déconnexion</button>
      <div style={{background:"#FFD7D7",border:"1px solid",margin:"auto",boxShadow: "1px 1px 10px black", textAlign:"center"}}>
      <textarea
        className="testt"
        type="text"
        value={inputValue}
        onChange={inputHandler}
        required
      />
      <div className="icons_container">
        <input
          type="file"
          name="post_image"
          id="post_image"
          className="icons_container__add_file"
          onInput={imageAddedToPost}
        />
        <div className="image_name">{imageName}</div>
        <label htmlFor="post_image"></label>
        <button type="submit" className="icons_container__submit">envoyer</button>
        </div>
        </div>
    </form>
  );
};

export default NewComs;
