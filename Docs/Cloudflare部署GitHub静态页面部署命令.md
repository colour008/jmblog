



# Cloudflare部署GitHub静态页面部署命令



### 最终解决方案

1. 命令行直接添加参数（快速解决）

   ```bash
   npx wrangler deploy --assets=./ --name=colour008 --compatibility-date=2025-12-14
   ```

2. 创建 `wrangler.jsonc` 配置文件（推荐，一劳永逸）

   ```jsonc
   {
     "name": "colour008",
     "compatibility_date": "2025-12-14",
     "assets": {
       "directory": "./"
     }
   }
   ```

   配置完成后执行简化命令：

   ```bash
   npx wrangler deploy
   ```