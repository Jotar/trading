import React, { useState, useEffect } from "react";
import axios from "axios";
import { useStock } from "../pages/StockContext";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";

const Forecast: React.FC = () => {
  const { ticker } = useStock();
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!ticker) {
      console.warn("⚠️ ticker 缺失，取消 API 請求");
      return;
    }

    setLoading(true);
    console.log("🔍 發送 Forecast API 請求，ticker:", ticker);

    axios
      .get(`http://127.0.0.1:8000/api/forecast/`, { params: { ticker } })
      .then((response) => {
        console.log("✅ 預測數據回應:", response.data);
        setForecastData(response.data);
      })
      .catch((error) => {
        console.error("❌ 預測數據請求錯誤:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [ticker]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">📈 {ticker} 未來 30 天股價預測</h2>
      {loading ? <p>🔄 加載中...</p> : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={forecastData}>
            <XAxis dataKey="date" tickFormatter={(tick) => format(new Date(tick), "yyyy-MM-dd")} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="predicted_price" stroke="#FF5733" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Forecast;
