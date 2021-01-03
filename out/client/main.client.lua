-- Compiled with roblox-ts v1.0.0-beta.10
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _0 = TS.import(script, TS.getModule(script, "services"))
local Players = _0.Players
local StarterPlayer = _0.StarterPlayer
local Player = Players.LocalPlayer
-- load managers
-- this is bad code forgive me ;c
for _, managerModule in ipairs(StarterPlayer:WaitForChild("StarterPlayerScripts"):WaitForChild("TS"):WaitForChild("managers"):GetDescendants()) do
	local _1 = managerModule
	if _1.ClassName == "ModuleScript" then
		local manager = require(managerModule)
		manager()
	end
end
