import React, {useState, useEffect} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import "./EditComs.css"






const EditComs = () => {

    const history = useHistory();


    const [UserOneID, setUserOneID] = useState(0);
    const[Data, setData] = useState([])
    const[Coms, setComs] = useState("")
    const[ImgUrl, setImgUrl] = useState("")
    const[User, setUser] = useState("")
    const[vide, setvide] = useState("")
    const[Like, setLike] = useState(0)
    const[userLike, setuserLike] = useState([])

    useEffect(() => {

            const Mode = JSON.parse(sessionStorage.getItem("Mode"))

            setUserOneID(Mode);

            const UserId = JSON.parse(localStorage.getItem("user"))
            setUser(UserId)




      }, []);

      console.log(UserOneID)

      useEffect(() => {
        const fetchData = async () => {
          const result = await axios(`http://localhost:4200/com/${UserOneID}`);
    
          console.log(result);
          setData(result.data)
          setComs(result.data.coms)
          setImgUrl(result.data.imageUrl)
          setLike(result.data.likes)
          setuserLike(result.data.usersLiked)
    
        };
        if (UserOneID !== 0)fetchData();
      }, [UserOneID]);

      const inputHandler = (e) => {
        setComs(e.target.value);
      };

      console.log(Coms)
      console.log(ImgUrl)

      const imageAddedToPost = (e) => {
        setImgUrl(e.target.value.slice(12));

      };

      const DeleteImg = () => {
        setImgUrl("");
        console.log('lol')

      };

      const submitHandler = async (e) => {
        e.preventDefault(); 
   
       const post = new FormData();
   
       post.append("coms", Coms);
       post.append("imageUrl", ImgUrl);  
       post.append("post_image", document.getElementById("post_image").files[0]);

   
       // Requête POST axios
       await axios.put(`http://localhost:4200/com/P/${UserOneID}`, post);
   


       const toRedirect = (link) => {
        history.push(link);
      };
      toRedirect("/contact");

     };

     const submi = async (e) => {
        e.preventDefault(); 
   
       const postID = new FormData();
   

        postID.append("coms", Coms);
        postID.append("post_image", document.getElementById("post_image").files[0]);
        postID.append("imageUrl", "");  





        await axios.put(`http://localhost:4200/com/P/${UserOneID}`, postID);
       

 
        const toRedirect = (link) => {
         history.push(link);
       };
       toRedirect("/contact");

 
     };




      if(ImgUrl){
        return(
            <form
      onSubmit={submitHandler}
      method="PUT"
      encType="multipart/form-data"
    >

            <div id="grobedit">
                <div id="edit">
            <h1>{Data.coms}</h1>
            <textarea
        className="testt"
        type="text"
        value={Coms}
        onChange={inputHandler}
      />
       <input
          type="file"
          name="post_image"
          id="post_image"
          onInput={imageAddedToPost}
          className="icons_container__add_file"
        /> 
      <img src={ImgUrl} alt="" style={{display: "flex", maxHeight: "200px" ,margin: "auto",width:"50%"}}/>
      <button
      onClick={DeleteImg}
      >supprimer image</button>
      <button type="submit">envoyer</button>
      </div>

            </div>
            </form>
            
        )}

    else{
    



    return(
        <form
        onSubmit={submi}
        method="PUT"
        encType="multipart/form-data"


      >

        <div id="grobedits">
            <div id="edits">
            <h1>{Data.coms}</h1>
            <textarea
        className="testt"
        type="text"
        value={Coms}
        onChange={inputHandler}
      />
        <input
          type="file"
          name="post_image"
          id="post_image"
          onInput={imageAddedToPost}
          className="icons_container__add_file"
        />
        <button type="submit">envoyer</button>
        </div>
            </div>
            </form>

    )
    }

}
export default EditComs;