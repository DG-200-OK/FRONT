import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import MypageLayout from "@/layouts/MypageLayout";
import axiosInstance from "@/axiosInstance";

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
  background-color: #ffffff;
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
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
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
  background-color: #68A0F4;
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
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    country: "",
    category: "",
    entityName: "",
    captions: ["", "", "", "", ""],
  });

  const [imageFile, setImageFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const creditCount = 3;

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "caption") {
      const updated = [...formData.captions];
      updated[index] = value;
      setFormData({ ...formData, captions: updated });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    console.log("선택된 파일 👉", file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!imageFile) {
      alert("이미지를 먼저 업로드해주세요.");
      return;
    }

    try {
      const imageFormData = new FormData();
      imageFormData.append("image", imageFile);

      console.log("📡 이미지 업로드 시작...");
      const imageRes = await axiosInstance.post("/api/surveys/upload-image/", imageFormData, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        },
        withCredentials: true,
      });

      const imageUrl = imageRes.data.imageUrl;
      console.log("이미지 업로드 성공, URL:", imageUrl);

      const surveyPayload = {
        image_url: imageUrl,
        country: formData.country,
        category: formData.category,
        title: formData.entityName, 
        captions: formData.captions.map(captionText => ({ text: captionText, type: 'generated' })) 
      };

      console.log("📡 설문 데이터 전송 시작...", surveyPayload);
      await axiosInstance.post("/api/surveys/", surveyPayload, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        },
        withCredentials: true,
      });

      alert("등록 완료!");
      setFormData({
        country: "",
        category: "",
        entityName: "",
        captions: ["", "", "", "", ""],
      });
      setImageFile(null);
      document.getElementById("imageUpload").value = "";

    } catch (err) {
      console.error("❌ 설문 등록 중 오류 발생:", err);
      const errorDetail = err.response?.data?.detail || err.message || "알 수 없는 오류";
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
            <br /><br />
            <Link to="/survey" style={{ color: "#4a82d9", fontWeight: "bold" }}>
              👉 크레딧 모으러 가기
            </Link>
          </Popup>
        )}

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>나라</Label>
            <RadioGroup>
              {["한국", "중국", "일본"].map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    name="country"
                    value={option}
                    checked={formData.country === option}
                    onChange={handleChange}
                  /> {option}
                </label>
              ))}
            </RadioGroup>
          </FormGroup>

          <FormGroup>
            <Label>카테고리</Label>
            <RadioGroup>
              {["architecture", "clothes", "cuisine", "game", "tool"].map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    name="category"
                    value={option}
                    checked={formData.category === option}
                    onChange={handleChange}
                  /> {option}
                </label>
              ))}
            </RadioGroup>
          </FormGroup>

          <FormGroup>
            <Label>고유명사</Label>
            <Input name="entityName" value={formData.entityName} onChange={handleChange} />
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
            <Label>캡션 5가지</Label>
            {formData.captions.map((caption, index) => (
              <Input
                key={index}
                name="caption"
                placeholder={`${index + 1})`}
                value={caption}
                onChange={(e) => handleChange(e, index)}
              />
            ))}
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
