/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				title: 'Russo One, sans-serif'
			},
			colors: {
				purple: {
					primary: '#9E24D6',
					secondary: '#833CA3',
					hover: '#A244D7'
				},
				black: {
					border: '#1E1E1E'
				}
			}
		}
	},
	plugins: [],
}
