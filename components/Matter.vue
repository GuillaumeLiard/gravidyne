<template>
	<div ref="mainArea">
		<div class="virtual">
			<Button @click="reset(100)">
			<!-- <Button @click="reset(1)"> -->
			<!-- <Button @click="abc++"> -->
				Reset {{abc}}
			</Button>
			<div class="bodies">
				<component
				v-if="engine"
				v-for="(body) in bodies"
				:is="getComponentByType(body.type)"
				:key="resizeToken + body.id"
				:world="engine.world"
				:width="width"
				:height="height"
				:geometryPercent="body.geometryPercent"
				:physic="body.physic"
				/>
			</div>
			<!-- <div class="constraints">
				<MatterConstraint
				v-for="(constraint, index) in constraints"
				:key="resizeToken + index"
				:world="world"
				:width="width"
				:height="height"
				:physic="constraint.physic"
				:geometryPercentPointA="constraint.geometryPercentPointA"
				:idBodyB="constraint.idBodyB"
				/>
			</div> -->
		</div>
	</div>
</template>

<script>
import {
	Composite,
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
		this.build()
		// window.addEventListener('resize', this.resize)
		// this.resize()
	},
	methods: {
		reset: function(x = 1) {
			const bodies = Composite.allBodies(this.engine.world)
			for (let i = 0; i< x; i++) {
				console.log('rebuild')
				this.destroy()
				this.build()
				this.resizeToken++
			}
			const bodiesAfter = Composite.allBodies(this.engine.world)
		},
		build: function() {
			this.buildEngine()
			this.buildRunner()
			this.buildRenderer()
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
			const { engine, width, height } = this
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
			// this.renderer.canvas.setAttribute('width', width)
			// this.renderer.canvas.setAttribute('height', height)
			// render.canvas.height = height
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
		// runnerRun: function() {
		// 	const {engine} = this
		// 	let runner = Runner.create()
		// 	Runner.run(runner, engine)
		// },
		// resize: function() {
		// 	// const {
		// 	// 	width,
		// 	// 	height,
		// 	// } = this
		// 	// const {
		// 	// 	width,
		// 	// 	height,
		// 	// } = this.$el.getBoundingClientRect()
		// 	let {
		// 		engine,
		// 		render,
		// 	} = this
		//
		// 	Engine.clear(engine)
		//
		// 	// console.log(this.viewport)
		// 	this.width = window.innerWidth
		// 	this.height = window.innerHeight
		//
		// 	// this.resizeToken++
		// 	// this.render.canvas.remove()
		// 	this.initMatterRender()
		//
		// },
		// updateRendererSize: function() {
		// 	// let { render, width, height } = this
		// 	let { render} = this
		// 	const { width, height } = this
		// 	render.canvas.setAttribute('width', width)
		// 	render.canvas.setAttribute('height', height)
		// 	// render.canvas.height = height
		// 	Render.lookAt(render, {
		// 		min: { x: 0, y: 0 },
		// 		max: { x: width, y: height }
		// 	})
		// },
		getComponentByType: function(type) {
			switch(type) {
				case 'Circle' :
					return MatterBodyCircle
				case 'Rectangle' :
					return MatterBodyRectangle
			}
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
