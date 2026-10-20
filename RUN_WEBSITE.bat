@echo off
title RBJJT Official Website Server
color 0A
echo ========================================================
echo   Rashtriya Bauddha Jan Jagaran Trust (RBJJT) Portal
echo   Starting Local Development Server...
echo ========================================================

cd /d "D:\web rbjjt"
set "PATH=C:\Users\SAMRAT ONLINE SERVIC\AppData\Local\Microsoft\WinGet\Packages\OpenJS.NodeJS.LTS_Microsoft.Winget.Source_8wekyb3d8bbwe\node-v24.20.0-win-x64;C:\Program Files\Git\cmd;%PATH%"

echo.
echo Opening browser at http://localhost:5173/ ...
echo.

start http://localhost:5173/
call npm.cmd run dev -- --host 0.0.0.0 --port 5173

pause
