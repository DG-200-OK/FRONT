import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LogoImage from "@/assets/img/logo.png";

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
  margin-bottom: 10px;

  img {
    width: 150px;
    margin-right: 10px;
  }
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 300px;
  padding: 15px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
`;

const SNSButton = styled(Button)`
  background-color: #fff;
  border: 1px solid #ddd;
  color: #333;
  margin-bottom: 15px;

  &:hover {
    background-color: #f7f7f7;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  margin: 15px 0;
  color: #aaa;
  font-size: 14px;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #ddd;
    margin: 0 10px;
  }
`;

const IDButton = styled(Button)`
  background-color: #68a0f4;
  color: white;
  border: none;

  &:hover {
    background-color: #4a82d9;
  }
`;

const LoginText = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: #666;

  a {
    text-decoration: none;
    font-weight: bold;
    color: #68a0f4;
  }
`;

class Signup extends React.Component {
  render() {
    return (
      <Container>
        <HeaderLogo>
          <img src={LogoImage} alt="로고" /> 
        </HeaderLogo>
        {/* <Description>빠르고 쉽게 계정을 만들어보세요!</Description> */}

        {/* <Link to="/signupsns">
          <SNSButton>SNS로 시작하기</SNSButton>
        </Link> */}
        {/* <Divider>OR</Divider> */}
        <Link to="/signupid">
          <IDButton>아이디로 시작하기</IDButton>
        </Link>
        <LoginText>
          이미 계정이 있으신가요? <Link to="/login">로그인하기</Link>
        </LoginText>
      </Container>
    );
  }
}

export default Signup;
