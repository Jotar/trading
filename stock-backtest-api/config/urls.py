"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""




from django.contrib import admin  # Django 內建的管理介面
from django.urls import path, include  # `path` 設定路徑, `include` 匯入應用程式的 URL

urlpatterns = [
    path('admin/', admin.site.urls),  # 設定 Django 後台管理界面的 URL
    path('api/', include('backtest.urls')),  # 把 `backtest.urls` 加入 `/api/` 前綴
]