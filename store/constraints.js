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
					stiffness: 1,
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
