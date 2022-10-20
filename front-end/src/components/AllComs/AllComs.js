import React, {useState, useEffect} from "react";
import {v4 as uuid} from "uuid";
import {useHistory} from "react-router-dom";

import axios from "axios";

import './AllComs.css'


const AllComs = () => {
  const [inputValue, setInputValue] = useState("");

  const [imageAdded, setImageAdded] = useState(false);
  const [imageName, setImageName] = useState("");
  const [userId, setUserId] = useState("");
  const [UserI, setUser] = useState("");
  const [Coms, setComs] = useState([]);
  const [Id, setId] = useState();
  const [imgSrc, setImgSrc] = useState("");
  const [modify, setModify] = useState()
  const [Like, setLike] = useState()
  const [togle, settogle] = useState()
  const[suprime, setsuprime] = useState()
  const[deleteme, setdeleteme] = useState()

  const history = useHistory();



  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
      const user_id = uuid();
      if (user_id) setUserId(user_id);
    }
  }, [Coms]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:4200/com/REC");

      console.log(result);
      setComs(result.data);

      /*       setUserID(JSON.parse(localStorage.getItem("user"))); */
    };
    fetchData();
  }, [togle,deleteme]);

  useEffect(() => {
    const DeleteId = async () => {
    const deletemes =  await axios.delete(`http://localhost:4200/com/D/${Id.target.value}`);

    setdeleteme(deletemes)

    }
    if (Id !== undefined) DeleteId()
  }, [Id]);

  useEffect(() => {

    const Mod = async () => {
    
    sessionStorage.Mode = JSON.stringify(modify.target.value);

        const toRedirect = (link) => {
          history.push(link);
        };
        toRedirect("/edit");
      
    }
    if (modify !== undefined) Mod();

  }, [modify]);


  const inputHandler = (e) => {
    setInputValue(e.target.value);
  };

  const reverse = [...Coms].reverse();


  useEffect(() => {
    const Likes = async () => {
        const lik = await axios.post(`http://localhost:4200/com/${Like.target.value}/like`,{
        like: 1,
        userId: UserI,
      });

      settogle(lik)
    }
    


    if (Like !== undefined) Likes(); 
  }, [Like]);




  



  return (
    
      <div>
        <div>
          {reverse.map((item) => {

if(UserI === item.userId || UserI === "63500a67947b224b9a826dd3"){ return(


            <div key={item._id} style={{display: "flex" ,margin: "auto",width: "98%",border: "1px solid black",marginBottom: "18px",flexDirection: "column", background: "#FFD7D7",borderRadius:"30px",boxShadow:"1px 1px 10px black"}}>
             {/* <div key={item._id}> */}
             <h3 style={{textAlign: "center"}}>{item.pseudo}</h3>
              <h2 style={{textAlign: "center"}}>{item.coms}</h2>
              <img src={item.imageUrl} alt="" style={{display: "flex", width: "80%" ,margin: "auto",maxWidth:"700px",maxHeight:"700px"}} />

<div style={{margin:"auto"}}>
              <p style={{color:"#FD2D01",textAlign:"center",fontSize:"20px",fontFamily:"latobold"}}>like: {item.likes}</p>
              </div>

              <div id="icon-center">
              <button style={{width:"80px", height:"40px"}} onClick={setId} value={item._id}>
              
                Supprimer
              </button>

              <button style={{width:"80px"}} onClick={setModify} value={item._id}>
                Modifiez
              </button>
              <button style={{width:"80px"}} onClick={setLike} value={item._id}>Like</button>
              </div>
              
              

             {/*  </div>   */}           
        
         </div>
          )}
return (

    <div key={item._id} style={{display: "flex" ,margin: "auto",width: "98%",border: "1px solid black",marginBottom: "18px",flexDirection: "column", background: "#FFD7D7" ,borderRadius:"30px",boxShadow:"1px 1px 10px black"}}>
    {/* <div key={item._id}> */}
    <h3 style={{textAlign: "center"}}>{item.pseudo}</h3>
     <h2 style={{textAlign: "center"}}>{item.coms}</h2>
     <img src={item.imageUrl} alt="" style={{display: "flex", width: "80%" ,margin: "auto",maxWidth:"700px",maxHeight:"700px"}} />
     <div style={{margin:"auto"}}>
     <p style={{color:"#FD2D01",textAlign:"center",fontSize:"20px",fontFamily:"latobold"}}>like: {item.likes}</p>
     </div>
     <button style={{width:"83%", height:"40px",margin:"auto"}} onClick={setLike} value={item._id}>Like</button>
              

     

    

</div>
 )
 
})}
        </div>
      </div>
    
  );
};


export default AllComs;
