import React, { useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";

const Backtest: React.FC = () => {
  const [ticker, setTicker] = useState("AAPL");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);

  const handleBacktest = async () => {
    if (!ticker || !startDate || !endDate) {
      alert("請填寫完整資訊");
      return;
    }
    setLoading(true);

    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/backtest/`, {
        params: { ticker, start_date: startDate, end_date: endDate },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching backtest data:", error);
      alert("回測失敗，請檢查 API 是否正常運行");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">股票回測系統</h2>
      <div className="flex flex-col gap-3">
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          placeholder="輸入股票代碼 (如 AAPL)"
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={handleBacktest}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "回測中..." : "開始回測"}
        </button>
      </div>

      {data.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">回測結果</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="date" tickFormatter={(tick) => format(new Date(tick), "yyyy-MM-dd")} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Backtest;
