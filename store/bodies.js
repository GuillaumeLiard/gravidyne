export const state = function() {
	return {
		// bodies: [],
		bodies: [
			{
				type: 'circle',
				geometry: {
					px: 0.5,
					py: 0.5,
					pradius: 0.1,
				},
			}
		]
	}
}

export const getters = {
	getBodies(state) {
		return state.bodies
	}
}
