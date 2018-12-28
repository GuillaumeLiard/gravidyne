<template>
	<v-layout>
		<v-flex>
			<v-card>
				<v-btn color="info" @click="triggerAction">
					<slot/>
				</v-btn>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
	export default {
		props: {
			action: {
				type: Function,
				default: () => console.warn('No prop action defined on component btn')
			}
		},
		methods: {
			triggerAction: function() {
				this.action()
			}
		}
	}
</script>
