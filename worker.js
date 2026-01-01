// worker.js（核心：处理静态资源请求，自动加载index.html）
export default {
	async fetch(request, env, ctx) {
		// 从 assets 目录读取静态文件
		const url = new URL(request.url);
		const path = url.pathname === '/' ? '/index.html' : url.pathname;

		try {
			// 加载对应静态文件
			const asset = await env.ASSETS.fetch(new Request(path, request));
			return asset;
		} catch (e) {
			// 404 处理
			return new Response('404 Not Found', { status: 404 });
		}
	},
};
