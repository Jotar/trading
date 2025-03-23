from django.shortcuts import render

from django.http import JsonResponse
import yfinance as yf

def is_valid_ticker(request):
    print("🔍 Received request:", request.GET)  # Debug
    ticker = request.GET.get("ticker", "").strip()  # ✅ 確保 ticker 是字串
    
    if not ticker:
        return JsonResponse({"error": "請提供股票代碼"}, status=400)

    try:
        stock = yf.Ticker(ticker)

        # ✅ 確保獲取的 ticker 資訊是有效的
        if "regularMarketPrice" not in stock.info:
            return JsonResponse({"valid": False, "message": f"{ticker} 不是有效的股票代碼"})
        
        return JsonResponse({"valid": True, "message": f"{ticker} 是有效的股票代碼"})
    
    except Exception as e:
        return JsonResponse({"valid": False, "message": f"錯誤: {str(e)}"}, status=500)

def backtest_view(request):
    ticker = request.GET.get("ticker")
    start_date = request.GET.get("start_date")
    end_date = request.GET.get("end_date")
    print(ticker)

    if not ticker or not start_date or not end_date:
        return JsonResponse({"error": "請提供完整參數"}, status=400)

    try:
        stock = yf.Ticker(ticker)
        df = stock.history(start=start_date, end=end_date)

        if df.empty:
            return JsonResponse({"error": "無數據，請檢查股票代碼或日期"}, status=400)

        data = [{"date": str(date), "price": row["Close"]} for date, row in df.iterrows()]
        return JsonResponse(data, safe=False)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


def stock_fundamentals(request):
    print(request.GET)  # 🔹 印出收到的查詢參數，方便 Debug
    ticker = request.GET.get("ticker")
    print("request.Get.ticker")
    print(ticker)

    #ticker = request.GET.get("ticker")
    start_date = request.GET.get("start_date")
    end_date = request.GET.get("end_date")

    if not ticker or ticker == "None":  
        print("❌ ticker is missing or invalid!")
        return JsonResponse({"error": "請提供股票代碼"}, status=400)


    #if isinstance(ticker,list):
            #ticker = ticker[0]

    try:
        print("進入try")
        stock = yf.Ticker(ticker)
        print("✅ stock 物件建立成功")  
        import time   #要import time
        time.sleep(2)  # ✅ 等待 2 秒，確保 API 加載完成
        
       
        info = stock.info  # 🚨 改用 `stock.info`
        print("🔍 stock.info:", info)

        if not info or info =={}:
            return JsonResponse({"error":f"無法獲取 {ticker}的財務數據"},status=500)
        data = {
         "Current Price": info.get("currentPrice"),
            "Market Cap": round(info.get("marketCap", 0) / 1e9, 2),  # 轉換成「億」為單位
            "52W High": info.get("fiftyTwoWeekHigh"),
            "52W Low": info.get("fiftyTwoWeekLow"),
        }
        
        print("✅ Returning data:", data)
        return JsonResponse(data)
        
    except Exception as e:
        print("error 500")
        return JsonResponse({"error": str(e)}, status=500)
# Create your views here.


from django.http import JsonResponse
import yfinance as yf
import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression

def stock_forecast(request):
    print("🔍 Received request:", request.GET)  # Debug
    ticker = request.GET.get("ticker")

    if not ticker:
        return JsonResponse({"error": "請提供股票代碼"}, status=400)

    try:
        stock = yf.Ticker(ticker)
        df = stock.history(period="5y")

        if df.empty:
            return JsonResponse({"error": "無法獲取股價數據"}, status=500)

        # 轉換日期為數字
        df["Days"] = np.arange(len(df))
        X = df[["Days"]].values  # 自變數：天數
        y = df["Close"].values   # 因變數：收盤價

        # 訓練線性回歸模型
        model = LinearRegression()
        model.fit(X, y)

        # 預測未來 30 天股價
        future_days = np.arange(len(df), len(df) + 30).reshape(-1, 1)
        predicted_prices = model.predict(future_days)

        # 格式化 JSON 返回前端
        future_dates = pd.date_range(start=df.index[-1], periods=30).strftime("%Y-%m-%d").tolist()
        forecast_data = [{"date": future_dates[i], "predicted_price": float(predicted_prices[i])} for i in range(30)]

        print("✅ Returning forecast data:", forecast_data)
        return JsonResponse(forecast_data, safe=False)

    except Exception as e:
        print("❌ Error:", str(e))  # Debug
        return JsonResponse({"error": str(e)}, status=500)
