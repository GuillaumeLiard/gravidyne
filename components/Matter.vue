<template>
	<div ref="mainArea"/>
</template>

<script>
// https://github.com/liabru/matter-js/blob/master/examples/airFriction.js
export default {
	methods: {
		makeCircle: function(width, height) {
			const { Matter } = this
			let circle = {
				px: 0.5,
				py: 0.5,
				pradius: 0.4
			}

			circle.x = circle.px * width
			circle.y = circle.py * height
			circle.radius = circle.pradius * height

			let Bodies = Matter.Bodies
			circle.body = Bodies.circle(circle.x, circle.y, circle.radius)

			return circle
		}
	},
	mounted: function() {
		this.Matter = require('matter-js')
		const { Matter } = this
		let Example = Example || {}
		const { mainArea } = this.$refs

		const width = 800
		const height = 600

		const { makeCircle } = this

		Example.airFriction = function() {
			let Engine = Matter.Engine,
			Render = Matter.Render,
			Runner = Matter.Runner,
			MouseConstraint = Matter.MouseConstraint,
			Mouse = Matter.Mouse,
			World = Matter.World,
			Bodies = Matter.Bodies

			// create engine
			let engine = Engine.create(),
			world = engine.world

			// create renderer
			let render = Render.create({
				element: mainArea,
				// element: document.body,
				engine: engine,
				options: {
					width,
					height,
					showVelocity: true
				}
			})

			Render.run(render)

			// create runner
			let runner = Runner.create()
			Runner.run(runner, engine)

			// add bodies
			World.add(world, [
				makeCircle(width, height).body,

				Bodies.rectangle(200, 100, 60, 60, { frictionAir: 0.001 }),
				Bodies.rectangle(400, 100, 60, 60, { frictionAir: 0.05 }),
				Bodies.rectangle(600, 100, 60, 60, { frictionAir: 0.1 }),

				// walls
				Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
				Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
				Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
				Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
			])

			// add mouse control
			let mouse = Mouse.create(render.canvas),
			mouseConstraint = MouseConstraint.create(engine, {
				mouse: mouse,
				constraint: {
					stiffness: 0.2,
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

			// context for MatterTools.Demo
			return {
				engine: engine,
				runner: runner,
				render: render,
				canvas: render.canvas,
				stop: function() {
					Matter.Render.stop(render)
					Matter.Runner.stop(runner)
				}
			}
		}
		Example.airFriction()
		console.log('air friction')
	}
}
</script>

<style>
	canvas {
		border: 1px solid black;
	}
</style>
