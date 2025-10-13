import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";

import Login from "@/pages/Login/Login";
import Signup from "@/pages/Signup/Signup";
import SignupID from "@/pages/Signup/SignupID";

import SignupSNS from "@/pages/Signup/SignupSNS";
import Main from "@/pages/Main/Main";
import MainPage from "@/pages/Main/MainPage";
import Survey from "@/pages/Survey/Survey";
import MyPage from "@/pages/MyPage/MyPage";
import SurveyParticipation from "@/pages/MyPage/SurveyParticipation";
import SurveyDetail from "@/pages/Survey/SurveyDetail";
import SurveyStart from "@/pages/Survey/SurveyStart";
import AdminPage from "@/pages/MyPage/Admin/AdminPage";
import AdminListPage from "@/pages/MyPage/Admin/AdminListPage";
import AdminDetailPage from "@/pages/MyPage/Admin/AdminDetailPage";
import ChartPage from "@/pages/Chart/ChartPage";
// import Administrator from "@/pages/Administrator/Administrator";
// import AdminSurveyDetail from "@/pages/Administrator/AdminSurveyDetail";
// import SurveyResultPage from "@/pages/Administrator/SurveyResultPage";
// import SurveyStatisticsPage from "@/pages/Administrator/Statistics/SurveyStatisticsPage";
// import CountryStatisticsPage from "@/pages/Administrator/Statistics/CountryStatisticsPage";
// import CategoryStatisticsPage from "@/pages/Administrator/Statistics/CategoryStatisticsPage";
// import OverallStatisticsPage from "@/pages/Administrator/Statistics/OverallStatisticsPage";
import LineChartPage from "@/pages/LineChart/LineChartPage";
import AIPerformancePage from "@/pages/AIPerformance/AIPerformancePage";
import CategoryPerformancePage from "@/pages/CategoryPerformance/CategoryPerformancePage";
import DocsPage from "@/pages/Docs/DocsPage";
import Maintenance from "@/pages/Maintenance/Maintenance";

// ✅ 새로 추가할 import
import Administrator from "@/pages/Administrator/Administrator";
import Crawler from "@/pages/Administrator/Crawler";
import SurveyAdmin from "@/pages/Administrator/Survey";
import DataDownload from "@/pages/DataDownload/DataDownload";

const Root = () => {
  return <Navigate to="/main" />;
};

const MaintenanceWrapper = ({ children }) => {
  const isMaintenanceMode = process.env.REACT_APP_MAINTENANCE_MODE === 'true';

  if (isMaintenanceMode) {
    return <Maintenance />;
  }

  return children;
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

            <Route path="/main" element={<Main />} />
            <Route path="/mainpage" element={<MainPage />} />

            <Route element={<PrivateRoute />}>
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/survey" element={<Survey />} />
              <Route path="/survey/:title" element={<SurveyDetail />} />
              <Route path="/survey/:title/start" element={<SurveyStart />} />
              <Route
                path="/mypage/survey-participation"
                element={<SurveyParticipation />}
              />
              <Route path="/mypage/survey-creation" element={<AdminPage />} />
              <Route
                path="/mypage/survey-creation-list"
                element={<AdminListPage />}
              />
              <Route
                path="/mypage/survey-creation-detail/:id"
                element={<AdminDetailPage />}
              />
              <Route path="/chart" element={<ChartPage />} />
              <Route path="/chart/:id" element={<LineChartPage />} />
              <Route path="/ai-performance" element={<AIPerformancePage />} />
              <Route
                path="/category-performance/:category"
                element={<CategoryPerformancePage />}
              />
              <Route path="/docs" element={<DocsPage />} />

              {/* ✅ 새로 추가된 라우트 */}
              <Route path="/data-download" element={<DataDownload />} />
              <Route path="/administrator" element={<Administrator />} />
              <Route path="/administrator/crawler" element={<Crawler />} />
              <Route path="/administrator/survey" element={<SurveyAdmin />} />

              {/* 원래 있던 주석 라우트들 (삭제 ❌) */}
              {/* <Route path="/administrator" element={<Administrator />} />
              <Route
                path="/administrator/detail/:id"
                element={<AdminSurveyDetail />}
              />
              <Route
                path="/administrator/result/:id"
                element={<SurveyResultPage />}
              />
              <Route
                path="/administrator/statistics/:id"
                element={<SurveyStatisticsPage />}
              />
              <Route
                path="/administrator/statistics/summary/country"
                element={<CountryStatisticsPage />}
              />
              <Route
                path="/administrator/statistics/summary/category"
                element={<CategoryStatisticsPage />}
              />
              <Route
                path="/administrator/statistics/summary/overall"
                element={<OverallStatisticsPage />}
              /> */}
            </Route>
          </Routes>
        </MaintenanceWrapper>
      </Router>
    );
  }
}

export default AppRoutes;
