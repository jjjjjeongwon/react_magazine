import React from "react";
import styled from "styled-components";
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import ImageRight from "./ImageRight";
import ImageLeft from "./ImageLeft";
import ImageBottom from "./ImageBottom";
import { db } from "./shared/firebase";
import { deleteDoc, doc , updateDoc} from "firebase/firestore";
// import { auth, db, storage } from "./shared/firebase";
// import { collection, addDoc, getDoc, getDocs } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Home = ({
  is_login,
  setBoardArray,
  boardArray,
  inputTextValue,
  previewImage,
}) => {
  const navigate = useNavigate();
  console.log("Home", is_login);
  console.log(boardArray);

  function delcards(boardkey) {
    return async () => {
      const docRef = await doc(db, "boards", boardkey);
      await deleteDoc(docRef);
      window.location.reload();
      alert("삭제되었습니다!")
    };
  }


  // function delcards(boardkey) {
  //   return async () => {
  //     const docRef = await doc(db, "boards", boardkey);
  //     await updateDoc(docRef);
  //     window.location.reload();
  //     alert("수정")
  //   };
  // }


  // const get_docs = async(e)=>{
  //     const boards_data =await getDocs(collection(db, "boards"));
  // console.log(boards_data);
  // }

  return (
    <Wrap>
      {/* 게시물 들어갈 자리! */}
      {boardArray.map((card) => {
        if (card.layout_click === "right") {
          return (
            <WrapPost>
              <WrapLayout>
                <Name>{card.name}</Name>
                <Date>{card.date}</Date>
                <button onClick={delcards(card.boardkey)}>X</button>
              </WrapLayout>
              {/* <ImageRight card={card}/> */}

              <LayoutBox
                onClick={() => {
                  navigate("/DetailPage");
                }}
              >
                <Text>{card.text}</Text>
                <Image src={card.image_url} alt="" />
              </LayoutBox>
            </WrapPost>
          );
        } else if (card.layout_click === "left") {
          return (
            <WrapPost>
              <WrapLayout>
                <Name>{card.name}</Name>
               
                <Date>{card.date}</Date>
                <button onClick={delcards(card.boardkey)}>X</button>
                
              </WrapLayout>
              {/* <ImageLeft card={card} />*/}

              <LayoutBox
                onClick={() => {
                  navigate("/DetailPage");
                }}
              >
                <Image src={card.image_url} alt="" />
                <Text>{card.text}</Text>
              </LayoutBox>
            </WrapPost>
          );
        } else if (card.layout_click === "bottom") {
          return (
            <WrapPost>
              <WrapLayout>
                <Name>{card.name}</Name>

                <Date>{card.date}</Date>
                <button onClick={delcards(card.boardkey)}>X</button>
              </WrapLayout>
              {/* <ImageBottom card={card} />*/}

              <LayoutBoxB
                onClick={() => {
                  navigate("/DetailPage");
                }}
              >
                <Text>{card.text}</Text>
                <ImageB src={card.image_url} alt="" />
              </LayoutBoxB>
            </WrapPost>
          );
        }
        return;
      })}

      {/* 
    <WrapPost>
    <WrapLayout>
    <Name>닉네임</Name>
      <Date>2022-07-15 09:20:07</Date>
      </WrapLayout>
    <ImageRight/>
    </WrapPost>
     */}

      {/* <WrapPost>
    <WrapLayout>
    <Name>닉네임</Name>
      <Date>2022-07-15 09:20:07</Date>
      </WrapLayout>
    <ImageLeft/>
    </WrapPost>

    <WrapPost>
    <WrapLayout>
    <Name>닉네임</Name>
      <Date>2022-07-15 09:20:07</Date>
      </WrapLayout>
    <ImageBottom/>
    </WrapPost> */}

      {is_login ? (
        <>
          <CreatePost
            onClick={() => {
              navigate("/LayoutPage");
            }}
          >
            <FontAwesomeIcon icon={faPen} />
          </CreatePost>
        </>
      ) : null}
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 85%;
  height: 100%;
  margin: 0px auto 100px auto;

  /* border : 1.5px solid lightslategray; */
  border-radius: 3px;
`;

const CreatePost = styled.div`
  position: fixed;
  bottom: 20px;
  right: 30px;
  cursor: pointer;
  box-sizing: border-box;
  width: 50px;
  height: 48px;
  background-color: slategray;
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 25px;
  padding-top: 3px;
`;

const WrapPost = styled.div`
  border: 1px solid black;
  border-radius: 3px;
  padding: 5px 10px 5px 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: whitesmoke;
`;

const WrapLayout = styled.div`
  width: 100%;
  height: 10%;
  box-sizing: border-box;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
`;

const Name = styled.div`
  width: 15%;
  height: 30px;
  border-radius: 3px;
`;

const Date = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  width: 30%;
  height: 35px;
  border: none;
  font-size: 12px;
  padding-top: 5px;
`;

const LayoutBox = styled.div`
  width: 100%;
  height: 200px;
  box-sizing: border-box;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  border: 1px solid gray;
  margin-bottom: 20px;
  background-color: white;
`;

const LayoutBoxB = styled.div`
  width: 100%;
  height: 500px;
  box-sizing: border-box;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  border: 1px solid gray;
  margin-bottom: 20px;
`;

const ImageB = styled.img`
  width: 100%;
  height: 90%;
  box-sizing: border-box;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  background-color: lightgrey;
`;

const Text = styled.div`
  word-break: break-all;
  font-size: 14px;
  margin: 10px;
  font-weight: 400;
  text-align: center;
  width: 60%;
`;

const Image = styled.img`
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

export default Home;
