<script>
	import { Bodies } from 'matter-js'

	import MatterBody from '~/components/Matter/MatterBody'

	export default {
		extends: MatterBody,
		methods: {
			computeGeometry: function() {
				const { gp } = this.geometryPercent
				return {
					x: gp.x * this.width,
					y: gp.y * this.height,
					radius: gp.radius * this.height,
				}
			},
			createBody: function(physic) {
				const { geo } = this
				return Bodies.circle(geo.x, geo.y, geo.radius, {...physic})
			},
		},
	}
</script>
