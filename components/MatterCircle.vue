<script>
	import { Bodies } from 'matter-js'

	export default {
		render: function() {
			return null
		},
		props: {
			world: {
				type: Object,
				default: () => null
			},
			width: {
				type: Number,
				default: () => 0
			},
			height: {
				type: Number,
				default: () => 0
			},
			geometryPercent: {
				type: Object,
				default: () => {}
			},
			physic: {
				type: Object,
				default: () => {}
			},
		},
		computed: {
			geometry: function() {
				const { gp } = this.geometryPercent
				return {
					x: this.geometryPercent.x * this.width,
					y: this.geometryPercent.y * this.height,
					radius: this.geometryPercent.radius * this.height,
				}
			},
			body: function() {
				let body = Bodies.circle(this.geometry.x, this.geometry.y, this.geometry.radius)
				for (let prop of Object.getOwnPropertyNames({...this.physic})) {
					body[prop] = this.physic[prop]
				}
				return body
			},
		},
		beforeMount: function() {
			this.init()
		},
		mounted: function() {
			this.addBody()
		},
		beforeDestroy: function() {
			this.removeBody()
		},
		methods: {
			init: function() {
				const { World } = require('matter-js')
				this.World = World
			},
			addBody: function() {
				const { World } = this
				World.add(this.world, this.body)
			},
			removeBody: function() {
				const { World } = this
				World.remove(this.world, this.body)
			},
		},
	}
</script>
