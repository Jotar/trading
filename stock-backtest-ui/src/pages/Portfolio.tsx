import React, { useState } from "react";
import axios from "axios";

const Portfolio: React.FC = () => {
  const [tickers, setTickers] = useState<string>("");
  const [portfolioData, setPortfolioData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleBacktest = () => {
    setLoading(true);
    axios
      .get(`http://127.0.0.1:8000/api/portfolio/`, {
        params: { tickers: tickers.split(",") }
      })
      .then((response) => {
        setPortfolioData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching portfolio data:", error);
        setLoading(false);
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">💼 投資組合回測</h2>
      <input
        type="text"
        value={tickers}
        onChange={(e) => setTickers(e.target.value)}
        placeholder="輸入多支股票 (例如: AAPL,GOOGL,MSFT)"
        className="border p-2 rounded w-full mb-3"
      />
      <button onClick={handleBacktest} className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-700">
        {loading ? "計算中..." : "開始回測"}
      </button>

      {portfolioData.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">回測結果</h3>
          <pre>{JSON.stringify(portfolioData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
