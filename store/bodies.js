export const state = function() {
	return {
		// bodies: [],
		bodies: [
			{
				type: 'Circle',
				geometryPercent: {
					x: 0.5,
					y: 0.5,
					radius: 0.2,
				},
				physic: {
					friction: 0.1,
					frictionAir: 0.001,
					restitution: 1,
				}
			},
			{
				type: 'Rectangle',
				geometryPercent: {
					x: 0.5,
					y: 0,
					width: 1,
					height: 1 / 12,
				},
				physic: {
					isStatic: true,
					restitution: 1
				}
			},
			{
				type: 'Rectangle',
				geometryPercent: {
					x: 0.5,
					y: 1,
					width: 1,
					height: 1 / 12,
				},
				physic: {
					isStatic: true,
				}
			},
			{
				type: 'Rectangle',
				geometryPercent: {
					x: 1,
					y: 0.5,
					width: 1 / 12,
					height: 2,
				},
				physic: {
					isStatic: true,
					restitution: 1
				}
			},
			{
				type: 'Rectangle',
				geometryPercent: {
					x: 0,
					y: 0.5,
					width: 1 / 12,
					height: 1,
				},
				physic: {
					isStatic: true,
					restitution: 1
				}
			},
			{
				type: 'Rectangle',
				geometryPercent: {
					x: 0.25,
					y: 1 / 6,
					width: 0.08,
					height: 0.1,
				},
				physic: {
					frictionAir: 0.001
				}
			},
			{
				type: 'Rectangle',
				geometryPercent: {
					x: 0.50,
					y: 1 / 6,
					width: 0.08,
					height: 0.1,
				},
				physic: {
					frictionAir: 0.05
				}
			},
			{
				type: 'Rectangle',
				geometryPercent: {
					x: 0.75,
					y: 1 / 6,
					width: 0.08,
					height: 0.1,
				},
				physic: {
					frictionAir: 0.1
				}
			},
		]
	}
}

export const getters = {
	getBodies(state) {
		return state.bodies
	}
}
