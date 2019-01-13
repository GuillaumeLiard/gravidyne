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
import {
	Engine,
	Runner,
	Mouse,
	MouseConstraint,
	World,
	Render
} from 'matter-js'
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
		this.initMatterEngine()
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
		initMatterEngine: function() {
			this.engine = Engine.create()
			this.world = this.engine.world
		},

		initMatterRender: function() {
			const { mainArea } = this.$refs
			let {
				engine,
				width,
				height,
			} = this

			let render = this.render = Render.create({
				element: mainArea,
				engine: engine,
				options: {
					width,
					height,
					showVelocity: true,
				},
			})
			// fit the render viewport to the scene
			Render.lookAt(render, {
				min: { x: 0, y: 0 },
				max: { x: 800, y: 600 }
			})
			Render.run(render)

			let runner = Runner.create()
			Runner.run(runner, engine)

			this.addMouseControl()

		},
		addMouseControl() {
			let { engine, render } = this
			let { world } = engine
			let mouse = Mouse.create(render.canvas)
			let mouseConstraint = MouseConstraint.create(engine, {
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
		}
	},


}
</script>

<style>
	canvas {
		border: 1px solid black;
	}
</style>
