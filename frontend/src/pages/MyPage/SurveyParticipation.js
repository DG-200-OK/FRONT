import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import CommonHeader from "@/components/CommonHeader";
import MypageLayout from "@/layouts/MypageLayout";
import axiosInstance from "@/axiosInstance";

const COLORS = ["#0088FE", "#FF8042"];

const SurveyParticipation = () => {
  const [responses, setResponses] = useState([]);
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, surveysResponse] = await Promise.all([
          axiosInstance.get("/api/auth/me", {
            headers: { Accept: "application/json", "ngrok-skip-browser-warning": "true" },
            withCredentials: true,
          }),
          axiosInstance.get("/api/surveys", {
            headers: { Accept: "application/json", "ngrok-skip-browser-warning": "true" },
            withCredentials: true,
          }),
        ]);

        // console.log("userResponse.data: ", userResponse.data);
        // console.log("surveysResponse.data: ", surveysResponse.data);

        setResponses(userResponse.data?.responseData?.participatedSurvey ?? []);
        setSurveys(surveysResponse.data?.responseData ?? []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setResponses([]);
        setSurveys([]);
      }
    };

    fetchData();
  }, []);

  const surveyArray = Array.isArray(surveys) ? surveys : [];
  const responseArray = Array.isArray(responses) ? responses : [];

  const surveyMap = new Map(
    surveyArray.map((s) => [String(s?.surveyId), s])
  );

  const participatedSurveys = responseArray
    .map((r) => surveyMap.get(String(r?.surveyId)))
    .filter(Boolean);

  const countryGroups = {};
  surveyArray.forEach((s) => {
    const c = s?.country ?? "Unknown";
    if (!countryGroups[c]) countryGroups[c] = { total: 0, participated: 0 };
    countryGroups[c].total += 1;
  });

  responseArray.forEach((r) => {
    const s = surveyMap.get(String(r?.surveyId));
    if (s) countryGroups[s.country].participated += 1;
  });

  const countryCharts = Object.entries(countryGroups).map(([country, stats]) => ({
    country,
    data: [
      { name: "응답", value: stats.participated },
      { name: "미응답", value: stats.total - stats.participated },
    ],
  }));

  return (
    <MypageLayout>
      <Wrapper>
        <CommonHeader />
        <Container>
          <h2>나의 설문 응답 현황</h2>

          <ChartRow>
            {countryCharts.map((chart, index) => (
              <ChartBox key={index}>
                <h4>{chart.country}</h4>
                <PieChart width={200} height={200}>
                  <Pie data={chart.data} dataKey="value" outerRadius={80} label>
                    {chart.data.map((_, i) => (
                      <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ChartBox>
            ))}
          </ChartRow>

          <ParticipatedSection>
            <h3><span role="img" aria-label="pushpin">📌</span> 참여한 설문 목록</h3>
            <p>총 참여 설문 수: {participatedSurveys.length}</p>
            {participatedSurveys.length === 0 ? (
              <p>아직 참여한 설문이 없습니다.</p>
            ) : (
              <SurveyList>
                {participatedSurveys.map((s) => {
                  const matched = responseArray.find((r) => String(r?.surveyId) === String(s?.surveyId));
                  const answeredCount = matched?.answers?.length ?? matched?.answerCount ?? 0;

                  return (
                    <SurveyCard key={s.surveyId}>
                      <img src={s.imageUrl} alt={s.title} />
                      <div>
                        <strong>{`${s.country} > ${s.category} > ${s.title}`}</strong>
                        <p>응답한 문항 수: {answeredCount}</p>
                      </div>
                    </SurveyCard>
                  );
                })}
              </SurveyList>
            )}
          </ParticipatedSection>
        </Container>
      </Wrapper>
    </MypageLayout>
  );
};

export default SurveyParticipation;

const Wrapper = styled.div`padding: 20px;`;
const Container = styled.div`max-width: 1100px; margin: 0 auto;`;
const ChartRow = styled.div`
  display: flex; justify-content: space-around; flex-wrap: wrap;
  gap: 40px; margin-top: 20px; margin-bottom: 60px;
`;
const ChartBox = styled.div`text-align: center;`;
const ParticipatedSection = styled.div`margin-top: 60px;`;
const SurveyList = styled.div`
  margin-top: 10px; display: flex; flex-direction: column; gap: 14px;
`;
const SurveyCard = styled.div`
  display: flex; gap: 14px; align-items: center; border: 1px solid #ddd;
  border-radius: 10px; padding: 12px;
  img { width: 60px; height: 60px; object-fit: cover; border-radius: 6px; }
  strong { font-size: 16px; }
  p { margin: 4px 0 0; font-size: 14px; color: #555; }
`;
