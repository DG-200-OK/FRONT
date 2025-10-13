import React from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

const MaintenanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: 20px;
`;

const MaintenanceIcon = styled.div`
  font-size: 120px;
  margin-bottom: 30px;
  animation: ${rotate} 3s linear infinite;
`;

const MaintenanceTitle = styled.h1`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 20px;
  animation: ${bounce} 2s ease-in-out infinite;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const MaintenanceSubtitle = styled.h2`
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 30px;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const MaintenanceDescription = styled.p`
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 40px;
  max-width: 600px;
  opacity: 0.8;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.1);
  padding: 15px 25px;
  border-radius: 50px;
  margin-bottom: 30px;
  backdrop-filter: blur(10px);
`;

const StatusDot = styled.div`
  width: 12px;
  height: 12px;
  background: #ffd700;
  border-radius: 50%;
  animation: ${bounce} 1.5s ease-in-out infinite;
`;

const StatusText = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const ContactInfo = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 20px 30px;
  border-radius: 15px;
  backdrop-filter: blur(10px);

  h3 {
    margin: 0 0 10px 0;
    font-size: 18px;
    font-weight: 600;
  }

  p {
    margin: 5px 0;
    font-size: 14px;
    opacity: 0.9;
  }
`;

const Maintenance = () => {
  return (
    <MaintenanceContainer>
      <MaintenanceIcon>⚙️</MaintenanceIcon>

      <MaintenanceTitle>시스템 점검 중</MaintenanceTitle>

      <MaintenanceSubtitle>서비스 개선을 위한 점검을 진행하고 있습니다</MaintenanceSubtitle>

      <MaintenanceDescription>
        더 나은 서비스 제공을 위해 시스템 점검을 진행하고 있습니다.
        점검 중에는 일시적으로 서비스 이용이 제한됩니다.
        불편을 드려 죄송하며, 빠른 시일 내에 정상 서비스로 복구하겠습니다.
      </MaintenanceDescription>

      <StatusIndicator>
        <StatusDot />
        <StatusText>점검 진행 중...</StatusText>
      </StatusIndicator>

      <ContactInfo>
        <h3>문의사항</h3>
        <p>점검 관련 문의사항이 있으시면</p>
        <p>관리자에게 연락해 주세요.</p>
        <p>xodn9245@gmail.com</p>
      </ContactInfo>
    </MaintenanceContainer>
  );
};

export default Maintenance;