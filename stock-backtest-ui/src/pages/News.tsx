import React, { useState, useEffect } from "react";
import axios from "axios";
import { useStock } from "../pages/StockContext";

const News: React.FC = () => {
  const { ticker } = useStock();
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/news/`, { params: { ticker } })
      .then((response) => {
        setNews(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
        setLoading(false);
      });
  }, [ticker]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">📰 {ticker} 最新新聞</h2>
      {loading ? <p>🔄 加載中...</p> : (
        <ul>
          {news.map((item, index) => (
            <li key={index} className="mb-2">
              <a href={item.link} target="_blank" className="text-blue-500 hover:underline">{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default News;
