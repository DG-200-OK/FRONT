import React from "react";
import "./BarChart.css";

const MAX_VALUE = 100;
const MIN_VALUE = 0;

function BarChart({ title, theme, data }) {
  const { human } = data;

  // ✅ 0~100 범위로 clamp (값이 0보다 작거나 100보다 큰 경우 보정)
  const clamp = (v) => Math.min(Math.max(v, MIN_VALUE), MAX_VALUE);

  // ✅ 퍼센트 변환
  const getBarHeight = (value) => `${(clamp(value) / MAX_VALUE) * 100}%`;

  return (
    <div className="chart-container">
      <h5 className="chart-title">{title}</h5>

      <div className="chart-body">
        {/* 왼쪽 Y축 */}
        <div className="y-axis">
          {[100, 80, 60, 40, 20, 0].map((v) => (
            <span key={v}>{v}</span>
          ))}
        </div>

        {/* 오른쪽 차트 본체 */}
        <div className="chart-bars-area">
          {/* Y축 그리드선 */}
          <div className="y-grid-lines">
            {[80, 60, 40, 20].map((v) => (
              <div key={v} className="grid-line" style={{ bottom: `${v}%` }}></div>
            ))}
          </div>

          {/* 막대 */}
          <div className="chart-bars">
            <div className="bar-group">
              <div className="bars single">
                <div
                  className={`bar human ${theme}`}
                  style={{ height: getBarHeight(human[0]) }}
                ></div>
              </div>
              {/* 값 표시 (선택 사항) */}
              <div className="bar-label">{clamp(human[0])}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BarChart;
