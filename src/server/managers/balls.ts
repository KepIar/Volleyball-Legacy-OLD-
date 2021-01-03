import { CollectionService, ReplicatedStorage, RunService } from "@rbxts/services";
import { Ball } from "server/ball";
import { BALL_TAG, BALL_CLASS } from "shared/ball-data";

// Set to undefined if no rate limit, otherwise set to limit rate cooldown in seconds
const BALL_STEP_LIMIT_RATE: number | undefined = undefined;

// eslint-disable-next-line roblox-ts/lua-truthiness
let lastBallStep: number | undefined = (BALL_STEP_LIMIT_RATE && 0) || undefined;

function onStep(): void {
	const now = tick();
	if (lastBallStep !== undefined && BALL_STEP_LIMIT_RATE !== undefined) {
		if (tick() - lastBallStep < BALL_STEP_LIMIT_RATE) {
			return;
		}
	}

	for (const ball of CollectionService.GetTagged(BALL_TAG)) {
		const stepBindable = ball.FindFirstChild("Step");
		if (stepBindable && classIs(stepBindable, "BindableEvent")) {
			stepBindable.Fire();
			lastBallStep = now;
		}
	}
}

function onBallRemoved(obj: Instance): void {
	const destroyBindable = obj.FindFirstChild("Destroy");
	if (destroyBindable && classIs(destroyBindable, "BindableEvent")) {
		destroyBindable.Fire();
	}
}

export = (): void => {
	RunService.Heartbeat.Connect(onStep);
	CollectionService.GetInstanceRemovedSignal(BALL_TAG).Connect(onBallRemoved);
};
