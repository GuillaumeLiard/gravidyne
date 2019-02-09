export const state = function() {
	return {
		// bodies: [],
		bodies: [
			{
				id: 1,
				type: 'Circle',
				initialGeometryPercent: {
					x: 0.5,
					y: 0.5,
					radius: 0.2,
				},
				physic: {
					friction: 0.1,
					frictionAir: 0.001,
					restitution: 1,
					// isStatic: true,
				}
			},
			// {
			// 	id: 2,
			// 	type: 'Rectangle',
			// 	geometryPercent: {
			// 		x: 0.5,
			// 		y: 0,
			// 		width: 1,
			// 		height: 1 / 12,
			// 	},
			// 	physic: {
			// 		isStatic: true,
			// 		restitution: 1
			// 	}
			// },
			// {
			// 	id: 3,
			// 	type: 'Rectangle',
			// 	geometryPercent: {
			// 		x: 0.5,
			// 		y: 1,
			// 		width: 1,
			// 		height: 1 / 12,
			// 	},
			// 	physic: {
			// 		isStatic: true,
			// 	}
			// },
			// {
			// 	id: 4,
			// 	type: 'Rectangle',
			// 	geometryPercent: {
			// 		x: 1,
			// 		y: 0.5,
			// 		width: 1 / 12,
			// 		height: 2,
			// 	},
			// 	physic: {
			// 		isStatic: true,
			// 		restitution: 1
			// 	}
			// },
			// {
			// 	id: 5,
			// 	type: 'Rectangle',
			// 	geometryPercent: {
			// 		x: 0,
			// 		y: 0.5,
			// 		width: 1 / 12,
			// 		height: 1,
			// 	},
			// 	physic: {
			// 		isStatic: true,
			// 		restitution: 1
			// 	}
			// },
			// {
			// 	id: 6,
			// 	type: 'Rectangle',
			// 	geometryPercent: {
			// 		x: 0.25,
			// 		y: 1 / 6,
			// 		width: 0.08,
			// 		height: 0.1,
			// 	},
			// 	physic: {
			// 		frictionAir: 0.001
			// 	}
			// },
			// {
			// 	id: 7,
			// 	type: 'Rectangle',
			// 	geometryPercent: {
			// 		x: 0.50,
			// 		y: 1 / 6,
			// 		width: 0.08,
			// 		height: 0.1,
			// 	},
			// 	physic: {
			// 		frictionAir: 0.05
			// 	}
			// },
			// {
			// 	id: 8,
			// 	type: 'Rectangle',
			// 	geometryPercent: {
			// 		x: 0.75,
			// 		y: 1 / 6,
			// 		width: 0.08,
			// 		height: 0.1,
			// 	},
			// 	physic: {
			// 		frictionAir: 0.1
			// 	}
			// },
		]
	}
}

export const getters = {
	getBodies(state) {
		return state.bodies
	}
}
