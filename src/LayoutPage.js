import "./App.css";
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "./shared/firebase";
import { collection, addDoc, getDocs ,query, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ImageRight from "./ImageRight";
import ImageBottom from "./ImageBottom";
import ImageLeft from "./ImageLeft";

const LayoutPage = ({ userId, userName, setBoardArray, boardArray }) => {
  const navigate = useNavigate();
  console.log(auth?.currentUser);
  const [inputTextValue, inputTextChangeVal] = React.useState("");
  const file_link_ref = React.useState(null);

  const [previewImage, setImage] = React.useState(
    "https://placehold.jp/30/ff778899/ffffff/300x150.png?text=image"
  );
  const [UploadImg, setUploadImg] = React.useState(); //
  const [layout, setLayout] = React.useState("");

  const img_change = async (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      setImage(reader.result);
    };
    setUploadImg(e.target.files[0]); //
  };

  

  // const signupFB = async () => {
  //   const user_doc = await addDoc(collection(db, "boards"), {
  //     //옵셔널 체이닝- 뒤에 있는 값이 없을 때 오류 안나고 undefined로 반ㄹ환
  //     image_url: file_link_ref.current?.url,
  //   });
  // };

  const uploadFB = async (e) => {
    console.log(e.target.files);

    const user_docs =await getDocs(query(
      collection(db, "users"), where("user_id", "==", auth.currentUser.email)
   ));
      
      let userName =""
      user_docs.forEach(u =>{
          userName=u.data().name;
      })

    if(previewImage === "https://placehold.jp/30/ff778899/ffffff/300x150.png?text=image"){
      alert("이미지를 업로드 해주세요!")
    }else if( inputTextValue ===""){
      alert("텍스트를 입력하세요!");
    }else if(layout===""){
      alert("레이아웃을 선택해주세요!")
    }
    else{

    
    // const uploaded_file =
    let date = new Date().toLocaleString();
    console.log(date);
    await uploadBytes(
      ref(storage, `images/${UploadImg.name + date}`), //
      UploadImg //
    );
    // console.log(uploaded_file);

    const file_url = await getDownloadURL(
      ref(storage, `images/${UploadImg.name + date}`)
    ); //

    console.log(file_url);
    file_link_ref.current = { url: file_url };

    console.log(file_link_ref);

    await addDoc(collection(db, "boards"), {
      //옵셔널 체이닝- 뒤에 있는 값이 없을 때 오류 안나고 undefined로 반ㄹ환
      id: userId,
      name: userName,
      image_url: file_link_ref.current?.url, //file_link_ref.current가 있으면 file_link_ref.current.url넣기
      layout_click: layout,
      date: date,
      text: inputTextValue,
    });

    const BoardsData = await getDocs(collection(db, "boards"));
    console.log(BoardsData);

    let BoardsList = [];
    BoardsData.forEach((doc) => {
      // console.log(BoardsList);
      BoardsList.push({ ...doc.data() });
    });
    console.log(BoardsList);

    setBoardArray(BoardsList);
    navigate("/");
    window.location.reload();

    }
  };

  return (
    <Wrap>
      <h1>게시글 작성</h1>
      <Box>
        <Line type="text" placeholder="사진을 선택해주세요!" />
        <input type="file" onChange={img_change} />
        {/* <Find>파일찾기</Find> */}
        {/* <Button onClick={signupFB}
        >사진 업로드 </Button> */}
      </Box>
      <h2>레이아웃 고르기</h2>
      <div>
        <input type="radio" name="frame" onClick={() => setLayout("right")} />
        오른쪽에 이미지 왼쪽에 텍스트
      </div>
      <ImageRight inputTextValue={inputTextValue} previewImage={previewImage} />

      <br />
      <div>
        <input type="radio" name="frame" onClick={() => setLayout("left")} />
        왼쪽에 이미지 오른쪽에 텍스트
      </div>
      {/* <LayoutBox>
        <Image src={previewImage} alt='' />
        <Text>{inputTextValue}</Text>
      </LayoutBox> */}
      <ImageLeft inputTextValue={inputTextValue} previewImage={previewImage}  />

      <br />
      <div>
        <input type="radio" name="frame" onClick={() => setLayout("bottom")} />
        하단에 이미지 상단에 텍스트
      </div>
      <ImageBottom
        inputTextValue={inputTextValue}
        previewImage={previewImage}
      />
      <br />
      <div>게시물 내용</div>
      <PostBox
        type="text"
        placeholder="게시글작성"
        onChange={(e) => {
          inputTextChangeVal(e.target.value);
        }}
      ></PostBox>
      <br />

      {/* <Button
        onClick={() => {
          navigate("/");
        }}
      >
        게시글 작성{" "}
      </Button> */}

      <Button onClick={uploadFB}>게시글 작성 </Button>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 85%;

  margin: 0px auto 100px auto;
  padding: 0px;
`;

const Box = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  /* -webkit-box-pack: justify; */
  /* justify-content: space-between; */
  -webkit-box-align: center;
  align-items: center;
`;

const Line = styled.input`
  width: 25%;
  height: 30px;
  border: 1px solid black;
  border-radius: 3px;
`;

const Find = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  width: 60px;
  height: 35px;
  background-color: black;
  border: none;
  border-radius: 3px;
  color: white;
  font-size: 15px;
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
  border: 1px solid black;
`;

const PostBox = styled.input`
  width: 100%;
  height: 200px;
  box-sizing: border-box;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  border-radius: 3px;
  border: 3px solid lightblue;
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

const Button = styled.button`
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  background-color: black;
  color: white;
  border-radius: 3px;
  width: 100%;
  height: 40px;
  font-size: 15px;
  font-family: "Gowun Batang", serif;
`;

export default LayoutPage;
