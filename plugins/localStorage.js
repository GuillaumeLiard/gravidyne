import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
	window.onNuxtReady(() => {
		console.log('store',store)
		createPersistedState({
			// key: 'yourkey',
			// paths: [...]
			// getState: function(state) {
			// 	console.log('state', state)
			// },
			// paths: ['gravidyne', 'navigation'],
			paths: ['gravidyne'],
			// arrayMerger: function(store, saved) {
			//
			// 	console.log('store', store)
			// 	console.log('saved', saved)
			// 	return [
			// 		...saved,
			// 		...store
			// 	]
			// }
			// ...
		})(store)
	})
}
