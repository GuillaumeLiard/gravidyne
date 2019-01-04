export const state = function() {
	return {
		constraints: [
			{
				pointA: {
					x: 300,
					y: 300,
					// px: 0.5,
					// py: 0.5,
				},
				bodyB: {

				},
				physic: {
					// angularStiffness: 0,
					stiffness: 0.5,
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
