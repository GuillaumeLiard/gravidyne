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
			percentToAbsolute: function({ width, height}) {
				const {
					geometryPercent: gp,
				 } = this
				return {
					x: gp.x * width,
					y: gp.y * height,
					radius: gp.radius * height,
				}
			},
			absoluteToPercent: function({ width, height}) {
				const {
					geometry,
				 } = this
				const { position } = this.body ? this.body : {}
				let g = position || geometry
				g = {
					...g,
					radius: geometry.radius
				}
				return {
					x: g.x / width,
					y: g.y / height,
					radius: g.radius / height,
				}
			},
		},
	}
</script>
