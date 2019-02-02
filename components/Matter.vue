<template>
	<div ref="mainArea">
		<div class="virtual">
			<div class="bodies">
				<component
				v-for="(body) in bodies"
				:is="getComponentByType(body.type)"
				:key="resizeToken + body.id"
				:world="world"
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
			world: null,
			resizeToken: 0
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
	beforeMount: function() {
		// this.initMatterEngine()
		this.build()
	},
	mounted: function() {
		// this.build()
		// this.build()
		// this.initMatterRender()
		this.buildRenderer()
		this.buildRunner()
		// this.addMouseControl()
		// Render.run(this.render)
		// this.runnerRun()
		// window.addEventListener('resize', this.resize)
		// this.resize()
	},
	methods: {
		build: function() {
			this.buildEngine()
			// this.buildRunner()
			// this.buildRenderer()
			// this.buildWorld()
		},
		buildEngine: function() {
			// this.engine = this.engine ? this.engine : Engine.create()
			this.engine = Engine.create()
			this.world = this.engine.world
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
		destroy: function() {
			this.destroyRenderer()
			this.destroyRunner()
			this.destroyEngine()
		},

		destroyRenderer: function() {
			this.renderer = null
		},
		destroyRunner: function() {
			Runner.stop(this.runner)
			this.runner = null
		},
		destroyEngine: function() {
			this.world = null
			Engine.clear(this.engine)
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
		// initMatterEngine: function() {
		// 	this.engine = Engine.create()
		// 	this.world = this.engine.world
		// },

		// initMatterRender: function() {
		// 	const { mainArea } = this.$refs
		// 	let {
		// 		engine,
		// 	} = this
		// 	let {
		// 		width,
		// 		height,
		// 	} = this
		//
		// 	if (this.render) {
		// 		console.log('a')
		// 		// Matter.Render.stop(render)
		// 		this.engine.enabled = false
		// 		Render.stop(this.render)
		// 	}
		// 	this.render = Render.create({
		// 		element: mainArea,
		// 		engine: engine,
		// 		options: {
		// 			width,
		// 			height,
		// 			showVelocity: true,
		// 			pixelRatio: 'auto'
		// 		},
		// 	})
		// 	return;
		// 	// fit the render viewport to the scene
		// 	// Render.lookAt(render, {
		// 	// 	min: { x: 0, y: 0 },
		// 	// 	max: { x: 800, y: 600 }
		// 	// })
		// 	// Render.run(render)
		//
		// 	// let runner = Runner.create()
		// 	// Runner.run(runner, engine)
		//
		// 	// this.addMouseControl()
		// },
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
