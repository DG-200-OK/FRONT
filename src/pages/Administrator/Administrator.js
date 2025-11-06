import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import AdministratorLayout from "@/layouts/AdministratorLayout";
import ChartPreview from "./ChartPreview";

const categories = ["architecture", "clothing", "cuisine", "tool"];

// 🔹 커스텀 화살표
const Arrow = ({ className, style, onClick, dir }) => (
  <ArrowBtn
    className={className}
    style={style}
    onClick={onClick}
    $dir={dir}
    aria-label={dir === "prev" ? "이전" : "다음"}
  >
    {dir === "prev" ? "‹" : "›"}
  </ArrowBtn>
);

// 🔹 슬라이더 설정
const sliderSettings = {
  arrows: true,
  dots: false,
  infinite: false,
  speed: 350,
  slidesToShow: 2,
  slidesToScroll: 2,
  variableWidth: false,
  centerMode: false,
  prevArrow: <Arrow dir="prev" />,
  nextArrow: <Arrow dir="next" />,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 2, slidesToScroll: 2 },
    },
    {
      breakpoint: 820,
      settings: { slidesToShow: 1, slidesToScroll: 1 },
    },
  ],
};

const Administrator = () => {
  return (
    <AdministratorLayout>
      {/* 🔹 상단 슬라이더 */}
      <TopCarousel>
        <StyledSlider {...sliderSettings}>
          {categories.map((cat) => (
            <div key={cat}>
              <CategoryCard>
                <CategoryTitle>{cat}</CategoryTitle>
                <ChartsRow>
                  <ChartPreview
                    title="Score A"
                    kor_title="깊이의 풍부함"
                    apiEndpoint={`/api/chart/${cat}/meaning`}
                  />
                  <ChartPreview
                    title="Score C"
                    kor_title="사실적 충실도"
                    apiEndpoint={`/api/chart/${cat}/clarity`}
                  />
                </ChartsRow>
              </CategoryCard>
            </div>
          ))}
        </StyledSlider>
      </TopCarousel>

      {/* 🔹 하단 테이블 */}
      <TableSection>
        <TableTitle>개별 데이터</TableTitle>
        <Table>
          <thead>
            <tr>
              <th>이미지</th>
              <th>데이터명</th>
              <th>Score A 일치율</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <ImageBox>이미지</ImageBox>
              </td>
              <td>
                <strong>불고기</strong>
                <SubText>국가: 한국 / 분류: cuisine</SubText>
              </td>
              <td>80%</td>
            </tr>
            <tr>
              <td>
                <ImageBox>이미지</ImageBox>
              </td>
              <td>
                <strong>김치</strong>
                <SubText>국가: 한국 / 분류: cuisine</SubText>
              </td>
              <td>45%</td>
            </tr>
          </tbody>
        </Table>
      </TableSection>
    </AdministratorLayout>
  );
};

export default Administrator;

/* ------------------- 스타일 ------------------- */
const TopCarousel = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 32px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
`;

const StyledSlider = styled(Slider)`
  width: 100%;
  .slick-list {
    overflow: hidden;
  }
  .slick-track {
    display: flex;
  }
  .slick-slide > div {
    padding: 0 12px;
    box-sizing: border-box;
  }
  .slick-prev,
  .slick-next {
    display: none !important;
  }
`;

const CategoryCard = styled.div`
  background: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: hidden;
  box-sizing: border-box;
  max-width: 100%;
`;

const CategoryTitle = styled.h4`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  text-transform: capitalize;
`;

const ChartsRow = styled.div`
  display: flex;
  gap: 12px;
  min-width: 0;
  flex-wrap: nowrap;
  justify-content: space-between;
`;

const ArrowBtn = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(p) => (p.$dir === "prev" ? "left: -12px;" : "right: -12px;")}
  z-index: 2;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  line-height: 32px;
  font-size: 22px;
`;

/* ---------- 하단 테이블 ---------- */
const TableSection = styled.div`
  width: 100%;
  max-width: 1133px;
  margin: 0 auto;
  background: #fff;
  padding: 20px 24px; /* ✅ 좌우 여백 추가 */
  border-radius: 12px;
  border: 1px solid #ddd;
  box-sizing: border-box; /* ✅ 전체 너비에 padding 포함 */
`;

const TableTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 15px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  table-layout: fixed; /* ✅ 셀 비율 균등하게 */

  th,
  td {
    text-align: center;
    vertical-align: middle;
    padding: 12px 10px;
    border-bottom: 1px solid #eee;
    word-wrap: break-word;
  }

  th {
    background: #f3f3f3;
    font-weight: 600;
    border-bottom: 1px solid #ddd;
  }

  /* ✅ 마지막 열 여백 보정 */
  tr > th:last-child,
  tr > td:last-child {
    padding-right: 20px;
  }
`;

const ImageBox = styled.div`
  width: 60px;
  height: 60px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #777;
  font-size: 14px;
  margin: 0 auto;
`;

const SubText = styled.div`
  font-size: 13px;
  color: #777;
`;
