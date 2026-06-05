import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SiteShell from "./components/layout/SiteShell";
import HomePage from "./pages/HomePage";
import WorkIndexPage from "./pages/WorkIndexPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<SiteShell />}>
      <Route index element={<HomePage />} />
      <Route path="work" element={<WorkIndexPage />} />
      <Route path="work/:slug" element={<ProjectDetailPage />} />
      <Route path="experience" element={<Navigate to="/#experience" replace />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="profile" element={<Navigate to="/experience" replace />} />
      <Route path="ai" element={<Navigate to="/work/ai-chatbot-saas" replace />} />
      <Route path="lab" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

export default App;
