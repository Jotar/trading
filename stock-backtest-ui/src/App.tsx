import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Analysis from "./pages/Analysis";
import Backtest from "./pages/Backtest";  
import Forecast from "./pages/Forecast";
import Fundamentals from "./pages/Fundamentals";
import Portfolio from "./pages/Portfolio";
import News from "./pages/News";
import { StockProvider } from "./pages/StockContext";

const App: React.FC = () => {
  return (
    <StockProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/backtest" element={<Backtest />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/fundamentals" element={<Fundamentals />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/news" element={<News />} />
        </Routes>
      </Router>
    </StockProvider>
  );
};

export default App;
