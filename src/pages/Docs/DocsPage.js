import React from "react";
import styled from "styled-components";
import CommonHeader from "../../components/CommonHeader";

const DocsContainer = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 40px;
`;

const ApiSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ApiTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Method = styled.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;

  &.get {
    background-color: #e3f2fd;
    color: #1976d2;
  }

  &.post {
    background-color: #e8f5e8;
    color: #2e7d32;
  }
`;

const Endpoint = styled.code`
  background-color: #f5f5f5;
  padding: 8px 12px;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
  margin-left: 10px;
`;

const Description = styled.p`
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
`;

const SubSection = styled.div`
  margin-bottom: 20px;
`;

const SubTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const CodeBlock = styled.pre`
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  padding: 16px;
  overflow-x: auto;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 13px;
  line-height: 1.4;
  color: #333;
`;

const ParamTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
`;

const TableHeader = styled.th`
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  padding: 12px;
  text-align: left;
  font-weight: bold;
  color: #495057;
`;

const TableCell = styled.td`
  border: 1px solid #dee2e6;
  padding: 12px;
  color: #495057;
`;

const DocsPage = () => {
  return (
    <DocsContainer>
      <CommonHeader />
      <Content>
        <Title>API Documentation</Title>
        <Subtitle>
          Complete API reference for the Culture Survey Application
        </Subtitle>

        <ApiSection>
          <ApiTitle>
            <Method className="get">GET</Method>
            <Endpoint>/api/chart</Endpoint>
          </ApiTitle>
          <Description>
            Retrieve chart data with pagination, search, and category filtering capabilities.
          </Description>

          <SubSection>
            <SubTitle>Request Headers</SubTitle>
            <ParamTable>
              <thead>
                <tr>
                  <TableHeader>Header</TableHeader>
                  <TableHeader>Type</TableHeader>
                  <TableHeader>Required</TableHeader>
                  <TableHeader>Description</TableHeader>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <TableCell>page</TableCell>
                  <TableCell>number</TableCell>
                  <TableCell>Yes</TableCell>
                  <TableCell>Page number for pagination</TableCell>
                </tr>
                <tr>
                  <TableCell>category</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>No</TableCell>
                  <TableCell>Filter by category (Architecture, Clothing, Cuisine, Game, Tool)</TableCell>
                </tr>
                <tr>
                  <TableCell>Accept</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>Yes</TableCell>
                  <TableCell>application/json</TableCell>
                </tr>
                <tr>
                  <TableCell>ngrok-skip-browser-warning</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>Yes</TableCell>
                  <TableCell>true</TableCell>
                </tr>
              </tbody>
            </ParamTable>
          </SubSection>

          <SubSection>
            <SubTitle>Query Parameters</SubTitle>
            <ParamTable>
              <thead>
                <tr>
                  <TableHeader>Parameter</TableHeader>
                  <TableHeader>Type</TableHeader>
                  <TableHeader>Required</TableHeader>
                  <TableHeader>Description</TableHeader>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <TableCell>search</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>No</TableCell>
                  <TableCell>Search query string</TableCell>
                </tr>
              </tbody>
            </ParamTable>
          </SubSection>

          <SubSection>
            <SubTitle>Response</SubTitle>
            <CodeBlock>{`{
  "success": true,
  "responseData": [
    {
      "captionId": "string",
      "title": "string",
      "imageUrl": "string",
      "content": "string",
      "chartdata": {
        "cultural": {
          "people": [number],
          "agent": [number]
        },
        "visual": {
          "people": [number],
          "agent": [number]
        },
        "hallucination": {
          "people": [number],
          "agent": [number]
        }
      }
    }
  ],
  "totalPage": number
}`}</CodeBlock>
          </SubSection>
        </ApiSection>

        <ApiSection>
          <ApiTitle>
            <Method className="get">GET</Method>
            <Endpoint>/api/chart/:id</Endpoint>
          </ApiTitle>
          <Description>
            Get specific chart data by ID for detailed view.
          </Description>

          <SubSection>
            <SubTitle>Path Parameters</SubTitle>
            <ParamTable>
              <thead>
                <tr>
                  <TableHeader>Parameter</TableHeader>
                  <TableHeader>Type</TableHeader>
                  <TableHeader>Required</TableHeader>
                  <TableHeader>Description</TableHeader>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <TableCell>id</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>Yes</TableCell>
                  <TableCell>Chart ID</TableCell>
                </tr>
              </tbody>
            </ParamTable>
          </SubSection>

          <SubSection>
            <SubTitle>Request Headers</SubTitle>
            <ParamTable>
              <thead>
                <tr>
                  <TableHeader>Header</TableHeader>
                  <TableHeader>Type</TableHeader>
                  <TableHeader>Required</TableHeader>
                  <TableHeader>Description</TableHeader>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <TableCell>Accept</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>Yes</TableCell>
                  <TableCell>application/json</TableCell>
                </tr>
                <tr>
                  <TableCell>ngrok-skip-browser-warning</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>Yes</TableCell>
                  <TableCell>true</TableCell>
                </tr>
              </tbody>
            </ParamTable>
          </SubSection>

          <SubSection>
            <SubTitle>Response</SubTitle>
            <CodeBlock>{`{
  "success": true,
  "responseData": {
    "title": "string",
    "imageUrl": "string",
    "content": "string",
    "chartdata": {
      "cultural": {
        "people": [number],
        "agent": [number]
      },
      "visual": {
        "people": [number],
        "agent": [number]
      },
      "hallucination": {
        "people": [number],
        "agent": [number]
      }
    }
  }
}`}</CodeBlock>
          </SubSection>
        </ApiSection>

        <ApiSection>
          <ApiTitle>
            <Method className="post">POST</Method>
            <Endpoint>/api/upload</Endpoint>
          </ApiTitle>
          <Description>
            Upload image files to the server. Images are automatically converted to WebP format.
          </Description>

          <SubSection>
            <SubTitle>Request Headers</SubTitle>
            <ParamTable>
              <thead>
                <tr>
                  <TableHeader>Header</TableHeader>
                  <TableHeader>Type</TableHeader>
                  <TableHeader>Required</TableHeader>
                  <TableHeader>Description</TableHeader>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <TableCell>ngrok-skip-browser-warning</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>Yes</TableCell>
                  <TableCell>true</TableCell>
                </tr>
              </tbody>
            </ParamTable>
          </SubSection>

          <SubSection>
            <SubTitle>Request Body (FormData)</SubTitle>
            <ParamTable>
              <thead>
                <tr>
                  <TableHeader>Field</TableHeader>
                  <TableHeader>Type</TableHeader>
                  <TableHeader>Required</TableHeader>
                  <TableHeader>Description</TableHeader>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <TableCell>file</TableCell>
                  <TableCell>File</TableCell>
                  <TableCell>Yes</TableCell>
                  <TableCell>Image file to upload (converted to WebP)</TableCell>
                </tr>
              </tbody>
            </ParamTable>
          </SubSection>

          <SubSection>
            <SubTitle>Response</SubTitle>
            <CodeBlock>{`{
  "success": true,
  "message": "File uploaded successfully",
  "filename": "string"
}`}</CodeBlock>
          </SubSection>
        </ApiSection>

        <ApiSection>
          <ApiTitle>
            <Method className="post">POST</Method>
            <Endpoint>/api/surveys/register</Endpoint>
          </ApiTitle>
          <Description>
            Register a new survey with image, metadata, and multiple captions.
          </Description>

          <SubSection>
            <SubTitle>Request Headers</SubTitle>
            <ParamTable>
              <thead>
                <tr>
                  <TableHeader>Header</TableHeader>
                  <TableHeader>Type</TableHeader>
                  <TableHeader>Required</TableHeader>
                  <TableHeader>Description</TableHeader>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <TableCell>Content-Type</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>Yes</TableCell>
                  <TableCell>application/json</TableCell>
                </tr>
                <tr>
                  <TableCell>ngrok-skip-browser-warning</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>Yes</TableCell>
                  <TableCell>true</TableCell>
                </tr>
                <tr>
                  <TableCell>user-id</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>Yes</TableCell>
                  <TableCell>User ID from localStorage</TableCell>
                </tr>
              </tbody>
            </ParamTable>
          </SubSection>

          <SubSection>
            <SubTitle>Request Body (JSON)</SubTitle>
            <CodeBlock>{`{
  "imageFile": "string",           // filename from upload API
  "country": "string",            // 한국, 일본, 중국
  "category": "string",           // Architecture, Clothing, Cuisine, Game, Tool
  "title": "string",              // survey title/proper noun
  "caption": ["string", ...]      // array of caption strings
}`}</CodeBlock>
          </SubSection>

          <SubSection>
            <SubTitle>Response</SubTitle>
            <CodeBlock>{`{
  "success": true,
  "message": "Survey registered successfully",
  "surveyId": "string"
}`}</CodeBlock>
          </SubSection>
        </ApiSection>

        <ApiSection>
          <SubTitle>Base URL Configuration</SubTitle>
          <Description>
            The application uses different base URLs for different environments:
          </Description>
          <CodeBlock>{`Development Proxy: https://culbackend.ngrok.dev
Upload/Register Endpoint: https://publicly-flying-crane.ngrok-free.app

All requests include withCredentials: true for authentication.`}</CodeBlock>
        </ApiSection>

        <ApiSection>
          <SubTitle>Error Handling</SubTitle>
          <Description>
            All API endpoints return standard error responses:
          </Description>
          <CodeBlock>{`{
  "success": false,
  "message": "Error description",
  "detail": "Detailed error information"
}`}</CodeBlock>
        </ApiSection>
      </Content>
    </DocsContainer>
  );
};

export default DocsPage;