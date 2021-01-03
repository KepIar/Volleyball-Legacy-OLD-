-- Compiled with roblox-ts v1.0.0-beta.10
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _0 = TS.import(script, TS.getModule(script, "services"))
local Players = _0.Players
local ReplicatedStorage = _0.ReplicatedStorage
-- import { makeHello } from "shared/module";
local Maid = TS.import(script, TS.getModule(script, "maid").Maid)
local maid = Maid.new()
maid:GiveTask(function()
	return print("Clean me!")
end)
-- print(makeHello("main.client.ts"));
wait(3)
--[[
	const camera = game.Workspace.WaitForChild("Camera") as Camera;
	const camShake = new CameraShaker(Enum.RenderPriority.Camera.Value, (shakeCFrame) => (camera.CFrame = shakeCFrame));
	camShake.Start();
	// Explosion shake:
	camShake.Shake(CameraShaker.Presets.Explosion);
	wait(1);
	// Custom shake:
	camShake.ShakeOnce(3, 1, 0.2, 1.5);
]]
local tuple = { "hi", 5 }
print(tuple)
local randomArray = { "this", "is", "a", "random", "array" }
print(randomArray[2])
local Material
do
	local _1 = {}
	Material = setmetatable({}, {
		__index = _1,
	})
	Material.Grass = 0
	_1[0] = "Grass"
	Material.Sand = 1
	_1[1] = "Sand"
	Material.Stone = 2
	_1[2] = "Stone"
end
local MaterialToSoundMapping = { { Material.Grass, "Grass" }, { Material.Sand, "Grass" }, { Material.Stone, "Plastic" } }
ReplicatedStorage:GetDescendants()
maid:Destroy()
local embeddedExpr = "hello world"
print(embeddedExpr .. "!")
local newVector = function(vector)
	local newVec = {
		x = 0,
		y = 0,
	}
	if vector.x ~= nil then
		newVec.x = vector.x
	end
	if vector.y ~= nil then
		newVec.y = vector.y
	end
	return newVec
end
newVector({
	x = 5,
})
local randVec = {
	x = 5,
	y = 3,
}
local ab = { 1, 2, 3, 4 }
local char = Players.LocalPlayer.Character
local root = char:WaitForChild("HumanoidRootPart")
local function loop()
end
coroutine.wrap(loop)()
-- const ranArray: Array<interfaceForStringOrNumberDictionary> = [2];
--[[
	Indexable Types:
	[key: type]: return-type;
]]
local myDictionary = {
	random = 3,
	potato = "potaato",
}
local randomFunctionType
randomFunctionType = function(xa, xy)
	return {
		x = 5,
		y = 3,
	}
end
randomFunctionType = function(xa, xy, optionalType)
	if optionalType == nil then
		optionalType = 5
	end
	-- optionalType defaults to 5 if undefined
	return {
		x = 5,
		y = 3,
		z = optionalType,
	}
end
print(randomFunctionType(5, 3))
local function randomFunctionWithRestParams(...)
	local params = { ... }
	-- ewww i dont like using any lel mostly ruins typesafety haahhahsdhahdh ashd asd yghfudfgheriugh n
	local spitString = ""
	for _, x in ipairs(params) do
		spitString ..= x
	end
	return spitString
end
print(randomFunctionWithRestParams("Hello", "World", "!"))
local _ = "desktop"
-- Arrow functions capture the this where the function is created rather than where it is invoked
-- is it better to use arrow functions by default as it's got more predictable and stable behaviour rather than relying upon where the function is invoked for 'this'?
local arrowFunction = function(test)
	return "this is a string, to match the return type of the function type"
end
-- ** TODO: learn difference between for of and for in and the different types of for loops!
