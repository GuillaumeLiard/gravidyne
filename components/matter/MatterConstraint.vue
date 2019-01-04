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
			physic: {
				type: Object,
				default: () => {}
			},
			bodyA: {
				type: Object,
				default: () => {}
			},
			pointA: {
				type: Object,
				default: () => {}
			},
			bodyB: {
				type: Object,
				default: () => {}
			},
			pointB: {
				type: Object,
				default: () => {}
			},
		},
		computed: {
			constraint: function() {
				return this.createConstraint();
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
				World.add(this.world, this.constraint)
			},
			removeConstraint: function() {
				World.remove(this.world, this.constraint)
			},
			createConstraint: function(physic) {
				return Constraint.create({
					pointA: this.pointA,
					pointB: this.pointA,
					// bodyB: this.bodyB,
					// ...phyic
					// angularStiffness: 0,
					stiffness: 0.5,
					// damping: 0.1,
				})
			},
		},
	}
</script>
