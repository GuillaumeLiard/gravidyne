export const state = function() {
	return {
		constraints: [
			{
				geometryPercentPointA: {
					x: 0.5,
					y: 0.5,
				},
				idBodyB: 1,
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
