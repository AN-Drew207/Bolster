const colorsTalwind = require('tailwindcss/colors');

module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./hooks/use-modal.tsx',
	],
	theme: {
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1536px',
			'3xl': '1700px',
		},
		fontFamily: {
			roboto: ['Roboto', 'sans-serif'],
			montserrat: ['Montserrat', 'sans-serif'],
		},
		colors: {
			...colorsTalwind,
			primary: 'var(--color-primary)',
			primaryOpacity: 'var(--color-primary-opacity)',
			secondary: 'var(--color-secondary)',
			overlay: 'var(--color-overlay)',
			status: {
				success: 'var(--color-alert-success)',
				error: 'var(--color-alert-error)',
			},
			facebook: 'var(--color-facebook)',

			gray: {
				0: 'var(--color-gray-0)',
				200: 'var(--color-gray-200)',
				500: 'var(--color-gray-500)',
				800: 'var(--color-gray-800)',
				900: 'var(--color-gray-900)',
				opacity: {
					10: 'var(--color-gray-500-opacity-10)',
				},
			},
			white: 'var(--color-white)',
			black: {
				0: 'var(--color-black-0)',
				1: 'var(--color-black-1)',
			},
			transparent: 'rgba(0, 0, 0, 0)',
			'transparent-color': {
				gray: {
					200: 'var(--transparent-gray-200)',
					800: 'var(--transparent-gray-800)',
				},
			},
			orange: colorsTalwind.orange,
		},
		extend: {
			boxShadow: {
				generic: '0px 4px 14px #A1B1C4',
				button: '0px 0px 70px 20px rgb(91 77 241 / 50%);',
			},
		},
	},

	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/line-clamp'),
		require('@tailwindcss/aspect-ratio'),
	],
};
