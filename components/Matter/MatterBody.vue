<script>
	import { World, Bodies } from 'matter-js'

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
				return this.createBody(this.physic)
			},
		},
		mounted: function() {
			this.addBody()
		},
		beforeDestroy: function() {
			this.removeBody()
		},
		methods: {
			addBody: function() {
				World.add(this.world, this.body)
			},
			removeBody: function() {
				World.remove(this.world, this.body)
			},
			computeGeometry: function() {
				// Virtual method to implement in extended component
			},
			createBody: function() {
				// Virtual method to implement in extended component
			},
		},
	}
</script>
