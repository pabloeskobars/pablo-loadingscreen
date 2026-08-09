-- Shuts down the NUI loading screen once the session is ready.
-- Requires loadscreen_manual_shutdown 'yes' in fxmanifest.lua

local closed = false

local function closeLoadingScreen()
    if closed then return end
    closed = true
    ShutdownLoadingScreen()
    ShutdownLoadingScreenNui()
end

CreateThread(function()
    local deadline = GetGameTimer() + 180000 -- safety: never hang forever (3 min)

    while not NetworkIsSessionStarted() do
        if GetGameTimer() >= deadline then
            break
        end
        Wait(100)
    end

    -- short beat so the bar can finish visually
    Wait(400)
    closeLoadingScreen()
end)

AddEventHandler('playerSpawned', function()
    closeLoadingScreen()
end)
