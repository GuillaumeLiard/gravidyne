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
				default: 8
			},
		},
		computed: {
			constraint: function() {
				return this.createConstraint(this.physic)
			},
			bodyB: function() {
				return Composite.get(this.world, this.idBodyB, 'body')
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
