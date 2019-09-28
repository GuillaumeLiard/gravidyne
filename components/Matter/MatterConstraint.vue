<script>
	import { World, Constraint } from 'matter-js'

	export default {
		render: function() {
			return null
		},
		props: {
			world: {
				type: Object,
				default: () => null
			},
			width: {
				type: Number,
				default: () => 0
			},
			height: {
				type: Number,
				default: () => 0
			},
			physic: {
				type: Object,
				default: () => {}
			},
			geometryPercentPointA: {
				type: Object,
				default: () => {}
			},
			idBodyB: {
				type: Number,
				default: -1
			},
		},
		computed: {
			bodyB: function() {
				const [match] = this.world.bodies.filter(body => body.internalId === this.idBodyB)
				return match
			},
			constraint: function() {
				return this.createConstraint(this.physic)
			},
			pointA: function() {
				return {
					x: this.geometryPercentPointA.x * this.width,
					y: this.geometryPercentPointA.y * this.height,
				}
			},
		},
		mounted: function() {
			this.addConstraint()
		},
		beforeDestroy: function() {
			this.removeConstraint()
		},
		methods: {
			addConstraint: function() {
				setTimeout(() => {
					if (this.constraint) World.add(this.world, this.constraint)
				}, 0)
			},
			removeConstraint: function() {
				if (this.constraint) World.remove(this.world, this.constraint)
			},
			createConstraint: function(physic) {
				if (!this.bodyB || !this.pointA) return null
				return Constraint.create({
					pointA: this.pointA,
					bodyB: this.bodyB,
					...physic,
				})
			},
		},
	}
</script>
