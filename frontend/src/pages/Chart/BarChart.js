import React from "react";
import "./BarChart.css";

// 차트의 최대값 (Y축)
const MAX_VALUE = 5;

function BarChart({ title, theme, data }) {
  const { labels, human, ai } = data;

  // 값(0~5)을 퍼센트 높이(0~100%)로 변환하는 헬퍼 함수
  const getBarHeight = (value) => (value / MAX_VALUE) * 100 + "%";

  return (
    <div className="chart-container">
      <h5 className="chart-title">{title}</h5>

      {/* 차트 상단 범례 */}
      <div className="chart-legend">
        <div className="legend-item">
          <span className={`legend-dot human ${theme}`}></span>
          사람 평가
        </div>
        <div className="legend-item">
          <span className={`legend-dot ai ${theme}`}></span>
          AI 평가
        </div>
      </div>

      {/* 차트 본체 (Y축 + 바 그룹) */}
      <div className="chart-body">
        {/* Y축 레이블 */}
        <div className="y-axis">
          <span>5</span>
          <span>4</span>
          <span>3</span>
          <span>2</span>
          <span>1</span>
        </div>

        {/* 바 그룹 */}
        <div className="chart-bars-area">
          {/* Y축 가로 점선 */}
          <div className="y-grid-lines">
            <div className="grid-line"></div>
            <div className="grid-line"></div>
            <div className="grid-line"></div>
            <div className="grid-line"></div>
          </div>

          {/* 실제 바 */}
          <div className="chart-bars">
            {labels.map((label, index) => (
              <div className="bar-group" key={label}>
                <div className="bars">
                  <div
                    className={`bar human ${theme}`}
                    style={{ height: getBarHeight(human[index]) }}
                  ></div>
                  <div
                    className={`bar ai ${theme}`}
                    style={{ height: getBarHeight(ai[index]) }}
                  ></div>
                </div>
                <span className="bar-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BarChart;
