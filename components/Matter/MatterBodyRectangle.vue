<script>
	import { Bodies } from 'matter-js'

	import MatterBody from '~/components/Matter/MatterBody'

	export default {
		extends: MatterBody,
		computed: {
			geometry: function() {
				const { geometryPercent: gp } = this
				return {
					x: gp.x * this.width,
					y: gp.y * this.height,
					width: gp.width * this.width,
					height: gp.height * this.height,
				}
			},
		},
		methods: {
			createBody: function(physic) {
				let { geometry: geo } = this
				return Bodies.rectangle(geo.x, geo.y, geo.width, geo.height, {...physic})
			},
		},
	}
</script>
