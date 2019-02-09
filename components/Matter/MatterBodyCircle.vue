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
			percentToAbsolute: function({x, y, radius}, {width, height}) {
				return {
					x: x * width,
					y: y * height,
					radius: radius * height,
				}
			},
			absoluteToPercent: function({x, y, radius}, { width, height}) {
				return {
					x: x / width,
					y: y / height,
					radius: radius / height,
				}
			},
		},
	}
</script>
