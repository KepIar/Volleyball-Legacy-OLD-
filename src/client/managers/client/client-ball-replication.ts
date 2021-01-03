import { CollectionService, RunService, TweenService } from "@rbxts/services";
import { BALL_TAG } from "shared/ball-data";

const REPLICATION_TWEEN_INFO = new TweenInfo(0.05, Enum.EasingStyle.Linear, Enum.EasingDirection.Out);

function setupReplication(obj: MeshPart) {
	const configFolder = obj.WaitForChild("ConfigFolder") as Folder;
	const positionValue = configFolder.WaitForChild("Position") as Vector3Value;
	RunService.Heartbeat.Connect(function () {
		// todo: removed check
		TweenService.Create(obj, REPLICATION_TWEEN_INFO, {
			CFrame: new CFrame(positionValue.Value.X, positionValue.Value.Y, positionValue.Value.Z),
		}).Play();
	});
}

function onBallAdded(ball: Instance) {
	if (classIs(ball, "MeshPart")) setupReplication(ball);
}

export = (): void => {
	for (const ball of CollectionService.GetTagged(BALL_TAG)) {
		onBallAdded(ball);
	}

	CollectionService.GetInstanceAddedSignal(BALL_TAG).Connect(onBallAdded);
};
