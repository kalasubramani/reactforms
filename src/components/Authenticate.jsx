import { useEffect, useState } from "react";
import './authenticate.css'

function Authenticate({authToken}){
  //setup useState hooks to track form data
  const [errorMessage,setErrorMessage]=useState(null);
  const [successMessage,setsuccessMessage]=useState(null);
  const [uname,setUname]=useState(null);
  const[iat,setIat]=useState("");

  useEffect(()=>{
      if(authToken){
        setErrorMessage("");
      }

  }, [authToken])

//handles authentication for the form
 async function handleAuthentication(){
    
    try{
      if(!authToken){
          //window.alert("You must complete signup form to generate event token.")
          setErrorMessage("You must complete signup form to generate event token.")
          return;
      }
     
      //make api call with auth token
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const data = await response.json();
      // get successMessage,username,iat from response and update it to userstate
      setsuccessMessage(data.message);
      setUname(data.data.username);
      setIat(data.data.iat);    
  }catch(error){
   setErrorMessage(error.message);
  }
 }//async
 return(
  <div className="authenticate">
    <h3>Authenticate form</h3>
    {/* if there is an errormessage, display it */}
    {errorMessage && 
    <p className="error"> An error occured.{errorMessage}</p>
    }
    {/* display success message */}
    {successMessage&&<p className="success">{successMessage} {uname} your event token is {iat}</p>}
    <button className="button" onClick={handleAuthentication}>Get event token !</button>
  </div>
 )
}//fn

export default Authenticate;