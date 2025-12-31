---
title: Linux安装minio并设置开机自启📒
date: 2025-12-15 20:00:00
updated: 2025-12-15 20:00:00
tag: [Linux,minio]
categories: [知识库,Linux]
cover:
description: Linux安装minio并设置开机自启 📒
swiper_index: 
sticky: 
---
---

## 1. 安装

---

> 转载自https://blog.csdn.net/qq_24950043/article/details/136068964

## 一、下载并安装

1.创建`minio`文件夹，以及后续存储数据和日志的文件夹

```shell
mkdir -p /data/minio
# 存储数据目录
mkdir -p /data/minio/data
# 存储日志目录
mkdir -p /data/minio/log
# 配置文件存储目录
mkdir -p /data/minio/conf
# 进入创建的目录
cd /data/minio
```

2.下载`minio`二进制文件

```shell
wget https://dl.min.io/server/minio/release/linux-amd64/minio
```

3.将下载的`minio`文件添加可执行文件权限

```shell
chmod +x minio
```

4.创建配置文件

```shell
vim /data/minio/conf/minio.conf
```

按<kbd>i</kbd>键插入配置内容：

```shell
MINIO_VOLUMES="/data/minio/data"
MINIO_OPTS="-C /data/minio/conf --address 0.0.0.0:9000 --console-address 0.0.0.0:9001"
MINIO_ROOT_USER=admin
# 创建的密码长度至少8位，否则无法启动
MINIO_ROOT_PASSWORD=xxx%123456
```

5.创建系统启动服务脚本

```shell
vim /etc/systemd/system/minio.service
```

按<kbd>i</kbd>键插入脚本内容

```shell
[Unit]
Description=Minio
Documentation=https://docs.min.io
Wants=network-online.target
After=network-online.target
[Service]
# User and group
User=root
Group=root
EnvironmentFile=/data/minio/conf/minio.conf
ExecStart=/data/minio/minio server $MINIO_OPTS 
ExecReload=/bin/kill -HUP $MAINPID
# Let systemd restart this service always
Restart=always
# Specifies the maximum file descriptor number that can be opened by this process
LimitNOFILE=65536
TimeoutStopSec=5
SendSIGKILL=no
SuccessExitStatus=0 1
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=minio

[Install]
WantedBy=multi-user.target
```

6.启动`minio`

```shell
# 启动
systemctl start minio
# 停止
systemctl stop minio
#查看状态（正常应显示 active (running)）
systemctl status minio
# 重载服务脚本
systemctl daemon-reload
systemctl reload minio
```

7.查看启动状态，如下图表示启动成功

```shell
# 查看状态（正常应显示 active (running)）
systemctl status minio
```

![在这里插入图片描述](https://bu.dusays.com/2025/12/16/69413beeaff87.png)

8.访问`minio`，端口是脚本中设置的`9001`端口：http://192.168.6.25:9001/login

这里账号就用上述第4部设置的账号密码

```shell
MINIO_ROOT_USER=admin
MINIO_ROOT_PASSWORD=xxx@123456
```

![在这里插入图片描述](https://bu.dusays.com/2025/12/16/69413beecefe2.png)

9.如下则安装并登陆成功，后续可以根据自己的需要创建桶配置权限等
![在这里插入图片描述](https://bu.dusays.com/2025/12/16/69413beec195e.png)

10.因为我们这里要使用`java`连接`minio`。因此我们还需要创建一个`access key`，点击进入`Access Keys`，点击`Create access key`

![在这里插入图片描述](https://bu.dusays.com/2025/12/16/69413beec4d7d.png)

11.填写相关信息，其中`accesskey`可以自定义或者用系统自动生成的

![在这里插入图片描述](https://bu.dusays.com/2025/12/16/69413beec6c1c.png)

12.生成的`accessKey`和`secretKey`一定要妥善保管，后续`client`端连接`minio`就通过该信息
![在这里插入图片描述](https://bu.dusays.com/2025/12/16/69413bf0220d3.png)

## 二、设置开机自启

1.因为我们上述已经创建了`systemctl`启动脚本了，将该服务加入开机自启列表就行

```shell
# 启用开机自启
systemctl enable minio
# 查看服务是否已启用开机自启
systemctl is-enabled minio
```

输出 `enabled` → 说明开机自启已配置成功；若输出 `disabled`，重新执行上面的`enable`命令。

2.重启服务器，查看服务是否自动启动

![在这里插入图片描述](https://bu.dusays.com/2025/12/16/69413bf03528a.png)

### 三、启动过程中容易遇到的一些问题

#### systemd 启动限制重置（临时解决 start-limit-hit）

Minio 服务启动反复失败，将会触发` systemd `的启动次数限制（start-limit-hit），如果遇到此类问题，先重置失败次数，再重新加载服务配置：

```bash
# 1. 重置systemd启动限制
systemctl reset-failed minio

# 2. 重新加载服务文件（若修改过minio.service）
systemctl daemon-reload

# 3. 尝试手动启动
systemctl start minio

# 4. 再次查看状态
systemctl status minio
```

