<script>
	import { World, Composite, Constraint } from 'matter-js'

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
			pointA: {
				type: Object,
				default: () => {}
			},
			idBodyB: {
				type: Number,
				default: 1
			},
		},
		computed: {
			constraint: function() {
				return this.createConstraint(this.physic)
			},
			bodyB: function() {
				return Composite.get(this.world, this.idBodyB, 'body')
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
					bodyB: this.bodyB,
					...physic,
				})
			},
		},
	}
</script>
