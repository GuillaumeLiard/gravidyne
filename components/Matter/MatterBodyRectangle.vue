<script>
	import { Bodies } from 'matter-js'

	import MatterBody from '~/components/Matter/MatterBody'

	export default {
		extends: MatterBody,
		methods: {
			createBody: function() {
				const { geometry: geo, physic } = this
				const rectangle = Bodies.rectangle(geo.x, geo.y, geo.width, geo.height, {...physic})
				rectangle.internalId = this.internalId
				return rectangle
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
