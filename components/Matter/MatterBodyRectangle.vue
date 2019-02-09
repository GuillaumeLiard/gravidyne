<script>
	import { Bodies } from 'matter-js'

	import MatterBody from '~/components/Matter/MatterBody'

	export default {
		extends: MatterBody,
		methods: {
			createBody: function() {
				const { geometry: geo, physic } = this
				return Bodies.rectangle(geo.x, geo.y, geo.width, geo.height, {...physic})
			},
			percentToAbsolute: function({x, y, width, height}, {sceneWidth, sceneHeight}) {
				return {
					x: x * sceneWidth,
					y: y * sceneHeight,
					width: width * sceneWidth,
					height: height * sceneHeight,
				}
			},
			absoluteToPercent: function({x, y}, {sceneWidth, sceneHeight}) {
				const {initialGeometryPercent: igp} = this
				return {
					x: x / sceneWidth,
					y: y / sceneHeight,
					width: igp.width,
					height: igp.height,
				}
			},
		},
	}
</script>
