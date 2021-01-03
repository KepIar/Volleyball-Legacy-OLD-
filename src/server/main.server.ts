import { Players, ReplicatedStorage, ServerScriptService } from "@rbxts/services";
import Make from "@rbxts/make";
import { REMOTE_EVENTS, REMOTE_FUNCTIONS } from "./remotes";

const CAMERA_MAX_ZOOM_DISTANCE = 25;

function onPlayerAdded(player: Player) {
	function onCharacterAdded(character: Model) {
		player.CameraMaxZoomDistance = CAMERA_MAX_ZOOM_DISTANCE;
	}
	player.CharacterAdded.Connect(onCharacterAdded);
}

Players.PlayerAdded.Connect(onPlayerAdded);
for (const player of Players.GetPlayers()) {
	onPlayerAdded(player);
}

// generate events
for (const remoteEvent of REMOTE_EVENTS) {
	Make("RemoteEvent", {
		Name: remoteEvent,
		Parent: ReplicatedStorage,
	});
}

for (const remoteFunction of REMOTE_FUNCTIONS) {
	Make("RemoteFunction", {
		Name: remoteFunction,
		Parent: ReplicatedStorage,
	});
}

// load managers
// this is bad code forgive me ;c
for (const managerModule of ServerScriptService.WaitForChild("TS").WaitForChild("managers").GetDescendants()) {
	if (classIs(managerModule, "ModuleScript")) {
		const manager = require(managerModule) as () => void;
		manager();
	}
}
