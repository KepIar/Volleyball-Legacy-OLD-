-- Compiled with roblox-ts v1.0.0-beta.10
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _0 = TS.import(script, TS.getModule(script, "services"))
local CollectionService = _0.CollectionService
local RunService = _0.RunService
local BALL_TAG = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "ball-data").BALL_TAG
-- Set to undefined if no rate limit, otherwise set to limit rate cooldown in seconds
local BALL_STEP_LIMIT_RATE = nil
-- eslint-disable-next-line roblox-ts/lua-truthiness
local lastBallStep = (BALL_STEP_LIMIT_RATE and 0) or nil
local function onStep()
	local now = tick()
	if lastBallStep ~= nil and BALL_STEP_LIMIT_RATE ~= nil then
		if tick() - lastBallStep < BALL_STEP_LIMIT_RATE then
			return nil
		end
	end
	for _, ball in ipairs(CollectionService:GetTagged(BALL_TAG)) do
		local stepBindable = ball:FindFirstChild("Step")
		local _1 = stepBindable
		if _1 then
			local _2 = stepBindable
			_1 = _2.ClassName == "BindableEvent"
		end
		if _1 then
			stepBindable:Fire()
			lastBallStep = now
		end
	end
end
local function onBallRemoved(obj)
	local destroyBindable = obj:FindFirstChild("Destroy")
	local _1 = destroyBindable
	if _1 then
		local _2 = destroyBindable
		_1 = _2.ClassName == "BindableEvent"
	end
	if _1 then
		destroyBindable:Fire()
	end
end
return function()
	RunService.Heartbeat:Connect(onStep)
	CollectionService:GetInstanceRemovedSignal(BALL_TAG):Connect(onBallRemoved)
end
