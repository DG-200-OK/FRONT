import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CommonHeader from "@/components/CommonHeader";
import MypageLayout from "@/layouts/MypageLayout";
import axiosInstance from "@/axiosInstance";
import { transformImageUrl } from "@/utils";
import LazyImage from "@/components/LazyImage";

const SurveyParticipation = () => {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axiosInstance.get("/api/auth/me", {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          withCredentials: true,
        });

        console.log("userResponse.data: ", userResponse.data);

        setResponses(userResponse.data?.responseData?.participatedSurvey ?? []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setResponses([]);
      }
    };

    fetchData();
  }, []);

  const responseArray = Array.isArray(responses) ? responses : [];

  return (
    <MypageLayout>
      <Wrapper>
        <CommonHeader />
        <Container>
          <h2>나의 설문 응답 현황</h2>

          <ParticipatedSection>
            <h3>
              <span role="img" aria-label="pushpin">
                📌
              </span>{" "}
              참여한 설문 목록
            </h3>
            <p>총 참여 설문 수: {responseArray.length}</p>
            {responseArray.length === 0 ? (
              <p>아직 참여한 설문이 없습니다.</p>
            ) : (
              <SurveyList>
                {responseArray.map((s, index) => (
                  <SurveyCard key={index}>
                    <LazyImage src={transformImageUrl(s.imageUrl)} alt={s.title} />
                    <div>
                      <strong>{`${s.country} > ${s.category} > ${s.title}`}</strong>
                    </div>
                  </SurveyCard>
                ))}
              </SurveyList>
            )}
          </ParticipatedSection>
        </Container>
      </Wrapper>
    </MypageLayout>
  );
};

export default SurveyParticipation;

const Wrapper = styled.div`
  padding: 20px;
`;
const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;
const ParticipatedSection = styled.div`
  margin-top: 40px;
`;
const SurveyList = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;
const SurveyCard = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 12px;

  /* LazyImage 스타일링 */
  .lazy-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 6px;
    flex-shrink: 0;
  }

  strong {
    font-size: 16px;
  }
`;
