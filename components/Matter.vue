<template>
	<div ref="mainArea">
		<div class="virtual">
			<MatterCircle
				:world="world"
				:width="width"
				:height="height"
				/>
		</div>
	</div>
</template>

<script>
import MatterCircle from '~/components/MatterCircle'

// https://github.com/liabru/matter-js/blob/master/examples/airFriction.js
export default {
	components: {
		MatterCircle,
	},
	data: function() {
		return {
			width: 800,
			height: 600,
			world: null
		}
	},
	beforeMount: function() {
		this.initMatterWorld();
	},
	mounted: function() {
		this.initMatterRender();
	},
	methods: {
		initMatterWorld: function() {
			// this.bodies
			console.log('matter before mounted')
			this.Matter = require('matter-js')
			const { Matter } = this
			let Example = Example || {}


			const width = 800
			const height = 600

			const build = function() {
				let Engine = Matter.Engine,
				Runner = Matter.Runner,
				MouseConstraint = Matter.MouseConstraint,
				Mouse = Matter.Mouse,
				World = Matter.World,
				Bodies = Matter.Bodies

				// create engine
				let engine = Engine.create(),
				world = engine.world

				World.add(world, [
					// circle.body,

					Bodies.rectangle(200, 100, 60, 60, { frictionAir: 0.001 }),
					Bodies.rectangle(400, 100, 60, 60, { frictionAir: 0.05 }),
					Bodies.rectangle(600, 100, 60, 60, { frictionAir: 0.1 }),

					// walls
					Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
					Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
					Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
					Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
				])
				return {
					World: World,
					world: world,
					engine: engine,
				}
			}
			this.param = build()
			this.World = this.param.World
			this.world = this.param.world
			this.engine = this.param.engine
		},
		initMatterRender: function() {
			const { Render,
				Runner,
				Mouse,
				MouseConstraint,
				World,
			} = this.Matter
			const { mainArea } = this.$refs
			const {
				engine,
				world,
				width,
				height,
			} = this
			// create renderer
			let render = Render.create({
				element: mainArea,
				// element: document.body,
				engine: engine,
				options: {
					width,
					height,
					showVelocity: true,
					// wireframes: false
				},
			})
			Render.run(render)

			let runner = Runner.create()

			Runner.run(runner, engine)

			// add mouse control
			let mouse = Mouse.create(render.canvas),
			mouseConstraint = MouseConstraint.create(engine, {
				mouse: mouse,
				constraint: {
					stiffness: 0.2,
					angularStiffness: 0,
					render: {
						visible: false
					}
				}
			})
			World.add(world, mouseConstraint)
			// keep the mouse in sync with rendering
			render.mouse = mouse

			// fit the render viewport to the scene
			Render.lookAt(render, {
				min: { x: 0, y: 0 },
				max: { x: 800, y: 600 }
			})
		},
		// makeCircle: function(width, height) {
		// 	const { Matter } = this
		// 	const { Bodies } = Matter
		// 	//
		// 	// let circle = {
		// 	// 	geometry: {
		// 	// 		px: 0.5,
		// 	// 		py: 0.5,
		// 	// 		pradius: 0.2,
		// 	// 	},
		// 	// 	physic: {
		// 	// 		friction: 0.1,
		// 	// 		frictionAir: 0.001,
		// 	// 		restitution: 0,
		// 	// 	}
		// 	// }
		// 	//
		// 	// circle.geometry = {
		// 	// 	...circle.geometry,
		// 	// 	x: (() => circle.geometry.px * width)(),
		// 	// 	y: (() => circle.geometry.py * height)(),
		// 	// 	radius: (() => circle.geometry.pradius * height)(),
		// 	// }
		// 	//
		// 	// const { geometry, physic } = circle
		// 	//
		// 	// circle.body = Bodies.circle(geometry.x, geometry.y, geometry.radius)
		// 	// for (let prop of Object.getOwnPropertyNames(physic)) {
		// 	// 	circle.body[prop] = physic[prop]
		// 	// }
		//
		// 	let axe = {
		// 		px: 0.5,
		// 		py: 0.5,
		// 		pradius: 0.1
		// 	}
		//
		// 	axe.x = axe.px * width
		// 	axe.y = axe.py * height
		//
		// 	const { Constraint } = Matter
		// 	const axisConstraint = Constraint.create({
		// 		pointA: axe,
		// 		bodyB: circle.body,
		// 		// angularStiffness: 0,
		// 		stiffness: 1,
		// 		// damping: 0.1,
		// 	})
		//
		// 	circle.axisConstraint = axisConstraint
		//
		//
		//
		// 	return circle
		// }
	},


}
</script>

<style>
	canvas {
		border: 1px solid black;
	}
</style>