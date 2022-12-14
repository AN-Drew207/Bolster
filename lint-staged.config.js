module.exports = {
	// Run type-check on changes to TypeScript files
	'**/*.ts?(x)': () => 'npm run type-check',
	// Run ESLint on changes to JavaScript/TypeScript files
	'**/*.(ts|js|jsx|tsx)?(x)': (filenames) =>
		`npm run lint ${filenames.join(' ')}`,
};
