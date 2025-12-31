---
title: Kali Linux下载及虚拟机安装配置教程📒
date: 2025-12-14 10:00:00
updated: 2025-12-14 10:00:00
tag: [Linux,Kali]
categories: [知识库,Linux]
cover:
description: Kali Linux下载及虚拟机安装配置教程📒
swiper_index: 
sticky: 
---

---

>转载自：[2025版最新Kali Linux下载安装配置大全（超详细保姆级教学）](https://xlab.csdn.net/6821a6b7e47cbf761b6ba570.html)

# 一、系统下载

## 1. 官网下载

kali官网下载地址：https://www.kali.org/get-kali，虚拟机安装可以用X86_64镜像。

![image-20251214101925019](https://bu.dusays.com/2025/12/14/693e1ea67cbf3.png)

![image-20251214102017518](https://bu.dusays.com/2025/12/14/693e1edaef40a.png)

## 2.镜像源下载

* 阿里云开源镜像站：https://mirrors.aliyun.com/kali-images/current/
* Renwole：https://renwole.com/get-kalilinux-os
* 校园网联合镜像站：https://mirrors.cernet.edu.cn/os/kali

# 二、使用VMware 虚拟机安装kali

具体安装步骤根据图片标注顺序一步一步操作即可：


![img](https://bu.dusays.com/2025/12/14/693e2118b4637.jpeg)

![img](https://bu.dusays.com/2025/12/14/693e2118b4058.png)

![img](https://bu.dusays.com/2025/12/14/693e2118b20bb.png)

![img](https://bu.dusays.com/2025/12/14/693e2118b2844.png)

![img](https://bu.dusays.com/2025/12/14/693e2118b21a6.png)

![img](https://bu.dusays.com/2025/12/14/693e2118b04b8.png)

![img](https://bu.dusays.com/2025/12/14/693e211a08ab2.png)

![img](https://bu.dusays.com/2025/12/14/693e211a1dddd.png)

![img](https://bu.dusays.com/2025/12/14/693e211a47094.png)

![img](https://bu.dusays.com/2025/12/14/693e211a5b209.png)

![img](https://bu.dusays.com/2025/12/14/693e211a8412e.png)

磁盘容量默认为20GB，当然容量越大越好啦。

![img](https://bu.dusays.com/2025/12/14/693e211aa86e7.png)

![img](https://bu.dusays.com/2025/12/14/693e211b26123.png)

![img](https://bu.dusays.com/2025/12/14/693e211b56817.png)

![img](https://bu.dusays.com/2025/12/14/693e211b68972.png)

选择上我们下载的kali系统镜像

![img](https://bu.dusays.com/2025/12/14/693e211b8b9f1.png)

##### **配置好后点击完成，启动刚刚创建的虚拟机文件进行系统安装。**

![img](https://bu.dusays.com/2025/12/14/693e211baba8d.png)

![img](https://bu.dusays.com/2025/12/14/693e211be0ac3.png)

![img](https://bu.dusays.com/2025/12/14/693e211c49d75.png)

![img](https://bu.dusays.com/2025/12/14/693e211c84f2f.png)

![img](https://bu.dusays.com/2025/12/14/693e211c9d51a.png)

![img](https://bu.dusays.com/2025/12/14/693e211cbf4c6.png)

![img](https://bu.dusays.com/2025/12/14/693e211cd68b6.png)

![img](https://bu.dusays.com/2025/12/14/693e211d0cad6.png)

![img](https://bu.dusays.com/2025/12/14/693e211d4b797.png)

![img](https://bu.dusays.com/2025/12/14/693e211d89458.png)

![img](https://bu.dusays.com/2025/12/14/693e211db36ec.png)

![img](https://bu.dusays.com/2025/12/14/693e211dd6ce9.png)

![img](https://bu.dusays.com/2025/12/14/693e211e02a89.png)

![img](https://bu.dusays.com/2025/12/14/693e211e2817c.png)

![img](https://bu.dusays.com/2025/12/14/693e211e5ff54.png)

![img](https://bu.dusays.com/2025/12/14/693e211e97393.png)

![img](https://bu.dusays.com/2025/12/14/693e211ebd945.png)

![img](https://bu.dusays.com/2025/12/14/693e211edcba7.png)

> 完成安装后系统会重新启动，也可以关闭虚拟机，移除系统安装镜像后启动系统。

# 三、kali系统配置

## 1.登录系统

输入安装系统时设置的用户名和密码即可登录系统。

![img](https://bu.dusays.com/2025/12/14/693e21d1913c9.png)

## 2.设置root密码

输入命令`sudo passwd root`设置root密码。

![img](https://bu.dusays.com/2025/12/14/693e21d1913c4.png)

原文作者还有一步汉化系统操作，最新版系统按照上述步骤安装后默认就是中文，不需要汉化，如下图：

![image-20251214103735061](https://bu.dusays.com/2025/12/14/693e22e8bab4d.png)

## 3.更换源

<a id="func1"></a>

### 方法一

在命令行内，输入`sudo vim /etc/apt/sources.list`命令，之后输入密码回车。按<kbd>i</kbd>键编辑，然后用`#`注释掉官方源，把阿里源粘贴过去，最后按<kbd>ESC</kbd>键退出编辑,输入`:wq`按回车键保存退出。

![img](https://bu.dusays.com/2025/12/14/693e231948e72.png)

```clean
#阿里云镜像源
#deb https://mirrors.aliyun.com/kali kali-rolling main non-free contrib
#deb-src https://mirrors.aliyun.com/kali kali-rolling main non-free contrib
```

![img](https://bu.dusays.com/2025/12/14/693e231956f3d.png)

<a id="func2"></a>

### 方法二

使用![Static Badge](https://img.shields.io/badge/github-仓库-blue%3Flogo%3Dgithub?style=flat&logo=github)[SuperManito](https://github.com/SuperManito)/[LinuxMirrors](https://github.com/SuperManito/LinuxMirrors)的` GNU/Linux `更换系统软件源脚本，脚本命令如下：

```bash
bash <(curl -sSL https://linuxmirrors.cn/main.sh)
```

![image-20251214105509195](https://bu.dusays.com/2025/12/14/693e2706b11e1.png)

## 4.更新插件

用[方法一](#func1)更新源后，先后输入命令`sudo apt-get update`和`sudo apt-get upgrade`可更新插件。用[方法二](#func2)可以直接在最后一步更新软件包。

![img](https://bu.dusays.com/2025/12/14/693e23195aae9.png)

![img](https://bu.dusays.com/2025/12/14/693e23195c35b.png)

## 5.开启SSH和root用户登录SSH权限

### 1.开启SSH

> 以下操作必须切换到root用户才能操作，切换命令为`sudo -i`

修改`sshd_config`文件，命令为：`vi /etc/ssh/sshd_config`；

将`#PasswordAuthentication no`的`#`注释去掉，并且将`NO`修改为`YES` **//kali中默认是yes**；

将`#PermitRootLogin prohibit-password`的`#`注释去掉，修改为`PermitRootLogin yes`；

然后保存退出`vi`编辑器。并启动SSH服务命令为：`/etc/init.d/ssh start `或者`service ssh start`;

查看`SSH`服务状态是否正常运行，命令为：`/etc/init.d/ssh status`或者`service ssh status`。

<span style="color:#FF0000; font-weight:bold;">注意：上述启动`ssh`方式都是临时性的，如果机器重启就需要重新输入上面命令才可以开启`ssh`，如果需要`ssh`服务下次开机自动启动，则需要使用以下命令启动ssh服务，命令为：</span>

```bash
update-rc.d ssh enable   // 启用系统启动时自动启动SSH服务
update-rc.d ssh disabled // 关闭系统启动时自动启动SSH服务
```

### 2.开启root用户登录SSH权限

可参照博主[Ubuntu常用设置和命令](https://colour008.eu.org/2024/12/01/Ubuntu%E5%B8%B8%E7%94%A8%E8%AE%BE%E7%BD%AE%E5%92%8C%E5%91%BD%E4%BB%A4/)这篇文章中修改` root `用户登录桌面权限的操作步骤。具体如下：

#### 1. 设置 root 用户密码

使用如下命令设置` root `用户密码，执行命令后，依次输入当前登录用户密码，要设置的` root `密码，确认` root `密码

```
sudo passwd root
```

#### 2. 修改 profile 文件

修改 `/root/.profile` 文件，编辑代码`sudo nano /root/.profile`如下：

```
# 插入新行
tty -s && mesg n || true
```

#### 3.重启服务

使用命令`sudo systemctl restart ssh`重启` ssh `服务。

> 现在，你已经成功开启了 root 用户登录并启用了远程 SSH 连接。你可以使用 root 用户登录桌面版，或者通过 SSH 客户端使用 root 用户进行远程连接。请确保在远程连接时保持安全性，并仅授权受信任的用户使用 root 权限。

