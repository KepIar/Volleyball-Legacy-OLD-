import { Players, ReplicatedStorage, UserInputService } from "@rbxts/services";

const ServeEvent = ReplicatedStorage.WaitForChild("ServeEvent") as RemoteEvent;
const Player = Players.LocalPlayer;

function onInputBegan(input: InputObject, isProcessed: boolean) {
	if (isProcessed) return;

	switch (input.KeyCode) {
		case Enum.KeyCode.G:
			ServeEvent.FireServer();
			break;

		default:
			break;
	}
}

export = () => {
	UserInputService.InputBegan.Connect(onInputBegan);
};
