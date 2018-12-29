<script>
	import { Bodies } from 'matter-js'

	export default {
		render: function() {
			return null
		},
		props: {
			world: {
				type: Object,
				default: () => null
			}
		},
		data: function() {
			return {
				height: 500,
				width: 500,
				px: 0.5,
				py: 0.5,
				pradius: 0.2,
				physic: {
					friction: 0.1,
					frictionAir: 0.001,
					restitution: 0,
				}
			}
		},
		computed: {
			x: function() {
				return this.px * this.width
			},
			y: function() {
				return this.py * this.height
			},
			radius: function() {
				return this.pradius * this.height
			},
			body: function() {
				let body = Bodies.circle(this.x, this.y, this.radius)
				for (let prop of Object.getOwnPropertyNames({...this.physic})) {
					body[prop] = this.physic[prop]
				}
				// for (let prop of Object.getOwnPropertyNames(this.physic)) {
				// 	body[prop] = this.physic[prop]
				// }
				return body
			},
		},
		methods: {
			addBody: function() {
				const { World } = require('matter-js')
				World.add(this.world, this.body)
			}
		},
		mounted: function() {
			this.addBody()
		},
	}
</script>
