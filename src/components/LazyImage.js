import React, { useState } from 'react';
import { transformImageUrl, createWebPUrl, supportsWebP } from '../utils';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const Skeleton = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !['width', 'height', 'borderRadius', 'marginRight'].includes(prop),
})`
  width: ${props => props.width || '90px'};
  height: ${props => props.height || '90px'};
  border-radius: ${props => props.borderRadius || '10px'};
  margin-right: ${props => props.marginRight || '20px'};
  background: linear-gradient(to right, #eee 20%, #ddd 50%, #eee 80%);
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite linear;
`;

const Img = styled.img.withConfig({
  shouldForwardProp: (prop) =>
    !['width', 'height', 'borderRadius', 'marginRight'].includes(prop),
})`
  width: ${props => props.width || '90px'};
  height: ${props => props.height || '90px'};
  border-radius: ${props => props.borderRadius || '10px'};
  object-fit: cover;
  margin-right: ${props => props.marginRight || '20px'};
`;

const LazyImage = ({ src, alt, width, height, borderRadius, marginRight, className, style }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [tryWebP, setTryWebP] = useState(true);
  const [imageError, setImageError] = useState(false);

  const originalUrl = transformImageUrl(src);
  const webpUrl = createWebPUrl(src);

  // Decide which URL to use
  const shouldUseWebP = supportsWebP && tryWebP && webpUrl !== originalUrl;
  const imageUrl = shouldUseWebP ? webpUrl : originalUrl;


  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    if (shouldUseWebP && tryWebP) {
      // If WebP failed, try original format
      setTryWebP(false);
      setIsLoading(true);
      setImageError(false);
    } else {
      // Original format also failed
      setIsLoading(false);
      setImageError(true);
    }
  };

  return (
    <>
      {isLoading && !imageError && (
        <Skeleton
          width={width}
          height={height}
          borderRadius={borderRadius}
          marginRight={marginRight}
        />
      )}
      {!imageError && (
        <Img
          key={imageUrl} // Force re-render when URL changes
          src={imageUrl}
          alt={alt}
          width={width}
          height={height}
          borderRadius={borderRadius}
          marginRight={marginRight}
          className={className}
          onLoad={handleLoad}
          onError={handleError}
          loading="eager" // Change from lazy to eager for immediate loading
          decoding="async" // Enable async decoding for better performance
          style={{
            display: isLoading ? 'none' : 'block',
            transition: 'opacity 0.3s ease-in-out',
            opacity: isLoading ? 0 : 1,
            ...style
          }}
        />
      )}
      {imageError && (
        <div style={{
          width: width || '90px',
          height: height || '90px',
          borderRadius: borderRadius || '10px',
          marginRight: marginRight || '20px',
          backgroundColor: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#999',
          fontSize: '12px'
        }}>
          이미지 오류
        </div>
      )}
    </>
  );
};

export default LazyImage;