import React from "react";
import {auth, db} from "./shared/firebase";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Signup =() => {

    const id_ref = React.useRef(null);
    const name_ref = React.useRef(null);
    const pw_ref =React.useRef(null);
    const navigate = useNavigate();

    const signupFB =async() =>{
        //값이 전부 말짱하다는 것을 확인하고 아래 실행(3-10강에 23:00"부터) ->벨리데이션
        // if(id_ref.current.value ==="" ){
        //     return false;
        // }
        if(id_ref.current.value === "" ){
            alert("아이디를 입력해주세요!");}
            else if(name_ref.current.value === ""){
                alert("이름을 입력해주세요!");}
            else if(pw_ref.current.value === ""){
                alert("비밀번호를 입력해주세요!");
            }
          else{
            try{
        const user = await createUserWithEmailAndPassword(
          auth, 
          id_ref.current.value, 
          pw_ref.current.value);
          
         console.log(user);
        //  console.log(name_ref);

         const user_doc =await addDoc(collection(db, "users"), {
          user_id: user.user.email,
           name: name_ref.current.value,
           });   //(어디콜렉션에 저장할지, 넣을 데이터)
          
           console.log(user_doc.id);
           alert("회원가입 완료!");
           signOut(auth);
           navigate("/LogIn");
           
        
        }catch(e){
            console.log(e);
            alert("아이디(이메일), 비밀번호를 형식에 맞게 기입해주세요!!")
        }
           
      };
    }

    return (
        <Wrap>
            <h3>회원가입</h3><br/>
            아이디(이메일) <br/> <Id ref={id_ref} placeholder="아이디를 입력해주세요"/> <br/>
            이름 <br/> <Id ref={name_ref} placeholder="이름을 입력해주세요"/><br/>
            비밀번호 <br/> <Id ref={pw_ref} type="password" placeholder="비밀번호를 입력해주세요"/> <br/><br/>

            <button onClick= {signupFB}>회원가입</button>

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

export default Signup;