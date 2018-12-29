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
				return this.computeGeometry();
			},
			body: function() {
				// let body = this.createBody(this.physic)
				return this.createBody(this.physic)
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
			computeGeometry: function() {
				// Virtual method to implement in extended component
			},
			createBody: function() {
				// Virtual method to implement in extended component
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
