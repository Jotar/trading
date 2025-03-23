import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStock } from "../src/pages/StockContext";

const Home: React.FC = () => {
  const { ticker, setTicker, startDate, setStartDate, endDate, setEndDate } = useStock();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ 點擊「確認」時，同時檢查 `ticker` 是否有效 & 確保輸入完整
  const handleSubmit = async () => {
    if (!ticker || !startDate || !endDate) {
      alert("請輸入完整資訊");
      return;
    }

    setLoading(true);
    setError(null); // 清除錯誤訊息

    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/validate_ticker/`, { params: { ticker } });

      if (!response.data.valid) {
        setError(response.data.message);
        setLoading(false);
        return;
      }
    } catch (err) {
      setError("無法驗證股票代碼，請稍後再試");
      setLoading(false);
      return;
    }

    // ✅ `ticker` 驗證通過，導航到 `/analysis`
    setLoading(false);
    navigate("/analysis");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">股票回測系統</h2>

      {/* 股票代碼輸入 */}
      <input 
        type="text"
        value={ticker}
        onChange={(e) => {
          setTicker(e.target.value.toUpperCase());
          setError(null); // 當用戶輸入新的 ticker 時，清除錯誤訊息
        }}
        placeholder="輸入股票代碼 (如 AAPL)"
        className="border p-2 rounded w-full mb-3"
      />

      {/* 顯示錯誤訊息 */}
      {error && <p className="text-red-500">{error}</p>}

      {/* 日期選擇 */}
      <input 
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border p-2 rounded w-full mb-3"
      />
      <input 
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border p-2 rounded w-full mb-3"
      />

      {/* 確認按鈕 */}
      <button
        onClick={handleSubmit}
        className={`p-2 rounded w-full text-white ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"}`}
        disabled={loading}
      >
        {loading ? "驗證中..." : "確認"}
      </button>
    </div>
  );
};

export default Home;
