-- Compiled with roblox-ts v1.0.0-beta.10
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _0 = TS.import(script, TS.getModule(script, "services"))
local Players = _0.Players
local ReplicatedStorage = _0.ReplicatedStorage
local ServerScriptService = _0.ServerScriptService
local Make = TS.import(script, TS.getModule(script, "make"))
local _1 = TS.import(script, game:GetService("ServerScriptService"), "TS", "remotes")
local REMOTE_EVENTS = _1.REMOTE_EVENTS
local REMOTE_FUNCTIONS = _1.REMOTE_FUNCTIONS
local CAMERA_MAX_ZOOM_DISTANCE = 25
local function onPlayerAdded(player)
	local function onCharacterAdded(character)
		player.CameraMaxZoomDistance = CAMERA_MAX_ZOOM_DISTANCE
	end
	player.CharacterAdded:Connect(onCharacterAdded)
end
Players.PlayerAdded:Connect(onPlayerAdded)
for _, player in ipairs(Players:GetPlayers()) do
	onPlayerAdded(player)
end
-- generate events
for _, remoteEvent in ipairs(REMOTE_EVENTS) do
	Make("RemoteEvent", {
		Name = remoteEvent,
		Parent = ReplicatedStorage,
	})
end
for _, remoteFunction in ipairs(REMOTE_FUNCTIONS) do
	Make("RemoteFunction", {
		Name = remoteFunction,
		Parent = ReplicatedStorage,
	})
end
-- load managers
-- this is bad code forgive me ;c
for _, managerModule in ipairs(ServerScriptService:WaitForChild("TS"):WaitForChild("managers"):GetDescendants()) do
	local _2 = managerModule
	if _2.ClassName == "ModuleScript" then
		local manager = require(managerModule)
		manager()
	end
end
