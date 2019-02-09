<script>
	import { World } from 'matter-js'

	export default {
		render: function() {
			return null
		},
		data: function() {
			return {
				body: null
			}
		},
		props: {
			world: {
				type: Object,
				default: () => null
			},
			sceneBounds: {
				type: Object,
				default: () => ({
					width: 0,
					height: 0,
				})
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
		},
		methods: {
			createBody: function() { // Virtual method to implement in extended component
				return null
			},
		},
		watch: {
			geometry: function() {
				this.body = this.createBody()
			},
			body: function(newBody, oldBody) {
				if (oldBody) World.remove(this.world, oldBody)
				World.add(this.world, newBody)
			},
		},
	}
</script>
