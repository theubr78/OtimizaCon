# Script unificado para iniciar a Plataforma Procuradoria | Officecon
$root = $PSScriptRoot
$nodePath = "C:\Users\Matheus Silva\.nodejs\node-v20.18.0-win-x64"

Write-Host "==========================================================" -ForegroundColor Red
Write-Host "   Procuradoria | Officecon — Gestão de Processos        " -ForegroundColor White
Write-Host "==========================================================" -ForegroundColor Red

# 1. Inicia o Backend (Porta 3001)
Write-Host "`n[1/2] Iniciando Backend REST API (Porta 3001)..." -ForegroundColor Yellow
$backendJob = Start-Process -FilePath "cmd.exe" -ArgumentList "/c set PATH=$nodePath;%PATH% && cd `"$root\server`" && node dist/interfaces/http/server.js" -PassThru -NoNewWindow

Start-Sleep -Seconds 2

# 2. Inicia o Frontend
Write-Host "[2/2] Iniciando Servidor Frontend..." -ForegroundColor Yellow
Write-Host "`nAmbientes disponíveis:" -ForegroundColor Green
Write-Host " -> Backend API:  http://localhost:3001/api/painel" -ForegroundColor Cyan
Write-Host " -> Aplicação:    http://localhost:8899/Procuradoria.dc.html" -ForegroundColor Cyan

& "$root\project\serve.ps1" -Port 8899
