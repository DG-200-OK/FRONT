import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

import Login from "@/pages/Login/Login";
import Signup from "@/pages/Signup/Signup";
import SignupID from "@/pages/Signup/SignupID";
import SignupSNS from "@/pages/Signup/SignupSNS";

import Main from "@/pages/Main/Main"; // ✅ Main만 남김

import Survey from "@/pages/Survey/Survey";
import SurveyDetail from "@/pages/Survey/SurveyDetail";
import SurveyStart from "@/pages/Survey/SurveyStart";

import MyPage from "@/pages/MyPage/MyPage";
import SurveyParticipation from "@/pages/MyPage/SurveyParticipation";

import AdminPage from "@/pages/MyPage/Admin/AdminPage";
import AdminListPage from "@/pages/MyPage/Admin/AdminListPage";
import AdminDetailPage from "@/pages/MyPage/Admin/AdminDetailPage";

import ChartPage from "@/pages/Chart/ChartPage";
import LineChartPage from "@/pages/LineChart/LineChartPage";
import AIPerformancePage from "@/pages/AIPerformance/AIPerformancePage";
import CategoryPerformancePage from "@/pages/CategoryPerformance/CategoryPerformancePage";
import DocsPage from "@/pages/Docs/DocsPage";
import Maintenance from "@/pages/Maintenance/Maintenance";

// ✅ 새로 추가된 import
import Administrator from "@/pages/Administrator/Administrator";
import Crawler from "@/pages/Administrator/Crawler";
import SurveyAdmin from "@/pages/Administrator/Survey";
import DataDownload from "@/pages/DataDownload/DataDownload";

const Root = () => <Navigate to="/main" />;

const MaintenanceWrapper = ({ children }) => {
  const isMaintenanceMode = process.env.REACT_APP_MAINTENANCE_MODE === "true";
  return isMaintenanceMode ? <Maintenance /> : children;
};

class AppRoutes extends React.Component {
  render() {
    return (
      <Router>
        <MaintenanceWrapper>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signupid" element={<SignupID />} />
            <Route path="/signupsns" element={<SignupSNS />} />
            <Route path="/main" element={<Main />} /> {/* ✅ Main만 남김 */}

            <Route element={<PrivateRoute />}>
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/survey" element={<Survey />} />
              <Route path="/survey/:title" element={<SurveyDetail />} />
              <Route path="/survey/:title/start" element={<SurveyStart />} />
              <Route path="/mypage/survey-participation" element={<SurveyParticipation />} />
              <Route path="/mypage/survey-creation" element={<AdminPage />} />
              <Route path="/mypage/survey-creation-list" element={<AdminListPage />} />
              <Route path="/mypage/survey-creation-detail/:id" element={<AdminDetailPage />} />

              <Route path="/chart" element={<ChartPage />} />
              <Route path="/chart/:id" element={<LineChartPage />} />
              <Route path="/ai-performance" element={<AIPerformancePage />} />
              <Route path="/category-performance/:category" element={<CategoryPerformancePage />} />
              <Route path="/docs" element={<DocsPage />} />

              {/* ✅ 새로 추가된 라우트 */}
              <Route path="/data-download" element={<DataDownload />} />
              <Route path="/administrator" element={<Administrator />} />
              <Route path="/administrator/crawler" element={<Crawler />} />
              <Route path="/administrator/survey" element={<SurveyAdmin />} />
            </Route>
          </Routes>
        </MaintenanceWrapper>
      </Router>
    );
  }
}

export default AppRoutes;
