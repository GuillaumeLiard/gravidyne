<script>
	import { Bodies } from 'matter-js'

	import MatterBody from '~/components/Matter/MatterBody'

	export default {
		extends: MatterBody,
		methods: {
			createBody: function() {
				const { geometry: geo, physic } = this
				return Bodies.circle(geo.x, geo.y, geo.radius, {...physic})
			},
			percentToAbsolute: function({x, y, radius}, {sceneWidth, sceneHeight}) {
				return {
					x: x * sceneWidth,
					y: y * sceneHeight,
					radius: radius * sceneHeight,
				}
			},
			absoluteToPercent: function({x, y, radius}, { sceneWidth, sceneHeight}) {
				return {
					x: x / sceneWidth,
					y: y / sceneHeight,
					radius: radius / sceneHeight,
				}
			},
		},
	}
</script>
