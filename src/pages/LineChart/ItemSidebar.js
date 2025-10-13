import React, { useState } from "react";
import "./ItemSidebar.css";
import LazyImage from "../../components/LazyImage";
import WassersteinModal from "../../components/WassersteinModal";
import styled from "styled-components";

const ExplanationButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  margin-top: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);

  &:hover {
    background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

function ItemSidebar({ item }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!item) {
    return <aside className="item-sidebar">데이터를 불러오는 중...</aside>;
  }
  return (
    <aside className="item-sidebar">
      <div className="item-card">
        <LazyImage
          src={item.imageUrl}
          alt={item.title}
          width="100%"
          height="150px"
          borderRadius="0"
          marginRight="0"
          className="item-image"
        />
        <div className="item-info">
          <span className="item-title">{item.title}</span>
          <button className="item-button">{item.title}</button>
          <ExplanationButton onClick={() => setIsModalOpen(true)}>
            📊 지표 설명 보기
          </ExplanationButton>
        </div>
      </div>

      <WassersteinModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </aside>
  );
}

export default ItemSidebar;
