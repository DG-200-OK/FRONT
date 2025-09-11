import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const Skeleton = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 10px;
  margin-right: 20px;
  background: linear-gradient(to right, #eee 20%, #ddd 50%, #eee 80%);
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite linear;
`;

const Img = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
`;

const LazyImage = ({ src, alt }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Skeleton />}
      <Img
        src={src}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        style={{ display: isLoading ? 'none' : 'block' }}
      />
    </>
  );
};

export default LazyImage;