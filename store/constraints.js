export const state = function() {
	return {
		constraints: [
			{
				idBodyA: -1, // world
				geometryPercentPointA: {
					x: 0.5,
					y: 0.5,
				},
				idBodyB: 1,
				geometryPercentPointB: {
					x: 0,
					y: 0,
				},
				physic: {
					// angularStiffness: 0,
					stiffness: 1,
					length: 0,
					// damping: 0.1,
				}
			},
			{
				idBodyA: 1,
				geometryPercentPointA: {
					x: 0.1,
					y: 0,
				},
				idBodyB: 6,
				geometryPercentPointB: {
					x: 0,
					y: 0.05,
				},
				physic: {
					// angularStiffness: 0,
					stiffness: 1,
					length: 0,
					// damping: 0.1,
				}
			},
		]
	}
}


export const getters = {
	getConstraints(state) {
		return state.constraints
	}
}
