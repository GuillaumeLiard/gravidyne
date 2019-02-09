module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	parserOptions: {
		parser: 'babel-eslint'
	},
	extends: [
		'plugin:vue/essential'
	],
	// required to lint *.vue files
	plugins: [
		'vue'
	],
	// add your custom rules here
	rules: {
		'no-console': 'warn',
		'no-debugger': 'warn',
		'no-unused-vars': 'warn',
	}
}
