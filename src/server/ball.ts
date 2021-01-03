import { CollectionService, ReplicatedStorage } from "@rbxts/services";
import Make from "@rbxts/make";
import { DEFAULT_GRAVITY, DEFAULT_AIR_RESISTANCE, BALL_TAG, BALL_CLASS } from "shared/ball-data";

export class Ball {
	static test = 0; // this is visible to the entire class, rather than being an instance member
	obj: BALL_CLASS;
	gravity: Vector3;
	airResistance: number;

	configFolder: Folder;

	constructor(obj: BALL_CLASS) {
		this.gravity = DEFAULT_GRAVITY;
		this.airResistance = DEFAULT_AIR_RESISTANCE;
		this.obj = obj;

		this.makeChildren();
		this.configFolder = this.obj.WaitForChild("ConfigFolder") as Folder;

		if (!CollectionService.HasTag(this.obj, BALL_TAG)) CollectionService.AddTag(this.obj, BALL_TAG);
	}

	getVelocity(): Vector3 {
		return (this.configFolder.FindFirstChild("Velocity") as Vector3Value).Value;
	}

	setVelocity(newValue: Vector3): void {
		(this.configFolder.FindFirstChild("Velocity") as Vector3Value).Value = newValue;
	}

	getPosition(): Vector3 {
		return (this.configFolder.FindFirstChild("Position") as Vector3Value).Value;
	}

	setPosition(newValue: Vector3): void {
		(this.configFolder.FindFirstChild("Position") as Vector3Value).Value = newValue;
	}

	makeChildren(): void {
		// for replication & configuration
		Make("Configuration", {
			Name: "ConfigFolder",
			Parent: this.obj,
			Children: [
				Make("Vector3Value", {
					Name: "Velocity",
					Value: new Vector3(),
				}),
				Make("Vector3Value", {
					Name: "Position",
					Value: new Vector3(),
				}),
			],
		});
		Make("BindableEvent", {
			Name: "Step",
			Parent: this.obj,
			Event: () => {
				// if we used a normal function it may glitch out because 'this' would be based on the environment in which the event is called // try it for yourself! :o
				this.step();
			},
		});
	}

	step(): void {
		this.motionStep();
	}

	// **************************************************************** HOLD UP IS IT EVEN WORTH IT FOR CUSTOM PHYSICS??! YES. YES IT FUCKING IS. i tried without it and it felt awful  *****
	motionStep(): void {
		// eslint-disable-next-line prettier/prettier
		this.setVelocity(
			this.getVelocity()
				.sub(this.gravity)
				.mul(this.airResistance)
		);

		// eslint-disable-next-line prettier/prettier
		this.setPosition(
			this.getPosition()
				.add(this.getVelocity().mul(0.1))
		);
	}

	destroy(): void {
		if (CollectionService.HasTag(this.obj, BALL_TAG)) {
			CollectionService.RemoveTag(this.obj, BALL_TAG);
		}
	}
}
