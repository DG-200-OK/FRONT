import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Legend,
} from "recharts";
import styled from "styled-components";
import { linearRegression, linearRegressionLine } from "simple-statistics";
import "../LineChart/DetailLineChart.css";

const FilterDescription = styled.span`
  font-size: 12px;
  color: #666;
  margin-bottom: 5px;
  display: block;
  text-align: right;
`;

const ChartTitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

function AIPerformanceChart({
  title,
  data,
  color,
  selectedDataCount,
  onDataCountChange,
}) {
  const filterOptions = [300, 500, 1000];

  const getFilteredDataCount = () => {
    return Math.min(Math.floor((selectedDataCount - 1) / 50) + 1, data.length);
  };

  const filteredDataCount = getFilteredDataCount();
  const transformedData = data
    .slice(0, filteredDataCount)
    .map((item, index) => ({
      ...item,
      index: (index + 1) * 50,
    }));

  const calculateYAxisDomain = (data) => {
    if (!data || data.length === 0) return [0, 5];
    const values = data.map((item) => item.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const range = maxValue - minValue;
    const padding = Math.max(range * 0.1, 0.01);
    const yMin = Math.max(0, minValue - padding);
    const yMax = maxValue + padding;
    return [Number(yMin.toFixed(3)), Number(yMax.toFixed(3))];
  };

  const generateYTicks = (domain) => {
    const [min, max] = domain;
    const range = max - min;
    let tickCount = 6;
    let step = range / (tickCount - 1);

    if (step < 0.001) step = 0.001;
    else if (step < 0.01) step = Math.ceil(step * 1000) / 1000;
    else if (step < 0.1) step = Math.ceil(step * 100) / 100;
    else step = Math.ceil(step * 10) / 10;

    const ticks = [];
    for (let i = 0; i < tickCount; i++) {
      const tick = min + step * i;
      if (tick <= max) {
        ticks.push(Number(tick.toFixed(3)));
      }
    }
    if (ticks[ticks.length - 1] < max) {
      ticks.push(Number(max.toFixed(3)));
    }
    return ticks;
  };

  const yDomain = calculateYAxisDomain(transformedData);
  const yTicks = generateYTicks(yDomain);

  const trendlineData = (() => {
    if (transformedData.length < 2) return [];
    const regressionData = transformedData.map((d) => [d.index, d.value]);
    const regression = linearRegression(regressionData);
    const regressionLine = linearRegressionLine(regression);
    return transformedData.map((d) => ({
      ...d,
      trendline: regressionLine(d.index),
    }));
  })();

  const tickStep = selectedDataCount >= 1000 ? 200 : 50;
  const numTicks = Math.floor(selectedDataCount / tickStep);
  const xTicks = Array.from({ length: numTicks }, (_, i) => (i + 1) * tickStep);

  return (
    <div className="line-chart-card">
      <div className="chart-header">
        <ChartTitleContainer>
          <h3 className="chart-title">{title}</h3>
        </ChartTitleContainer>

        <div className="chart-controls">
          <div className="filter-group">
            <FilterDescription>수집된 응답 데이터 개수</FilterDescription>
            <div className="chart-filters">
              {filterOptions.map((count) => (
                <button
                  key={count}
                  className={`filter-btn ${
                    selectedDataCount === count ? "active" : ""
                  }`}
                  onClick={() => onDataCountChange(count)}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            data={trendlineData}
            margin={{ top: 20, right: 20, left: 10, bottom: 5 }}
          >
            <XAxis
              dataKey="index"
              type="number"
              scale="linear"
              domain={[50, selectedDataCount]}
              ticks={xTicks}
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: "#e0e0e0" }}
            />
            <YAxis
              domain={yDomain}
              ticks={yTicks}
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.toFixed(3)}
            />
            <Tooltip
              labelFormatter={(value) => `응답개수 ${value}`}
              formatter={(value, name) => [
                value.toFixed(3),
                name === "value" ? title : "추세선",
              ]}
            />
            <Legend />
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.1} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Line
              type="monotone"
              dataKey="value"
              name={title}
              stroke={color}
              strokeWidth={data.length <= 1 ? 0 : 2.5}
              strokeDasharray={data.length <= 1 ? "0 0" : "5 5"}
              dot={
                data.length <= 5
                  ? {
                      r: data.length <= 1 ? 8 : 6,
                      fill: color,
                      strokeWidth: 2,
                      stroke: "#fff",
                    }
                  : false
              }
              activeDot={{
                r: data.length <= 1 ? 10 : 5,
                strokeWidth: 2,
                fill: "#fff",
              }}
            />
            <Line
              type="monotone"
              dataKey="trendline"
              name="추세선"
              stroke="#9966FF"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AIPerformanceChart;
