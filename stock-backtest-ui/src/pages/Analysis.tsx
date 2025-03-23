import React from "react";
import { useNavigate } from "react-router-dom";

const Analysis: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">選擇分析類型</h2>
      <button onClick={() => navigate("/backtest")} className="bg-gray-500 text-white p-2 rounded w-full mb-2">📉 回測結果</button>
      <button onClick={() => navigate("/forecast")} className="bg-green-500 text-white p-2 rounded w-full mb-2">🔮 AI 預測</button>
      <button onClick={() => navigate("/fundamentals")} className="bg-yellow-500 text-white p-2 rounded w-full mb-2">📊 財務數據</button>
      <button onClick={() => navigate("/portfolio")} className="bg-purple-500 text-white p-2 rounded w-full mb-2">💼 投資組合</button>
      <button onClick={() => navigate("/news")} className="bg-red-500 text-white p-2 rounded w-full">📰 市場新聞</button>
    </div>
  );
};

export default Analysis;
