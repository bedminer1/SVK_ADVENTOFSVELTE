// @ts-ignore
import { join } from 'path'
import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin'

export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', 
	// @ts-ignore
	join(require.resolve('@skeletonlabs/skeleton'), 
	'../**/*.{html,js,svelte,ts}', )],
	theme: {
		extend: {},
	},
	plugins: [
		forms,
		typography,
		skeleton({
			themes: {
				preset: [
					{
						name: 'sahara',
						enhancements: true,
					},
				],
			},
		}),
	],
} satisfies Config;
