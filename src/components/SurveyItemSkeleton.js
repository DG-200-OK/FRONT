import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const SkeletonWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 12px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
`;

const SkeletonImage = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 10px;
  margin-right: 20px;
  background: linear-gradient(to right, #eee 20%, #ddd 50%, #eee 80%);
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite linear;
`;

const SkeletonContent = styled.div`
  flex: 1;
`;

const SkeletonText = styled.div`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '20px'};
  margin-bottom: 10px;
  border-radius: 4px;
  background: linear-gradient(to right, #eee 20%, #ddd 50%, #eee 80%);
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite linear;
`;

const SurveyItemSkeleton = () => (
  <SkeletonWrapper>
    <SkeletonImage />
    <SkeletonContent>
      <SkeletonText width="70%" height="24px" />
      <SkeletonText width="95%" height="16px" />
      <SkeletonText width="40%" height="20px" />
    </SkeletonContent>
  </SkeletonWrapper>
);

export default SurveyItemSkeleton;