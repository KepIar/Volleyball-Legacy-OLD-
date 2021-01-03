-- Compiled with roblox-ts v1.0.0-beta.10
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _0 = TS.import(script, TS.getModule(script, "services"))
local Players = _0.Players
local ReplicatedStorage = _0.ReplicatedStorage
local UserInputService = _0.UserInputService
local ServeEvent = ReplicatedStorage:WaitForChild("ServeEvent")
local Player = Players.LocalPlayer
local function onInputBegan(input, isProcessed)
	if isProcessed then
		return nil
	end
	local _1 = input.KeyCode
	repeat
		if _1 == Enum.KeyCode.G then
			ServeEvent:FireServer()
			break
		end
		break
	until true
end
return function()
	UserInputService.InputBegan:Connect(onInputBegan)
end
