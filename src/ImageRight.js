import './App.css';
import React from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ImageRight = ({inputTextValue, previewImage, card}) => {

  const navigate = useNavigate();

  return (
    
    <LayoutBox onClick={()=>{
      navigate("/DetailPage");
    }}>
  <Text>{inputTextValue}</Text>
  <Image src={previewImage} alt=''/>
</LayoutBox>

    // <LayoutBox onClick={()=>{
    //       navigate("/DetailPage");
    //     }}>
    //   <Text>{card.text}</Text>
    //   <Image src={card.image_url} alt=''/>
    // </LayoutBox>
    

  )
}



const LayoutBox = styled.div`
    
    width: 100%;
    height: 200px;
    box-sizing: border-box;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    border :1px solid gray;
    margin-bottom: 20px;

`;



const Text =styled.div`
    word-break: break-all;
    font-size: 14px;
    margin: 10px;
    font-weight: 400;
    text-align: center;
    width: 60%;

`;

const Image =styled.img`
    width: 40%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    background-color: lightgrey;
`;




export default ImageRight