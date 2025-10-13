import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import wassersteinImage from "../assets/img/wasserstein_distance.png";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999999;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 16px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: #333;
  font-size: 20px;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  &:hover {
    background-color: #f5f5f5;
    color: #333;
  }
`;

const ModalBody = styled.div`
  line-height: 1.6;
  color: #555;

  h3 {
    color: #333;
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 16px;
  }

  p {
    margin-bottom: 12px;
  }

  ul {
    margin-bottom: 12px;
    padding-left: 20px;
  }

  li {
    margin-bottom: 6px;
  }

  strong {
    color: #333;
  }
`;

const VisualExample = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  border-left: 4px solid #007bff;
`;

const DistanceBar = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0;
  gap: 10px;
`;

const DistanceValue = styled.span`
  font-weight: bold;
  min-width: 30px;
  color: ${props => props.color || '#333'};
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 20px;
  background: #e9ecef;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: ${props => props.color};
  width: ${props => (props.value / 5) * 100}%;
  border-radius: 10px;
  transition: width 0.3s ease;
`;

const ScoreLabel = styled.span`
  font-size: 12px;
  color: #666;
  min-width: 80px;
`;

const ComparisonChart = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin: 20px 0;
`;

const ChartColumn = styled.div`
  flex: 1;
  text-align: center;
`;

const ChartBar = styled.div`
  width: 40px;
  height: ${props => props.height}px;
  background: ${props => props.color};
  margin: 0 auto 8px;
  border-radius: 4px;
  position: relative;

  &::after {
    content: '${props => props.value}';
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    font-weight: bold;
    color: #333;
  }
`;

const ChartLabel = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 4px;
`;

const ConceptImage = styled.img`
  width: 100%;
  max-width: 450px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: 16px 0;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

function WassersteinModal({ isOpen, onClose }) {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Wasserstein Distance란?</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <ModalBody>
          <p>
            <strong>Wasserstein Distance</strong>는 두 확률 분포 간의 거리를 측정하는 지표로,
            "Earth Mover's Distance"라고도 불립니다.
          </p>

          <VisualExample>
            <h4 style={{margin: '0 0 12px 0', color: '#333'}}>💡 간단한 비유</h4>
            <p style={{margin: '0', fontSize: '14px'}}>
              흙더미를 옮기는 데 드는 최소 비용으로 생각해보세요.
              AI의 답변(흙더미 A)을 정답(흙더미 B)과 같은 모양으로 만들려면 얼마나 많은 작업이 필요할까요?
            </p>
          </VisualExample>

          <ConceptImage
            src={wassersteinImage}
            alt="Wasserstein Distance 개념 설명"
          />

          <h3>📊 값의 의미</h3>
          <VisualExample>
            <p style={{margin: '0 0 8px 0', fontSize: '14px'}}>
              <strong>낮은 값 (0에 가까움)</strong>: 두 분포가 매우 비슷함 → AI 성능이 우수
            </p>
            <p style={{margin: '0', fontSize: '14px'}}>
              <strong>높은 값</strong>: 두 분포가 많이 다름 → AI 성능 개선 필요
            </p>
          </VisualExample>

          <h3>🎯 카테고리별 성능 비교 예시</h3>
          <ComparisonChart>
            <ChartColumn>
              <ChartBar height={30} color="#6f803c" value="0.8" />
              <ChartLabel>문화적<br/>적절성</ChartLabel>
            </ChartColumn>
            <ChartColumn>
              <ChartBar height={60} color="#4f8f8c" value="1.5" />
              <ChartLabel>시각적<br/>세부사항</ChartLabel>
            </ChartColumn>
            <ChartColumn>
              <ChartBar height={90} color="#d987a2" value="2.3" />
              <ChartLabel>환각</ChartLabel>
            </ChartColumn>
          </ComparisonChart>

          <VisualExample>
            <h4 style={{margin: '0 0 8px 0', color: '#333'}}>🔍 실제 활용</h4>
            <ul style={{margin: '0', paddingLeft: '20px', fontSize: '14px'}}>
              <li><strong>모델 성능 추적</strong>: 시간에 따른 개선도 모니터링</li>
              <li><strong>약점 파악</strong>: 어떤 영역에서 실수가 많은지 확인</li>
              <li><strong>비교 분석</strong>: 여러 AI 모델 간 성능 비교</li>
            </ul>
          </VisualExample>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}

export default WassersteinModal;