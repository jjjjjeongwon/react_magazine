import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import styled from "styled-components";
import React from "react";
import { auth, db, storage } from "./shared/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { collection, addDoc, getDoc, getDocs} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import LayoutPage from "./LayoutPage";
import DetailPage from "./DetailPage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


function App() {
  const navigate = useNavigate();

  const name_ref = React.useRef(null);

  const [is_login, setIsLogin] = React.useState(false);

  const [userId, setUserId] = React.useState();
  const [userName, setUserName] = React.useState();

  const [boardArray, setBoardArray] = React.useState([]);

  console.log(auth.currentUser);

  const loginCheck = async (user) => {
    if (user) {
      setIsLogin(true);
      console.log(user);
      setUserId(user.email);
      
    } else {
      setIsLogin(false);
    }
  };

  // setUserName(name_ref.current.value);

  React.useEffect(() => {
    onAuthStateChanged(auth, loginCheck);
  }, []);


  React.useEffect(() => {
    async function fetchData(){
    const BoardsData = await getDocs(collection(db, "boards"));
    console.log(BoardsData)

    let BoardsList =[];
    BoardsData.forEach((doc)=> {
      BoardsList.push({boardkey: doc.id,...doc.data()});
    })
    setBoardArray(BoardsList);
    console.log(BoardsList);
  }
    fetchData();
  }, []);

  

  return (
    <div className="App">
      <All>
        <Title>
          <HomeImage
            onClick={() => {
              navigate("/");
            }}
          >
            <FontAwesomeIcon icon={faHouse} />
          </HomeImage>
          <h2 font-family="Edu NSW ACT Foundation" cursive>
            Magazine{" "}
          </h2>

          <Box>
            {is_login ? (
              <>
                <ButtonAlarm >Alarm</ButtonAlarm>
                <ButtonLogout
                  onClick={() => {
                    signOut(auth);
                  }}
                >
                  {" "}
                  로그아웃
                </ButtonLogout>
              </>
            ) : (
              <>
                <ButtonOne
                  onClick={() => {
                    navigate("/Signup");
                  }}
                >
                  Sign Up
                </ButtonOne>
                <ButtonTwo
                  onClick={() => {
                    navigate("/Login");
                  }}
                >
                  Log In
                </ButtonTwo>
              </>
            )}
          </Box>
        </Title>
      </All>

      <Routes>
        <Route path="/Signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <Home
              is_login={is_login}
              setBoardArray={setBoardArray}
              boardArray={boardArray}
            />
          }
        />
        <Route path="/Login" element={<Login />} />
        <Route path="/LayoutPage" element={<LayoutPage userId={userId} 
        userName={userName} 
        setBoardArray={setBoardArray}
        boardArray={boardArray}/>} />
        <Route path="/LayoutPage/:Id" element={<LayoutPage userId={userId} 
        userName={userName} 
        setBoardArray={setBoardArray}
        boardArray={boardArray}/>} />
        <Route path="/DetailPage" element={<DetailPage />} />
      </Routes>
    </div>
  ); //routes 수정해야함 !! login....
}

const All = styled.div`
  width: 90%;
  margin: 0px auto;
`;

const Title = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  padding: 16px;
`;

const HomeImage = styled.div`
  color: black;
  font-size: 30px;
`;

const Box = styled.div`
  width: 40%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
`;

const ButtonOne = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  width: 70%;
  height: 40px;
  background-color: black;
  border: none;
  border-radius: 3px;
  color: white;
  margin: 0px 10px 0px 0px;
  padding-top: 5px;
  font-family: "Gowun Batang", serif;
`;

const ButtonTwo = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  width: 70%;
  height: 40px;
  background-color: black;
  border: none;
  border-radius: 3px;
  color: white;
  padding-top: 5px;
  font-family: "Gowun Batang", serif;
`;

const ButtonLogout = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  width: 70%;
  height: 40px;
  background-color: black;
  border: none;
  border-radius: 3px;
  color: white;
  padding-top: 5px;
  font-family: "Gowun Batang", serif;
`;

const ButtonAlarm = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  width: 70%;
  height: 40px;
  background-color: black;
  border: none;
  border-radius: 3px;
  color: white;
  margin: 0px 10px 0px 0px;
  padding-top: 5px;
  font-family: "Gowun Batang", serif;
`;

export default App;
