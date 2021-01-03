import { Players, ReplicatedStorage, StarterPlayer } from "@rbxts/services";

const Player = Players.LocalPlayer;

// load managers
// this is bad code forgive me ;c
for (const managerModule of StarterPlayer.WaitForChild("StarterPlayerScripts")
	.WaitForChild("TS")
	.WaitForChild("managers")
	.GetDescendants()) {
	if (classIs(managerModule, "ModuleScript")) {
		const manager = require(managerModule) as () => void;
		manager();
	}
}
