/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	images: {
		qualities: [75, 85, 92, 95, 100],
	},
	async headers() {
		return [
			{
				source: '/:path*',
				headers: [
					{ key: 'X-Content-Type-Options', value: 'nosniff' },
					{ key: 'X-Frame-Options', value: 'SAMEORIGIN' },
					{ key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
					{ key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
					{ key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
				],
			},
		];
	},
};

module.exports = nextConfig;
