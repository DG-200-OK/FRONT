import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginLogoImage from "@/assets/img/loginlogo.png";
import axiosInstance from "@/axiosInstance";

function withRouter(Component) {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fff;
  position: relative;
`;

const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;

  img {
    width: 150px;
    margin-right: 10px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Input = styled.input`
  padding: 12px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  outline: none;

  &::placeholder {
    color: #aaa;
  }
`;

const Button = styled.button`
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
`;

const SignupText = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: #666;

  a {
    text-decoration: none;
    font-weight: bold;
    color: #68a0f4;
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 30px;
  left: 30px;
  background: none;
  border: 2px solid #68a0f4;
  color: #68a0f4;
  padding: 10px 20px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #68a0f4;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(104, 160, 244, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleGoBack = () => {
    this.props.navigate(-1); // 이전 페이지로 이동
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      const formData = new URLSearchParams();
      formData.append('username', email.trim());
      formData.append('password', password.trim());

      const response = await axiosInstance.post("/api/auth/login", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          'ngrok-skip-browser-warning': 'true'
        },
        withCredentials: true,
      });

      const data = response.data;
      console.log("로그인 성공:", data);

      localStorage.setItem('user_id', String(data.responseData.userId));

      if (data.role === "admin") {
        console.log("관리자 로그인 성공!");
        alert("관리자로 로그인되었습니다.");
        this.props.navigate("/administrator");
      } else {
        alert("로그인에 성공했습니다.");
        this.props.navigate("/mainpage");
      }

    } catch (error) {
      console.error("로그인 오류:", error);
      if (error.response) {
        console.error("로그인 실패 응답:", error.response.data);
        alert(error.response.data.message || "로그인 실패");
      } else {
        alert("서버 오류로 로그인에 실패했습니다.");
      }
    }
  };

  render() {
    return (
      <Container>
        <BackButton onClick={this.handleGoBack}>
          ← 뒤로가기
        </BackButton>

        <HeaderLogo>
          <img src={LoginLogoImage} alt="로고" />
        </HeaderLogo>

        <Form onSubmit={this.handleSubmit}>
          <label>아이디</label>
          <Input
            type="text"
            name="email"
            placeholder="아이디를 입력해주세요."
            value={this.state.email}
            onChange={this.handleChange}
            autoComplete="off"
          />
          <label>비밀번호</label>
          <Input
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요."
            value={this.state.password}
            onChange={this.handleChange}
            autoComplete="off"
          />
          <Button type="submit">시작하기</Button>
        </Form>

        <SignupText>
          계정이 없으신가요? <Link to="/signup">계정 만들기</Link>
        </SignupText>
      </Container>
    );
  }
}

export default withRouter(Login);
