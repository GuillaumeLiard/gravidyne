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
			idBodyA: {
				type: Number,
				default: -1
			},
			geometryPercentPointA: {
				type: Object,
				default: () => {}
			},
			idBodyB: {
				type: Number,
				default: -1
			},
			geometryPercentPointB: {
				type: Object,
				default: () => {}
			},
		},
		computed: {
			constraint: function() {
				return this.createConstraint(this.physic)
			},
			bodyA: function() {
				const [match] = this.world.bodies.filter(body => body.internalId === this.idBodyA)
				return match
			},
			bodyB: function() {
				const [match] = this.world.bodies.filter(body => body.internalId === this.idBodyB)
				return match
			},
			pointA: function() {
				return {
					x: this.geometryPercentPointA.x * this.width,
					y: this.geometryPercentPointA.y * this.height,
				}
			},
			pointB: function() {
				return {
					x: this.geometryPercentPointB.x * this.width,
					y: this.geometryPercentPointB.y * this.height,
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
				let constraints = {};
				const availableBodies = [
					{
						name: 'bodyA',
						instance: this.bodyA
					},
					{
						name: 'bodyB',
						instance: this.bodyB
					}
				]
				for (let body of availableBodies) {
					if (body.instance) constraints[body.name] = body.instance
				}
				return Constraint.create({
					pointA: this.pointA,
					pointB: this.pointB,
					...constraints,
					...physic,
				})
			},
		},
	}
</script>
