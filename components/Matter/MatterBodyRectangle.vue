<script>
	import { Bodies } from 'matter-js'

	import MatterBody from '~/components/Matter/MatterBody'

	export default {
		extends: MatterBody,
		computed: {
			geometry: function() {
				const { geometryPercent: gp, sceneBounds } = this
				const { width, height } = sceneBounds
				return {
					x: gp.x * width,
					y: gp.y * height,
					width: gp.width * width,
					height: gp.height * height,
				}
			},
		},
		methods: {
			createBody: function() {
				const { geometry: geo, physic } = this
				return Bodies.rectangle(geo.x, geo.y, geo.width, geo.height, {...physic})
			},
		},
	}
</script>
