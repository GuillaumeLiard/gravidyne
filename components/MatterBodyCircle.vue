<script>
	import { Bodies } from 'matter-js'

	import MatterBody from '~/components/MatterBody'

	export default {
		extends: MatterBody,
		methods: {
			computeGeometry: function() {
				const { gp } = this.geometryPercent
				return {
					x: this.geometryPercent.x * this.width,
					y: this.geometryPercent.y * this.height,
					radius: this.geometryPercent.radius * this.height,
				}
			},
			createBody: function(physic) {
				return Bodies.circle(this.geometry.x, this.geometry.y, this.geometry.radius, {...physic})
			},
		},
	}
</script>
