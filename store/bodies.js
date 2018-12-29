export const state = function() {
	return {
		// bodies: [],
		bodies: [
			{
				type: 'circle',
				geometryPercent: {
					x: 0.5,
					y: 0.5,
					radius: 0.2,
				},
				physic: {
					friction: 0.1,
					frictionAir: 0.001,
					restitution: 0,
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
