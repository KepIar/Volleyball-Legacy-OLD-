import { Players, ServerScriptService } from "@rbxts/services";

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

// load managers
// this is bad code forgive me ;c
for (const managerModule of ServerScriptService.WaitForChild("TS").WaitForChild("managers").GetDescendants()) {
	if (classIs(managerModule, "ModuleScript")) {
		const manager = require(managerModule) as () => void;
		manager();
	}
}
