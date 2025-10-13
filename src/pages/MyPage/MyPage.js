import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import DefaultProfile from "@/assets/img/profile.png";
import MypageLayout from "@/layouts/MypageLayout";
import axiosInstance from "@/axiosInstance";

const InputField = styled.input`
  width: 200px;
  padding: 8px;
  font-size: 16px;
  border-radius: 6px;
  border: 2px solid #f5f5f5;
`;

const WarningText = styled.p`
  font-size: 12px;
  color: ${({ isValid }) => (isValid ? "#68A0F4" : "red")};
  margin-top: 0px;
`;

const ActionButton = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  background-color: #68a0f4;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: #4f82d8;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 15px;
  width: 100%;
`;

const InfoText = styled.p`
  font-size: 14px;
  color: #444;
  margin-bottom: 8px;
`;

const NicknameLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #444;
  margin-bottom: 4px;
`;

const MyPage = () => {
  const [nickname, setNickname] = useState("");
  const [originalNickname, setOriginalNickname] = useState("");
  const [userId, setUserId] = useState(
    () => localStorage.getItem("user_id") || ""
  );
  const [email, setEmail] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);
  const [profileImage, setProfileImage] = useState(DefaultProfile);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/api/auth/me", {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
            "user-id": userId,
          },
          withCredentials: true,
        });

        const data = response.data;
        console.log("Fetched user data:", data);

        if (data && data.responseData) {
          const userData = data.responseData;
          const name = userData.nickname || userData.username;
          setNickname(name);
          setOriginalNickname(name);
          setUserId(userData.username);
          setEmail(userData.email || "");

          if (!userData.profileImage || userData.profileImage === "") {
            const blob = await fetch(DefaultProfile).then((res) => res.blob());
            const base64 = await new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            });
            setProfileImage(base64);
            uploadProfileImage(base64);
          } else {
            setProfileImage(userData.profileImage);
          }
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUser();
  }, [navigate, userId]);

  const handleInputChange = (event) => {
    const newName = event.target.value;
    setNickname(newName);
    setIsNameValid(newName.length <= 10);
  };

  const uploadProfileImage = async (base64) => {
    try {
      const response = await axiosInstance.patch(
        "/api/auth/profile",
        { profileImage: base64 },
        {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          withCredentials: true,
        }
      );
      console.log("서버 응답:", response.data);
    } catch (err) {
      console.error("서버 요청 실패:", err);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setProfileImage(base64);
        uploadProfileImage(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetToDefaultImage = () => {
    setProfileImage(DefaultProfile);
    fetch(DefaultProfile)
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result;
          uploadProfileImage(base64);
        };
        reader.readAsDataURL(blob);
      });
  };

  const handleNicknameSave = async () => {
    if (nickname === originalNickname) {
      alert("닉네임이 변경되지 않았습니다.");
      return;
    }

    try {
      const checkResponse = await axiosInstance.get(
        `/api/auth/check-nickname/${nickname}`
      );
      if (checkResponse.data.exists) {
        alert("이미 존재하는 닉네임입니다.");
        return;
      }

      await axiosInstance.patch(
        "/api/auth/nickname",
        { nickname },
        {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          withCredentials: true,
        }
      );

      alert("닉네임이 변경되었습니다.");
      setOriginalNickname(nickname);
    } catch (err) {
      alert("닉네임 변경 중 오류 발생");
      console.error(err);
    }
  };

  return (
    <MypageLayout>
      <div style={{ padding: 20 }}>
        <h2>계정 정보</h2>

        <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>
          {/* <div> */}
            {/* <img
              src={profileImage}
              alt="프로필"
              style={{ width: 100, height: 100, borderRadius: "50%" }}
            />
            <input
              type="file"
              id="fileUpload"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleImageChange}
            /> */}
            {/* <ActionButton
              onClick={() => document.getElementById("fileUpload").click()}
              style={{ marginTop: 10 }}
            >
              사진 변경
            </ActionButton>
            <ActionButton
              onClick={handleResetToDefaultImage}
              style={{ marginTop: 10, marginLeft: 10 }}
            >
              기본 이미지로 변경
            </ActionButton>
          </div> */}

          <div>
            <InfoText>
              아이디: <strong>{userId}</strong>
            </InfoText>
            <InfoText>
              이메일: <strong>{email}</strong>
            </InfoText>

            <NicknameLabel>
              <FaPencilAlt style={{ color: "#649eff" }} /> 닉네임
            </NicknameLabel>
            <InputField
              type="text"
              value={nickname}
              onChange={handleInputChange}
            />
            <WarningText isValid={isNameValid}>
              닉네임은 10글자 초과 불가
            </WarningText>
            <ButtonRow>
              <ActionButton
                onClick={handleNicknameSave}
                disabled={!isNameValid}
              >
                저장
              </ActionButton>
            </ButtonRow>
          </div>
        </div>
      </div>
    </MypageLayout>
  );
};

export default MyPage;
