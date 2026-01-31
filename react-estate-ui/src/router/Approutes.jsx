import { Routes, Route } from 'react-router-dom';
import NewsFeedMFE from '../mfe/NewsFeedMfe';
import HomePage from '../routes/homePage/homePage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Stories" element={<NewsFeedMFE />} />
    </Routes>
  );
}
