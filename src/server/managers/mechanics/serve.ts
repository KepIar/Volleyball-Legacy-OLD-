import Make from "@rbxts/make";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { Ball } from "server/ball";
import { BALL_SIZE } from "shared/ball-data";

const EVENT: RemoteEvent = ReplicatedStorage.WaitForChild("ServeEvent") as RemoteEvent;

function generateBall(): Ball {
	const obj = ReplicatedStorage.WaitForChild("Ball").Clone() as MeshPart;
	obj.Size = BALL_SIZE;
	obj.Massless = true;
	obj.Parent = Workspace;
	return new Ball(obj);
}

function onEvent(player: Player) {
	print(player.Name, " is trying to serve!");
	const root = player.Character?.FindFirstChild("HumanoidRootPart");
	if (root) {
		const rootPart: Part = root as Part; // todo: REFACTOR THIS CODE, it's ass
		const ball = generateBall();
		ball.obj.CFrame = rootPart.CFrame.mul(new CFrame(0, 15, 0));
		ball.setPosition(rootPart.Position.add(new Vector3(0, 25, 0)));
	}
}

export = () => {
	EVENT.OnServerEvent.Connect(onEvent);
};
