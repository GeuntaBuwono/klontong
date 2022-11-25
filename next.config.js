/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withRoutes = require('nextjs-routes/config')({
	outDir: 'types',
});

const nextConfig = {
	images: {
		domains: ['loremflickr.com'],
	},
	reactStrictMode: true,
	swcMinify: true,
};

module.exports = withRoutes(nextConfig);
