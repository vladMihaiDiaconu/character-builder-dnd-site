const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			'serif': ['PublicPixel', 'serif']
		},
		extend: {
			rotate: {
				'225': '225deg',
			}
		},
		"rounded-tr-xl": "border-top-right-radius: 0.75rem",
	},
	plugins: [],
}
