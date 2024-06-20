import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DestinationWeather from "./pages/DestinationWeather";
import MonthlyWeather from "./pages/MonthlyWeather";
function App() {
  return (
   <Router>
    <Routes>
      <Route path="/:destination?" element={<DestinationWeather/>}/>
      <Route path="/:destination?/:month?" element={<MonthlyWeather />}/>
    </Routes>
   </Router>
  );
}

export default App;
