import axios from 'axios';

// ✅ .env.local에서 환경 변수 가져오기
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// ✅ 크롤러 API 호출 함수
export async function searchCrawler(keyword) {
  const response = await axios.post(`${API_URL}/api/crawler/search`, {
    keyword: keyword,
  });
  return response.data;
}
