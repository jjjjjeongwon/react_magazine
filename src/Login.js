import React from 'react'
import {auth, db} from "./shared/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import {getDocs, where, query, collection} from "firebase/firestore";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import { useEffect } from 'react';



const Login = () => {
    const id_ref =React.useRef(null);
    const pw_ref = React.useRef(null);
    const navigate = useNavigate();
    const loginFB =async() =>{
        console.log(id_ref.current.value, pw_ref.current.value);
        if(id_ref.current.value === "" || pw_ref.current.value ===""){
          alert("아이디, 비밀번호를 입력해주세요!");
        }else{
          try{
            const user = await signInWithEmailAndPassword(auth,
              id_ref.current.value, 
              pw_ref.current.value
              );
              console.log(user.user.email);
             
  
              
                alert("로그인 완료!");
                navigate("/");
                // window.location.replace("/");
          }catch(e){
            alert("로그인 정보를 확인해주세요!")
          }
          
        };

        
            //  navigate("/");
            //  alert("로그인 완료!");
            // console.log(id_ref.current.value);
            

             
               
    }

    // const navigator =useNavigate();
    // useEffect(()=> {
    //   if(is_login){
    //     navigator("/")
    //   }
    // })
    



  return (
    
    <Wrap>
      <h3>로그인</h3><br/>
        아이디(이메일)<br/> <Id type="text" ref={id_ref}  /> <br/> 

        비밀번호 <br/>
         <Id ref={pw_ref} type="password"/> <br/><br/>
        <button onClick={loginFB} >로그인</button>
    </Wrap>
    
  )
}

const Wrap = styled.div`
    
    width: 60%;
    height : 100%;
    margin: 0px auto;
    border : 1.5px solid lightslategray;
    border-radius: 3px;
    padding-top: 20px;
    padding-bottom: 5%;
    background-color: whitesmoke;

`;

const Text = styled.div`
  text-align : left;
`;



const Id =styled.input`
    height: 30px;
    width : 70%;
    margin-bottom: 15px;
    padding: 5px 5px;
    border-radius: 3px;
    border-bottom: 2px solid rgb(219, 232, 216);
    border : 1.5px solid lightslategray;
    font-size: 12px;
    font-weight: 500;
    
`;


export default Login;