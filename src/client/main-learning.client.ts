import { Players, ReplicatedStorage, Workspace } from "@rbxts/services";
//import { makeHello } from "shared/module";
import { DeviceType, Device } from "@rbxts/device"; // for console use userinputservice.gamepadenabled instead !
import Maid from "@rbxts/maid";
import Make from "@rbxts/make";
import Signal from "@rbxts/signal";
import CameraShaker from "@rbxts/camera-shaker";

const maid = new Maid();
maid.GiveTask(() => print("Clean me!"));
//print(makeHello("main.client.ts"));

wait(3);
/* 
const camera = game.Workspace.WaitForChild("Camera") as Camera;
const camShake = new CameraShaker(Enum.RenderPriority.Camera.Value, (shakeCFrame) => (camera.CFrame = shakeCFrame));

camShake.Start();

// Explosion shake:
camShake.Shake(CameraShaker.Presets.Explosion);

wait(1);

// Custom shake:
camShake.ShakeOnce(3, 1, 0.2, 1.5);
*/

const tuple: [string, number] = ["hi", 5];
print(tuple);

const randomArray: Array<string> = ["this", "is", "a", "random", "array"];
print(randomArray[1]);

enum Material {
	Grass,
	Sand,
	Stone,
}

type MaterialMapping = [Material, string];

const MaterialToSoundMapping: Array<MaterialMapping> = [
	[Material.Grass, "Grass"],
	[Material.Sand, "Grass"],
	[Material.Stone, "Plastic"],
];

ReplicatedStorage.GetDescendants();
maid.Destroy();

const embeddedExpr = "hello world";
print(`${embeddedExpr}!`);

interface Vector {
	readonly x?: number;
	readonly y?: number;
}

interface newVectorFunction {
	(x: Vector): { x: number; y: number };
}

const newVector: newVectorFunction = function (vector) {
	const newVec = { x: 0, y: 0 };
	if (vector.x !== undefined) {
		newVec.x = vector.x;
	}
	if (vector.y !== undefined) {
		newVec.y = vector.y;
	}
	return newVec;
};

newVector({ x: 5 });
const randVec: Vector = { x: 5, y: 3 };
const ab: Array<number> = [1, 2, 3, 4];

const char = Players.LocalPlayer.Character as Model;
const root = char.WaitForChild("HumanoidRootPart") as Instance;

function loop() {
	/*
	while (root.IsDescendantOf(Workspace)) {
		Make("Part", {
			Anchored: true,
			CFrame:
				(classIs(root, "Part") &&
					// eslint-disable-next-line roblox-ts/lua-truthiness
					root.CFrame.mul(new CFrame(0, char.FindFirstChildOfClass("Humanoid")?.HipHeight || 5, 0))) ||
				new CFrame(0, 0, 0),
			Parent: Workspace,
		});

		wait(3);
	}
	*/
}
coroutine.wrap(loop)();

interface interfaceForStringOrNumberDictionary {
	[index: number]: string | number;
}

//const ranArray: Array<interfaceForStringOrNumberDictionary> = [2];

/*
	Indexable Types: 
		[key: type]: return-type;
*/

interface dictionaryType {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[index: string]: any;
}

const myDictionary: dictionaryType = {
	random: 3,
	potato: "potaato",
};

interface returnType {
	y: number;
	x: number;
	z?: number;
}
let randomFunctionType: (x: number, y: number, q?: number) => returnType; // (parameter types) => return type
randomFunctionType = function (xa: number, xy: number): returnType {
	return {
		x: 5,
		y: 3,
	};
};

randomFunctionType = function (xa: number, xy: number, optionalType = 5): returnType {
	// optionalType defaults to 5 if undefined
	return {
		x: 5,
		y: 3,
		z: optionalType,
	};
};

print(randomFunctionType(5, 3));

function randomFunctionWithRestParams(...params: string[]): string {
	// ewww i dont like using any lel mostly ruins typesafety haahhahsdhahdh ashd asd yghfudfgheriugh n
	let spitString = "";
	for (const x of params) {
		spitString += x;
	}
	return spitString;
}

print(randomFunctionWithRestParams("Hello", "World", "!"));

DeviceType.Desktop;

// Arrow functions capture the this where the function is created rather than where it is invoked
// is it better to use arrow functions by default as it's got more predictable and stable behaviour rather than relying upon where the function is invoked for 'this'?

type functionType = (argOneShouldBeString: string) => string;
const arrowFunction: functionType = (test: string) => {
	return "this is a string, to match the return type of the function type";
};

// ** TODO: learn difference between for of and for in and the different types of for loops!
