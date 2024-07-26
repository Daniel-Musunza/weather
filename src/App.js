import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DestinationWeather from "./pages/DestinationWeather";
import MonthlyWeather from "./pages/MonthlyWeather";
import WhereToGo from "./pages/WhereToGo";
import WhereToGoBlogs from "./pages/WhereToGoBlogs";
import WarmCountriesBlogs from "./pages/WarmCountriesBlogs";
import News from "./pages/News";
import Beaches from "./pages/Beaches";
import Attractions from "./pages/Attractions";
import ScrollToTop from "./layouts/ScrollToTop";


function App() {
  return (
    <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/:destination?" element={<DestinationWeather />} />
          <Route path="/:destination?/:month?" element={<MonthlyWeather />} />
          <Route path="/where-to-go/:monthName/:id" element={<WhereToGo />} />
          <Route path="/where-to-go/:wtgblogs" element={<WhereToGoBlogs />} />
          <Route path="/warm-countries/:wcblogs" element={<WarmCountriesBlogs />} />
          <Route path="/beaches/:beaches" element={<Beaches />} />
          <Route path="/attractions/:attractions" element={<Attractions />} />
          <Route path="/news/:news/:id" element={<News />} />
        </Routes>
    </Router>
  );
}

export default App;
