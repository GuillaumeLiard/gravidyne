export const state = function() {
	return {
		// bodies: [],
		bodies: [
			// {
			// 	type: 'Circle',
			// 	geometryPercent: {
			// 		x: 0.5,
			// 		y: 0.5,
			// 		radius: 0.2,
			// 	},
			// 	physic: {
			// 		friction: 0.1,
			// 		frictionAir: 0.001,
			// 		restitution: 1,
			// 	}
			// },
			{
				type: 'Rectangle',
				// 400, 0, 800, 50, { isStatic: true }
				geometryPercent: {
					x: 0.5,
					y: 0,
					width: 1,
					height: 1 / 12,
				},
				physic: {
					isStatic: true
				}
			}
		]
	}
}

export const getters = {
	getBodies(state) {
		return state.bodies
	}
}
