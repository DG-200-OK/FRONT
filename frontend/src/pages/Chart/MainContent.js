import React from "react";
import EvaluationCard from "./EvaluationCard";
import "./MainContent.css";

// 이미지에 있는 6개의 카드를 만들기 위한 임시 데이터
const mockData = [
  {
    id: 1,
    title: "불고기",
    imageUrl:
      "https://images.unsplash.com/photo-1604009506637-56503615f523?w=400&h=400&fit=crop",
    chartData: {
      labels: ["Cultural", "visual", "hallucination"],
      people: [4.2, 3.8, 3.5],
      agent: [4.5, 5, 4.8],
    },
  },
  {
    id: 2,
    title: "비빔밥",
    imageUrl:
      "https://images.unsplash.com/photo-1576023300000-000000000000?w=400&h=400&fit=crop",
    chartData: {
      labels: ["Cultural", "visual", "hallucination"],
      people: [3.0, 4.5, 2.1],
      agent: [2.8, 3.9, 4.1],
    },
  },
  {
    id: 3,
    title: "김치",
    imageUrl:
      "https://images.unsplash.com/photo-1546458855-342dcd636183?w=400&h=400&fit=crop",
    chartData: {
      labels: ["Cultural", "visual", "hallucination"],
      people: [1.5, 2.0, 4.0],
      agent: [3.5, 4.2, 1.8],
    },
  },
  {
    id: 4,
    title: "한복",
    imageUrl:
      "https://images.unsplash.com/photo-1581092910000-000000000000?w=400&h=400&fit=crop",
    chartData: {
      labels: ["Cultural", "visual", "hallucination"],
      people: [5.0, 1.0, 3.2],
      agent: [1.2, 2.5, 4.9],
    },
  },
  {
    id: 5,
    title: "경복궁",
    imageUrl:
      "https://images.unsplash.com/photo-1590000000000-000000000000?w=400&h=400&fit=crop",
    chartData: {
      labels: ["Cultural", "visual", "hallucination"],
      people: [2.5, 3.0, 1.0],
      agent: [4.0, 1.5, 3.0],
    },
  },
  {
    id: 6,
    title: "만리장성",
    imageUrl:
      "https://images.unsplash.com/photo-1500000000000-000000000000?w=400&h=400&fit=crop",
    chartData: {
      labels: ["Cultural", "visual", "hallucination"],
      people: [3.8, 2.2, 4.5],
      agent: [1.0, 5.0, 2.0],
    },
  },
];

const cardList = mockData;

function MainContent() {
  return (
    <main className="main-content">
      {cardList.map((data) => (
        <EvaluationCard key={data.id} data={data} />
      ))}
    </main>
  );
}

export default MainContent;
