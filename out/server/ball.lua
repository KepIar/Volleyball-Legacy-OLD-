-- Compiled with roblox-ts v1.0.0-beta.10
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local CollectionService = TS.import(script, TS.getModule(script, "services")).CollectionService
local Make = TS.import(script, TS.getModule(script, "make"))
local _0 = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "ball-data")
local DEFAULT_GRAVITY = _0.DEFAULT_GRAVITY
local DEFAULT_AIR_RESISTANCE = _0.DEFAULT_AIR_RESISTANCE
local BALL_TAG = _0.BALL_TAG
local Ball
do
	Ball = setmetatable({}, {
		__tostring = function()
			return "Ball"
		end,
	})
	Ball.__index = Ball
	function Ball.new(...)
		local self = setmetatable({}, Ball)
		self:constructor(...)
		return self
	end
	function Ball:constructor(obj)
		self.gravity = DEFAULT_GRAVITY
		self.airResistance = DEFAULT_AIR_RESISTANCE
		self.obj = obj
		self:makeChildren()
		self.configFolder = self.obj:WaitForChild("ConfigFolder")
		if not CollectionService:HasTag(self.obj, BALL_TAG) then
			CollectionService:AddTag(self.obj, BALL_TAG)
		end
	end
	function Ball:getVelocity()
		return (self.configFolder:FindFirstChild("Velocity")).Value
	end
	function Ball:setVelocity(newValue)
		(self.configFolder:FindFirstChild("Velocity")).Value = newValue
	end
	function Ball:getPosition()
		return (self.configFolder:FindFirstChild("Position")).Value
	end
	function Ball:setPosition(newValue)
		(self.configFolder:FindFirstChild("Position")).Value = newValue
	end
	function Ball:makeChildren()
		-- for replication & configuration
		Make("Configuration", {
			Name = "ConfigFolder",
			Parent = self.obj,
			Children = { Make("Vector3Value", {
				Name = "Velocity",
				Value = Vector3.new(),
			}), Make("Vector3Value", {
				Name = "Position",
				Value = Vector3.new(),
			}) },
		})
		Make("BindableEvent", {
			Name = "Step",
			Parent = self.obj,
			Event = function()
				-- if we used a normal function it may glitch out because 'this' would be based on the environment in which the event is called // try it for yourself! :o
				self:step()
			end,
		})
	end
	function Ball:step()
		self:motionStep()
	end
	function Ball:motionStep()
		-- eslint-disable-next-line prettier/prettier
		local _1 = self
		local _2 = self:getVelocity()
		local _3 = self.gravity
		local _4 = self.airResistance
		_1:setVelocity((_2 - _3) * _4)
		-- eslint-disable-next-line prettier/prettier
		local _5 = self
		local _6 = self:getPosition()
		local _7 = self:getVelocity() * 0.1
		_5:setPosition(_6 + _7)
	end
	function Ball:destroy()
		if CollectionService:HasTag(self.obj, BALL_TAG) then
			CollectionService:RemoveTag(self.obj, BALL_TAG)
		end
	end
	Ball.test = 0
end
return {
	Ball = Ball,
}
