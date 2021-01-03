-- Compiled with roblox-ts v1.0.0-beta.10
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _0 = TS.import(script, TS.getModule(script, "services"))
local ReplicatedStorage = _0.ReplicatedStorage
local Workspace = _0.Workspace
local Ball = TS.import(script, game:GetService("ServerScriptService"), "TS", "ball").Ball
local BALL_SIZE = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "ball-data").BALL_SIZE
local EVENT = ReplicatedStorage:WaitForChild("ServeEvent")
local function generateBall()
	local obj = ReplicatedStorage:WaitForChild("Ball"):Clone()
	obj.Size = BALL_SIZE
	obj.Massless = true
	obj.Parent = Workspace
	return Ball.new(obj)
end
local function onEvent(player)
	print(player.Name, " is trying to serve!")
	local _1 = player.Character
	if _1 ~= nil then
		_1 = _1:FindFirstChild("HumanoidRootPart")
	end
	local root = _1
	if root then
		local rootPart = root
		local ball = generateBall()
		local _2 = rootPart.CFrame
		local _3 = CFrame.new(0, 15, 0)
		ball.obj.CFrame = _2 * _3
		local _4 = ball
		local _5 = rootPart.Position
		local _6 = Vector3.new(0, 25, 0)
		_4:setPosition(_5 + _6)
	end
end
return function()
	EVENT.OnServerEvent:Connect(onEvent)
end
