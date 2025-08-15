# Product Nexus - Start Script
Write-Host "🚀 Starting Product Nexus..." -ForegroundColor Cyan

# Start JSON Server in new window
Write-Host "📡 Starting JSON Server on port 5000..." -ForegroundColor Yellow
Start-Process -FilePath "cmd" -ArgumentList "/c", "npx json-server --watch db.json --port 5000" -WindowStyle Normal

# Wait a bit for server to start
Start-Sleep -Seconds 3

# Start React dev server
Write-Host "⚛️  Starting React development server..." -ForegroundColor Green
Write-Host "🌐 Your app will be available at: http://localhost:5173/" -ForegroundColor Magenta
Write-Host "📦 API server running at: http://localhost:5000/" -ForegroundColor Magenta

npm run dev
