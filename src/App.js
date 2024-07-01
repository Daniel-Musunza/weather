import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DestinationWeather from "./pages/DestinationWeather";
import MonthlyWeather from "./pages/MonthlyWeather";
import WhereToGo from "./pages/WhereToGo";
function App() {
  return (
   <Router>
    <Routes>
      <Route path="/:destination?" element={<DestinationWeather/>}/>
      <Route path="/:destination?/:month?" element={<MonthlyWeather />}/>
      <Route path="/where-to-go/:monthName?/:month?" element={<WhereToGo />}/>
    </Routes>
   </Router>
  );
}

export default App;
