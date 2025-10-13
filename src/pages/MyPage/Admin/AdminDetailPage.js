import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import MypageLayout from "@/layouts/MypageLayout";
import axiosInstance from "@/axiosInstance";
import { transformImageUrl } from "@/utils";

const Content = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 15px;
  font-size: 14px;
  min-height: 600px;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  justify-items: center;
`;

const ChartWrapper = styled.div`
  text-align: center;
`;

const DetailRow = styled.div`
  display: flex;
  margin-top: 40px;
  align-items: flex-start;
  padding-bottom: 30px;
`;

const TextBlock = styled.div`
  flex: 2;
`;

const ImageBlock = styled.div`
  flex: 1;
`;

const DetailTitle = styled.h3`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 8px;
`;

const DetailSubtitle = styled.p`
  font-size: 14px;
  margin-bottom: 16px;
`;

const CaptionItem = styled.p`
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 8px;
`;

const Image = styled.img`
  width:300px;
  height:300px;
  border-radius: 10px;
  object-fit: cover;
`;

const COLORS = ["#8884d8", "#8dd1e1", "#82ca9d", "#ffc658", "#ff7f50"];

const ExportWrapper = styled.div`
  position: relative;
  display: inline-block;
  overflow: visible;
  z-index: 1;
`;

const ExportButton = styled.button`
  background-color: #4a82d9;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  z-index: 2;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  z-index: 3;
  min-width: 150px;
`;

const DropdownItem = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const AdminDetailPage = () => {
  const { id } = useParams();
  const [survey, setSurvey] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchSurveyDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/surveys/${id}`, {
          headers: { "ngrok-skip-browser-warning": "true" },
          withCredentials: true,
        });

        const raw = response.data?.responseData ?? response.data ?? {};
        const captions = Array.isArray(raw.captions) ? raw.captions : [];

        const mockVotes = captions.reduce((acc, _, i) => {
          acc[i] = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }; 
          return acc;
        }, {});

        const normalized = {
          surveyId: raw.surveyId ?? raw.id ?? Number(id),
          title: raw.title ?? raw.entityName ?? "",
          country: raw.country ?? "",
          category: raw.category ?? "",
          imageUrl: raw.imageUrl ?? "",
          captions,
          votes: raw.votes ?? mockVotes,
        };

        setSurvey(normalized);
      } catch (err) {
        console.error("설문 세부 정보 불러오기 실패:", err);
        setSurvey(null);
      }
    };

    fetchSurveyDetails();
  }, [id]);

  const formatChartData = (votesObj) =>
    [1, 2, 3, 4, 5].map((score) => ({
      name: `${score}점`,
      value: votesObj?.[score] ?? 0,
    }));

  const exportData = (type) => {
    if (!survey) return;

    const exportObj = {
      country: survey.country,
      category: survey.category,
      title: survey.title,
      captions: survey.captions ?? [],
      votes: survey.votes ?? {},
    };

    if (type === "json") {
      const blob = new Blob([JSON.stringify(exportObj, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `survey_${survey.surveyId}.json`;
      a.click();
    } else if (type === "csv") {
      let csv = "캡션,1점,2점,3점,4점,5점\n";
      (survey.captions ?? []).forEach((caption, i) => {
        const v = survey.votes?.[i] ?? {};
        csv += `${caption},${v[1] ?? 0},${v[2] ?? 0},${v[3] ?? 0},${v[4] ?? 0},${v[5] ?? 0}\n`;
      });
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `survey_${survey.surveyId}.csv`;
      a.click();
    }

    setShowDropdown(false);
  };

  if (!survey) return <p>설문 정보를 불러오는 중...</p>;

  return (
    <MypageLayout>
      <Content>
        <TitleRow>
          <SectionTitle>캡션별 응답 분포</SectionTitle>
          <ExportWrapper>
            <ExportButton onClick={() => setShowDropdown(!showDropdown)}>
              내보내기 ⬇
            </ExportButton>
            {showDropdown && (
              <Dropdown>
                <DropdownItem onClick={() => exportData("csv")}>CSV로 내보내기</DropdownItem>
                <DropdownItem onClick={() => exportData("json")}>JSON으로 내보내기</DropdownItem>
              </Dropdown>
            )}
          </ExportWrapper>
        </TitleRow>

        <DetailRow>
          <ImageBlock>
            <Image src={transformImageUrl(survey.imageUrl)} alt="entity" />
          </ImageBlock>
          <TextBlock>
            <DetailTitle>{survey.title}</DetailTitle>
            <DetailSubtitle>
              {survey.country} / {survey.category}
            </DetailSubtitle>
            {survey.captions.map((cap, i) => (
              <CaptionItem key={cap.captionId ?? i}>
                - {cap.text}
              </CaptionItem>
            ))}
          </TextBlock>
        </DetailRow>

        <ChartGrid>
          {survey.captions.map((cap, idx) => (
            <ChartWrapper key={cap.captionId ?? idx}>
              <h4>{cap.text}</h4>
              <ResponsiveContainer width={180} height={180}>
                <PieChart>
                  <Pie
                    data={formatChartData(survey.votes?.[idx] ?? {})}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={70}
                    label
                  >
                    {formatChartData(survey.votes?.[idx] ?? {}).map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartWrapper>
          ))}

        </ChartGrid>
      </Content>
    </MypageLayout>
  );
};

export default AdminDetailPage;