import React, { useState, useEffect } from "react";
import axios from "axios";
import { useStock } from "../pages/StockContext";

const Fundamentals: React.FC = () => {
  const { ticker, setTicker, startDate, setStartDate, endDate, setEndDate } = useStock();
  const [fundamentals, setFundamentals] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchFundamentals = () => {
    if (!ticker || !startDate || !endDate) {
      console.warn("⚠️ ticker、startDate 或 endDate 缺失，取消 API 請求");
      return;
    }

    setLoading(true);
    console.log("🔍 發送 API 請求:", ticker, startDate, endDate);

    axios
      .get(`http://127.0.0.1:8000/api/fundamentals/`, { 
        params: { ticker, start_date: startDate, end_date: endDate }  
      })
      .then((response) => {
        console.log("✅ API 回應:", response.data);
        setFundamentals(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ API 錯誤:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchFundamentals();  // ✅ 頁面載入時執行 API 請求
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">📊 {ticker} 財務數據</h2>
      <div className="flex flex-col gap-3">
        <input type="text" value={ticker} onChange={(e) => setTicker(e.target.value.toUpperCase())} />
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <button onClick={fetchFundamentals} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700" disabled={loading}>
          {loading ? "加載中..." : "獲取財務數據"}
        </button>
      </div>

      {fundamentals && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="text-lg font-semibold mb-2">公司財務數據</h3>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <tbody>
              <tr><td className="border p-2">市盈率 (P/E Ratio)</td><td className="border p-2">{fundamentals["P/E Ratio"]}</td></tr>
              <tr><td className="border p-2">股利收益率</td><td className="border p-2">{fundamentals["Dividend Yield"]}%</td></tr>
              <tr><td className="border p-2">市值</td><td className="border p-2">${fundamentals["Market Cap"]} B</td></tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Fundamentals;
