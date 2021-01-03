-- Compiled with roblox-ts v1.0.0-beta.10
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _0 = TS.import(script, TS.getModule(script, "services"))
local CollectionService = _0.CollectionService
local RunService = _0.RunService
local TweenService = _0.TweenService
local BALL_TAG = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "ball-data").BALL_TAG
local REPLICATION_TWEEN_INFO = TweenInfo.new(0.05, Enum.EasingStyle.Linear, Enum.EasingDirection.Out)
local function setupReplication(obj)
	local configFolder = obj:WaitForChild("ConfigFolder")
	local positionValue = configFolder:WaitForChild("Position")
	RunService.Heartbeat:Connect(function()
		-- todo: removed check
		TweenService:Create(obj, REPLICATION_TWEEN_INFO, {
			CFrame = CFrame.new(positionValue.Value.X, positionValue.Value.Y, positionValue.Value.Z),
		}):Play()
	end)
end
local function onBallAdded(ball)
	local _1 = ball
	if _1.ClassName == "MeshPart" then
		setupReplication(ball)
	end
end
return function()
	for _, ball in ipairs(CollectionService:GetTagged(BALL_TAG)) do
		onBallAdded(ball)
	end
	CollectionService:GetInstanceAddedSignal(BALL_TAG):Connect(onBallAdded)
end
