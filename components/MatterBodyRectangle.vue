<script>
	import { Bodies } from 'matter-js'

	import MatterBody from '~/components/matter/MatterBody'

	export default {
		extends: MatterBody,
		methods: {
			computeGeometry: function() {
				const { gp } = this.geometryPercent
				return {
					x: this.geometryPercent.x * this.width,
					y: this.geometryPercent.y * this.height,
					width: this.geometryPercent.width * this.width,
					height: this.geometryPercent.height * this.height,
				}
			},
			createBody: function(physic) {
				return Bodies.rectangle(this.geometry.x, this.geometry.y, this.geometry.width, this.geometry.height, {...physic})
			},
		},
	}
</script>
