import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import MypageLayout from "@/layouts/MypageLayout";
import axiosInstance from "@/axiosInstance";
import axios from "axios";

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
`;
const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const CreditInfo = styled.span`
  font-size: 16px;
  color: #4a82d9;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
const Content = styled.div`
  flex: 1;
  padding: 20px;
- background-color: #ffffff;
  border-radius: 15px;
  font-size: 16px;
  min-height: 600px;
`;
const Popup = styled.div`
  position: absolute;
  top: 130px;
  right: 60px;
  background: #fff;
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  font-size: 14px;
  z-index: 100;
`;
const FormGroup = styled.div`
  margin-bottom: 15px;
  margin-top: 15px;
`;
const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 8px;
`;
const Input = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-top: 5px;
`;
const RadioGroup = styled.div`
  display: flex;
  gap: 15px;
`;
const ButtonGroup = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
`;
const Button = styled.button`
  padding: 15px 20px;
  margin-top: 20px;
  background-color: #68a0f4;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  font-size: 16px;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #4a82d9;
  }
`;

const AdminPage = () => {
  const COUNTRY_MAP = {
    한국: "한국",
    일본: "일본",
    중국: "중국",
  };

  const [imageFile, setImageFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const creditCount = 3;
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [captions, setCaptions] = useState([""]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "country") return setCountry(value);
    if (name === "category") return setCategory(value);
    if (name === "title") return setTitle(value);
    if (name === "caption") {
      const newCaptions = [...captions];
      newCaptions[index] = value;
      setCaptions(newCaptions);
    }
  };

  const addCaption = () => {
    setCaptions([...captions, ""]);
  };

  const removeCaption = (index) => {
    if (captions.length > 1) {
      const newCaptions = captions.filter((_, i) => i !== index);
      setCaptions(newCaptions);
    }
  };

  const generateRandomFileName = () => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

  const convertImageToWebP = (file) => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            const randomName = generateRandomFileName();
            const webpFile = new File([blob], `${randomName}.webp`, {
              type: "image/webp",
            });
            resolve({ webpFile, filename: `${randomName}.webp` });
          },
          "image/webp",
          0.8
        );
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    setImageFile(file || null);
    console.log("선택된 파일 👉", file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("이미지를 먼저 업로드해주세요.");
      return;
    }

    const filteredCaptions = captions.filter(
      (caption) => caption.trim() !== ""
    );
    if (filteredCaptions.length === 0) {
      alert("캡션을 최소 하나는 입력해주세요.");
      return;
    }

    try {
      const { webpFile, filename } = await convertImageToWebP(imageFile);

      // 먼저 이미지를 업로드하는 API 호출
      const uploadFormData = new FormData();
      uploadFormData.append("file", webpFile, filename);

      await axios.post(
        "https://publicly-flying-crane.ngrok-free.app/api/upload",
        uploadFormData,
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
          withCredentials: true,
        }
      );

      // 그 다음 설문 정보를 등록하는 API 호출
      const requestData = {
        imageFile: filename,
        country: COUNTRY_MAP[country] || country,
        category: category,
        title: title,
        caption: filteredCaptions,
      };

      console.log("설문 데이터 전송 시작...", requestData);

      await axios.post(
        "https://publicly-flying-crane.ngrok-free.app/api/surveys/register",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
            "user-id": localStorage.getItem("user_id"),
          },
          withCredentials: true,
        }
      );

      alert("등록 완료!");
      setCountry("");
      setCategory("");
      setTitle("");
      setCaptions([""]);
      setImageFile(null);
      const el = document.getElementById("imageUpload");
      if (el) el.value = "";
    } catch (err) {
      console.error("설문 등록 중 오류 발생:", err);
      const errorDetail =
        err.response?.data?.detail || err.message || "알 수 없는 오류";
      alert(`오류가 발생했습니다: ${errorDetail}`);
    }
  };

  return (
    <MypageLayout>
      <Content>
        <TitleWrapper>
          <SectionTitle>설문 등록</SectionTitle>
          <CreditInfo onClick={() => setShowPopup(!showPopup)}>
            등록 가능한 설문 수 : {creditCount}
          </CreditInfo>
        </TitleWrapper>

        {showPopup && (
          <Popup>
            설문을 등록하려면 크레딧이 필요해요. <br />
            다른 설문에 응답하면 크레딧을 모을 수 있어요!
            <br />
            <br />
            <Link to="/survey" style={{ color: "#4a82d9", fontWeight: "bold" }}>
              👉 크레딧 모으러 가기
            </Link>
          </Popup>
        )}

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>나라</Label>
            <RadioGroup>
              {["한국"].map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    name="country"
                    value={option}
                    checked={country === option}
                    onChange={handleChange}
                  />{" "}
                  {option}
                </label>
              ))}
            </RadioGroup>
          </FormGroup>

          <FormGroup>
            <Label>카테고리</Label>
            <RadioGroup>
              {["Architecture", "Clothing", "Cuisine", "Game", "Tool"].map(
                (option) => (
                  <label key={option}>
                    <input
                      type="radio"
                      name="category"
                      value={option}
                      checked={category === option}
                      onChange={handleChange}
                    />{" "}
                    {option}
                  </label>
                )
              )}
            </RadioGroup>
          </FormGroup>

          <FormGroup>
            <Label>고유명사</Label>
            <Input name="title" value={title} onChange={handleChange} />
          </FormGroup>

          <FormGroup>
            <Label>이미지 업로드</Label>
            <Input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>캡션</Label>
            {captions.map((caption, index) => (
              <div
                key={index}
                style={{ display: "flex", gap: "10px", marginBottom: "10px" }}
              >
                <Input
                  name="caption"
                  placeholder={`캡션 ${index + 1}`}
                  value={caption}
                  onChange={(e) => handleChange(e, index)}
                />
                {captions.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => removeCaption(index)}
                    style={{
                      backgroundColor: "#f44336",
                      padding: "8px 12px",
                      margin: "0",
                      fontSize: "14px",
                    }}
                  >
                    삭제
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              onClick={addCaption}
              style={{
                backgroundColor: "#4CAF50",
                padding: "8px 16px",
                margin: "10px 0 0 0",
                fontSize: "14px",
              }}
            >
              + 캡션 추가
            </Button>
          </FormGroup>

          <ButtonGroup>
            <Button type="submit">등록하기</Button>
          </ButtonGroup>
        </form>
      </Content>
    </MypageLayout>
  );
};

export default AdminPage;
