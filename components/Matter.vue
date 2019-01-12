<template>
	<div ref="mainArea">
		<div class="virtual">
			<div class="bodies">
				<component
				v-for="(body, index) in bodies"
				:is="getComponentByType(body.type)"
				:key="index"
				:world="world"
				:width="width"
				:height="height"
				:geometryPercent="body.geometryPercent"
				:physic="body.physic"
				/>
			</div>
			<div class="constraints">
				<MatterConstraint
				v-for="(constraint, index) in constraints"
				:key="index"
				:world="world"
				:width="width"
				:height="height"
				:physic="constraint.physic"
				:geometryPercentPointA="constraint.geometryPercentPointA"
				:idBodyB="constraint.idBodyB"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import MatterBodyRectangle from '~/components/Matter/MatterBodyRectangle'
import MatterBodyCircle from '~/components/Matter/MatterBodyCircle'
import MatterConstraint from '~/components/Matter/MatterConstraint'

// https://github.com/liabru/matter-js/blob/master/examples/airFriction.js
export default {
	components: {
		MatterBodyRectangle,
		MatterBodyCircle,
		MatterConstraint,
	},
	data: function() {
		return {
			width: 800,
			height: 600,
			world: null,
		}
	},
	computed: {
		bodies: function() {
			return this.$store.getters['bodies/getBodies']
		},
		constraints: function() {
			return this.$store.getters['constraints/getConstraints']
		}
	},
	beforeMount: function() {
		this.initMatterWorld()
	},
	mounted: function() {
		this.initMatterRender()
	},
	methods: {
		getComponentByType: function(type) {
			switch(type) {
				case 'Circle' :
					return MatterBodyCircle
				case 'Rectangle' :
					return MatterBodyRectangle
			}
		},
		initMatterWorld: function() {
			// this.bodies
			console.log('matter before mounted')
			this.Matter = require('matter-js')
			const { Matter } = this
			let Example = Example || {}


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
	},


}
</script>

<style>
	canvas {
		border: 1px solid black;
	}
</style>
