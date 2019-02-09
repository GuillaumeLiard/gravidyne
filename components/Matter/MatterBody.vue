<script>
	import { World } from 'matter-js'

	export default {
		render: function() {
			return null
		},
		data: function() {
			return {
				body: null,
				savedGeometryPercent: null,
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
					sceneWidth: 0,
					sceneHeight: 0,
				})
			},
			initialGeometryPercent: {
				type: Object,
				default: () => {}
			},
			physic: {
				type: Object,
				default: () => {}
			},
		},
		computed: {
			geometryPercent: function() {
				let { savedGeometryPercent: sgp, initialGeometryPercent: igp } = this
				return sgp || igp
			},
			geometry: function() {
				const { geometryPercent, sceneBounds } = this
				return this.percentToAbsolute(geometryPercent, sceneBounds)
			},
		},
		methods: {
			createBody: function() { // Virtual method to implement in extended component
				return null
			},
			percentToAbsolute: function() { // Virtual method to implement in extended component
				return null
			},
			absoluteToPercent: function() { // Virtual method to implement in extended component
				return null
			},
		},
		watch: {
			sceneBounds: function(newBounds, oldBounds) {
				const {geometry} = this
				const {position} = this.body ? this.body : {}
				const g = {
					...geometry,
					...position,
				}
				const bounds = {
					...newBounds,
					...oldBounds,
				}
				this.savedGeometryPercent = this.absoluteToPercent(g, bounds)
			},
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
