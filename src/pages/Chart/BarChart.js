import React from "react";
import "./BarChart.css";

// 차트의 최대값 (Y축)
const MAX_VALUE = 100; // 0-100 스케일

function BarChart({ title, theme, data }) {
  const { labels, human, ai } = data;

  // 값(0~100)을 퍼센트 높이(0~100%)로 변환
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
        {/* Y축 레이블 (80, 60, 40, 20, 0) */}
        <div className="y-axis">
          <span>80</span>
          <span>60</span>
          <span>40</span>
          <span>20</span>
          <span>0</span>
        </div>

        {/* 바 그룹 */}
        <div className="chart-bars-area">
          {/* Y축 가로 점선 (위치 수동 지정) */}
          <div className="y-grid-lines">
            <div className="grid-line" style={{ bottom: "80%" }}></div>
            <div className="grid-line" style={{ bottom: "60%" }}></div>
            <div className="grid-line" style={{ bottom: "40%" }}></div>
            <div className="grid-line" style={{ bottom: "20%" }}></div>
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
