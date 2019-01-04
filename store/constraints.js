export const state = function() {
	return {
		constraints: [
			{
				geometryPercentPointA: {
					x: 0.5,
					y: 0.5,
					// x: 300,
					// y: 300,
					// px: 0.5,
					// py: 0.5,
				},
				idBodyB: 1,
				physic: {
					// angularStiffness: 0,
					stiffness: 0.5,
					// stiffness: 0.5,
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
