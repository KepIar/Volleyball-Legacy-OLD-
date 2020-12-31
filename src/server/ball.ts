import { CollectionService } from "@rbxts/services";
import Make from "@rbxts/make";
import { DEFAULT_GRAVITY, DEFAULT_AIR_RESISTANCE, BALL_TAG, BALL_CLASS } from "shared/ball-data";

export class Ball {
	static test = 0; // this is visible to the entire class, rather than being an instance member
	obj: BALL_CLASS;
	gravity: Vector3;
	airResistance: number;

	velocity: Vector3;

	constructor(obj: BALL_CLASS) {
		this.gravity = DEFAULT_GRAVITY;
		this.airResistance = DEFAULT_AIR_RESISTANCE;
		this.velocity = new Vector3();
		this.obj = obj;

		this.makeChildren();
	}

	makeChildren() {
		// todo: configuration folder with fake velocities and other properties
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

	motionStep(): void {
		this.velocity = this.velocity.sub(this.gravity);
		this.velocity = this.velocity.mul(this.airResistance);

		//this.obj.Velocity = this.velocity;
	}

	destroy(): void {
		if (CollectionService.HasTag(this.obj, BALL_TAG)) {
			CollectionService.RemoveTag(this.obj, BALL_TAG);
		}
	}
}
