<template>
	<div ref="mainArea">
		<div class="virtual">
			<div class="bodies">
				<component
					v-if="engine"
					v-for="(body) in bodies"
					:is="getComponentByType(body.type)"
					:internalId="body.id"
					:key="resizeToken + body.id"
					:world="engine.world"
					:sceneBounds="{sceneWidth: width, sceneHeight: height}"
					:initialGeometryPercent="body.initialGeometryPercent"
					:physic="body.physic"
				/>
			</div>
			<div class="constraints">
				<MatterConstraint
					v-if="engine"
					v-for="(constraint, index) in constraints"
					:key="resizeToken + index"
					:world="engine.world"
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
			engine: null,
			world: null,
			resizeToken: 0,
			abc: 1,
		}
	},
	computed: {
		bodies: function() {
			return this.$store.getters['bodies/getBodies']
		},
		constraints: function() {
			return this.$store.getters['constraints/getConstraints']
		},
	},
	mounted: function() {
		this.resize()
		this.build()
		window.addEventListener('resize', () => this.reset())
	},
	methods: {
		reset: function(x = 1) {
			for (let i = 0; i< x; i++) {
				this.destroy()
				this.resize()
				this.build()
				// this.resizeToken++
			}
		},
		build: function() {
			this.buildEngine()
			this.buildRunner()
			this.buildRenderer()
			this.addMouseControl()
		},
		destroy: function() {
			this.destroyRenderer()
			this.destroyRunner()
			this.destroyEngine()
		},
		buildEngine: function() {
			this.engine = Engine.create()
		},
		buildRunner: function() {
			this.runner = Runner.create()
			Runner.run(this.runner, this.engine)
		},
		buildRenderer: function() {
			const { width, height } = this
			const { mainArea } = this.$refs

			this.renderer = Render.create({
				element: mainArea,
				engine: this.engine,
				options: {
					width,
					height,
					showVelocity: true,
					pixelRatio: 'auto'
				},
			})
			Render.lookAt(this.renderer, {
				min: { x: 0, y: 0 },
				max: { x: width, y: height }
			})
			Render.run(this.renderer)
		},
		destroyRenderer: function() {
			const { parentNode } = this.renderer.canvas
			Render.stop(this.renderer)
			parentNode.removeChild(this.renderer.canvas)
			this.renderer = null
		},
		destroyRunner: function() {
			Runner.stop(this.runner)
			this.runner = null
		},
		destroyEngine: function() {
			this.world = null
			Engine.clear(this.engine)
			this.engine.events = {}
			this.engine = null
		},
		updated: function() {

		},
		resize: function() {
			const {height} = document.querySelector('.v-toolbar__content').getBoundingClientRect()
			const paddingTop = document.querySelector('main.v-content').style.paddingTop
			const [px] = paddingTop.split('px')
			const offset = parseInt(px)
			this.width = window.innerWidth
			this.height = window.innerHeight - height - offset
		},
		getComponentByType: function(type) {
			switch(type) {
				case 'Circle' :
					return MatterBodyCircle
				case 'Rectangle' :
					return MatterBodyRectangle
			}
		},
		addMouseControl() {
			let { engine, renderer } = this
			let { world } = engine
			let mouse = Mouse.create(renderer.canvas)
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
			renderer.mouse = mouse
		}
	},


}
</script>

<style>
	canvas {
		border: 1px solid black;
	}
</style>
