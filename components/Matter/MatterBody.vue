<script>
	import { World } from 'matter-js'

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
			geometry: function() { // Virtual property to implement in extended component
				return null
			},
			body: function() {
				return this.createBody(this.physic)
			},
		},
		mounted: function() {
			this.addBody()
			console.log('mounted')
		},
		beforeDestroy: function() {
			this.removeBody()
		},
		methods: {
			createBody: function() { // Virtual method to implement in extended component
				return null
			},
			addBody: function() {
				World.add(this.world, this.body)
			},
			removeBody: function() {
				World.remove(this.world, this.body)
			},
		},
	}
</script>
