import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LogoImage from "@/assets/img/logo.png";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/axiosInstance";
import { TERMS_OF_SERVICE, PRIVACY_POLICY } from "@/constants/terms";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fff;
`;

const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;

  img {
    width: 150px;
    margin-right: 10px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 350px; // Increased width for agreement section
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  box-sizing: border-box;

  &::placeholder {
    color: #aaa;
  }
`;

const PasswordHint = styled.p`
  font-size: 12px;
  color: #888;
  margin: 5px 0 15px;
  display: flex;
  align-items: center;

  &::before {
    content: "✔";
    color: green;
    margin-right: 5px;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #68a0f4;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #4a82d9;
  }

  &:disabled {
    background-color: #d3d3d3;
    cursor: not-allowed;
  }
`;

const LoginText = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: #666;
  text-align: center;

  a {
    text-decoration: none;
    font-weight: bold;
    color: #68a0f4;
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  max-width: 500px;
`;

const ModalButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #68a0f4;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #4a82d9;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  background-color: white;
  box-sizing: border-box;
`;

// Styles for Agreement Section from guideline.html
const AgreementSection = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  margin-top: 15px;
  margin-bottom: 10px;
  width: 100%;
  box-sizing: border-box;
`;

const AgreementItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  &:last-child {
    margin-bottom: 0;
  }

  input[type="checkbox"] {
    margin-right: 12px;
    width: 18px;
    height: 18px;
    cursor: pointer;
  }

  label {
    flex-grow: 1;
    color: #444;
    cursor: pointer;
    margin-bottom: 0;
    font-weight: normal;
  }
`;

const AllAgreeItem = styled(AgreementItem)`
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
  label {
    font-weight: 700;
    font-size: 1.1em;
    color: #222;
  }
`;

const ViewDetailsButton = styled.span`
  font-size: 0.9em;
  color: #888;
  text-decoration: underline;
  cursor: pointer;
  flex-shrink: 0;
`;

const TermsModalContent = styled.pre`
  white-space: pre-wrap;
  text-align: left;
  max-height: 400px;
  overflow-y: auto;
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #eee;
`;

const SignupID = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("male");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  // State for agreements
  const [agreements, setAgreements] = useState({
    age: false,
    tos: false,
    privacy: false,
  });
  const [isAgreementsValid, setIsAgreementsValid] = useState(false);

  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsModalContent, setTermsModalContent] = useState("");

  useEffect(() => {
    const { age, tos, privacy } = agreements;
    setIsAgreementsValid(age && tos && privacy);
  }, [agreements]);

  const handleAgreeAllChange = (e) => {
    const { checked } = e.target;
    setAgreements({
      age: checked,
      tos: checked,
      privacy: checked,
    });
  };

  const handleAgreementChange = (e) => {
    const { name, checked } = e.target;
    setAgreements((prev) => ({ ...prev, [name]: checked }));
  };

  const handleViewTerms = (type) => {
    let content = "";
    if (type === "tos") {
      content = TERMS_OF_SERVICE;
    } else if (type === "privacy") {
      content = PRIVACY_POLICY;
    }
    setTermsModalContent(content);
    setShowTermsModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id || !password || !email) {
      setModalMessage("모든 필드를 입력해주세요.");
      setIsError(true);
      setShowModal(true);
      return;
    }

    if (!isAgreementsValid) {
      setModalMessage("필수 약관에 모두 동의해야 합니다.");
      setIsError(true);
      setShowModal(true);
      return;
    }

    try {
      const response = await axiosInstance.post(
        "/api/v2/auth/signup",
        {
          username: id,
          password,
          email,
          gender,
          marketing_agree: agreements.marketing, // Pass marketing agreement status
        },
        {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          withCredentials: true,
        }
      );

      console.log("회원가입 성공:", response.data);

      setModalMessage("🎉 회원가입 성공! 메인화면으로 이동합니다.");
      setIsError(false);
      setShowModal(true);
    } catch (error) {
      console.error("회원가입 실패:", error);
      const message =
        "에러가 발생했습니다";
      setModalMessage(message);
      setIsError(true);
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (!isError) {
      navigate("/mainpage");
    }
  };

  const allChecked = Object.values(agreements).every((v) => v);

  return (
    <Container>
      <HeaderLogo>
        <img src={LogoImage} alt="로고" />
      </HeaderLogo>

      <p>빠르고 쉽게 계정을 만들어보세요!</p>

      <Form onSubmit={handleSubmit}>
        <label>아이디</label>
        <Input
          type="text"
          placeholder="아이디를 입력해주세요."
          value={id}
          onChange={(e) => setId(e.target.value)}
          autoComplete="off"
        />
        <label>비밀번호</label>
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
        />
        <PasswordHint>문자 + 숫자 조합 6자 이상</PasswordHint>
        <label>이메일</label>
        <Input
          type="email"
          placeholder="이메일을 입력해주세요."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />
        <label>성별</label>
        <Select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">남성</option>
          <option value="female">여성</option>
        </Select>

        <AgreementSection>
          <AllAgreeItem>
            <input
              type="checkbox"
              id="agree-all"
              checked={allChecked}
              onChange={handleAgreeAllChange}
            />
            <label htmlFor="agree-all">모든 약관에 전체 동의합니다.</label>
          </AllAgreeItem>
          <AgreementItem>
            <input
              type="checkbox"
              id="agree-age"
              name="age"
              checked={agreements.age}
              onChange={handleAgreementChange}
            />
            <label htmlFor="agree-age">[필수] 만 14세 이상입니다.</label>
          </AgreementItem>
          <AgreementItem>
            <input
              type="checkbox"
              id="agree-tos"
              name="tos"
              checked={agreements.tos}
              onChange={handleAgreementChange}
            />
            <label htmlFor="agree-tos">[필수] 이용약관 동의</label>
            <ViewDetailsButton onClick={() => handleViewTerms("tos")}>
              내용보기
            </ViewDetailsButton>
          </AgreementItem>
          <AgreementItem>
            <input
              type="checkbox"
              id="agree-privacy"
              name="privacy"
              checked={agreements.privacy}
              onChange={handleAgreementChange}
            />
            <label htmlFor="agree-privacy">
              [필수] 개인정보 수집 및 이용 동의
            </label>
            <ViewDetailsButton onClick={() => handleViewTerms("privacy")}>
              내용보기
            </ViewDetailsButton>
          </AgreementItem>
          {/* <AgreementItem>
            <input
              type="checkbox"
              id="agree-marketing"
              name="marketing"
              checked={agreements.marketing}
              onChange={handleAgreementChange}
            />
            <label htmlFor="agree-marketing">
              [선택] 마케팅 정보 수신 동의
            </label>
            <ViewDetailsButton onClick={() => handleViewTerms("marketing")}>
              내용보기
            </ViewDetailsButton>
          </AgreementItem> */}
        </AgreementSection>

        <Button
          type="submit"
          disabled={!id || !password || !email || !isAgreementsValid}
        >
          가입하기
        </Button>
      </Form>

      <LoginText>
        이미 계정이 있으신가요? <a href="/login">로그인하기</a>
      </LoginText>

      {showModal && (
        <ModalBackground>
          <ModalBox>
            <h3>{isError ? "❌ 회원가입 실패" : "회원가입 성공"}</h3>
            <p style={{ whiteSpace: "pre-line" }}>{modalMessage}</p>
            <ModalButton onClick={handleModalClose}>확인</ModalButton>
          </ModalBox>
        </ModalBackground>
      )}

      {showTermsModal && (
        <ModalBackground>
          <ModalBox>
            <TermsModalContent>{termsModalContent}</TermsModalContent>
            <ModalButton onClick={() => setShowTermsModal(false)}>
              닫기
            </ModalButton>
          </ModalBox>
        </ModalBackground>
      )}
    </Container>
  );
};

export default SignupID;
