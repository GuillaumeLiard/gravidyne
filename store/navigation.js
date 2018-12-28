export const state = function() {
	return {
		drawer: false,
		pages: [
			{
				name:'index',
				title: 'gravidyne',
			}
		]
	}
}

export const getters = {
	getPages: function(state) {
		return state.pages
	},
	drawer: function(state) {
		return state.drawer
	}
}

export const mutations = {
	toggleDrawer: function(state) {
		state.drawer = !state.drawer
	},
	setDrawerState: function(state, payload) {
		state.drawer = payload
	}
}
