import React from "react";
import "./BarChart.css";

// 차트의 최대값 (Y축)
const MAX_VALUE = 5;

function BarChart({ data }) {
  const { labels, people, agent } = data;

  // 값(0~5)을 퍼센트 높이(0~100%)로 변환하는 헬퍼 함수
  const getBarHeight = (value) => (value / MAX_VALUE) * 100 + "%";

  return (
    <div className="chart-container">
      {/* 차트 상단 범례 */}
      <div className="chart-legend">
        <div className="legend-item">
          <span className="legend-dot people"></span>
          people
        </div>
        <div className="legend-item">
          <span className="legend-dot agent"></span>
          agent
        </div>
      </div>

      {/* 차트 본체 (Y축 + 바 그룹) */}
      <div className="chart-body">
        {/* Y축 레이블 */}
        <div className="y-axis">
          <span>{MAX_VALUE}</span>
          <span>{Math.round(MAX_VALUE * 0.8)}</span>
          <span>{Math.round(MAX_VALUE * 0.6)}</span>
          <span>{Math.round(MAX_VALUE * 0.4)}</span>
          <span>{Math.round(MAX_VALUE * 0.2)}</span>
          <span>0</span>
        </div>

        {/* 바 그룹 */}
        <div className="chart-bars">
          {labels.map((label, index) => (
            <div className="bar-group" key={label}>
              <div className="bars">
                <div
                  className="bar people"
                  style={{ height: getBarHeight(people[index]) }}
                ></div>
                <div
                  className="bar agent"
                  style={{ height: getBarHeight(agent[index]) }}
                ></div>
              </div>
              <span className="bar-label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BarChart;
