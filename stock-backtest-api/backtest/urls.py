from django.urls import path  # 引入 path，用來定義 URL 路徑

from .views import backtest_view, stock_fundamentals, stock_forecast,is_valid_ticker
urlpatterns = [
    path('backtest/', backtest_view),  # 設定 URL `/api/backtest/`，對應 `backtest_view`
    path('fundamentals/', stock_fundamentals),
    path('forecast/',stock_forecast),
    path('validate_ticker/',is_valid_ticker),
]
