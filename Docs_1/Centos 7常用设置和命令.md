---
title: Centos 7常用设置和命令📙
date: 2024-12-4 20:06:13
updated: 2024-12-5 21:36:07
tag: [Linux,Centos]
categories: [知识库,Centos]
cover:
description: Centos 7常用设置和命令 📙
swiper_index: 
sticky: 
toc: 
---

# 一、更换镜像源（推荐方案二）

> 引用自：
>
> 1.https://www.cnblogs.com/007sx/p/18351813
>
> 2.https://es6.fun/article/32

## 前言

CentOS 7的生命周期已经在2024年6月30日终止（End of Life，EOL），官方将不再对该版本进行问题修复、功能更新以及其他形式的维护支持。这意味着使用 CentOS 7 的用户将面临安全漏洞无法得到修补的风险，同时随着其他软件的更新，可能会出现不兼容的情况。

随着 CentOS 7的生命周期结束，[http://mirrorlist.centos.org](https://link.zhihu.com/?target=http%3A//mirrorlist.centos.org) 也不再提供服务。因为 [http://mirrorlist.centos.org](https://link.zhihu.com/?target=http%3A//mirrorlist.centos.org) 是 CentOS 系统中用于寻找可用软件包镜像的关键服务，意味着 CentOS 用户将无法通过该服务获取最新的镜像列表，会影响软件包的管理功能。

在 CentOS 7中再使用 yum 安装软件包或者编译基于 CentOS 的 Docker 镜像时，会报如下错误：

```
Could not resolve host: mirrorlist.centos.org
```

使用 nslookup 看下 [http://mirrorlist.centos.org](https://link.zhihu.com/?target=http%3A//mirrorlist.centos.org) 会发现的确不再提供服务，如下

```
PS C:\Users\Bingo> nslookup mirrorlist.centos.org
服务器:  public1.114dns.com
Address:  114.114.114.114

DNS request timed out.
    timeout was 2 seconds.
*** public1.114dns.com 找不到 mirrorlist.centos.org: Non-existent domain
```

## 解决方案

### （一）官方源更换方案

CentOS 旧版本的软件包和已不再维护的 CentOS 版本都会被存储到 [http://vault.centos.org](https://link.zhihu.com/?target=http%3A//vault.centos.org)，所以只需要将 repo 文件的 baseurl 由 [http://mirrorlist.centos.org](https://link.zhihu.com/?target=http%3A//mirrorlist.centos.org) 改为 [http://vault.centos.org](https://link.zhihu.com/?target=http%3A//vault.centos.org) 即可

1、备份旧的源

```
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.old
```

2、查看Centos系统版本

```
[root@1drk384l6e8r9t3 ~]# cat /etc/centos-release
CentOS Linux release 7.9.2009 (Core)
```

3、新建新的CentOS-Base.repo并粘贴如下配置保存（自己替换成上一步查询到的版本）

```
vim /etc/yum.repos.d/CentOS-Base.repo
# 粘贴如下配置信息并保存
[base]
name=CentOS-$releasever - Base
baseurl=http://vault.centos.org/7.9.2009/os/$basearch/
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7

[updates]
name=CentOS-$releasever - Updates
baseurl=http://vault.centos.org/7.9.2009/updates/$basearch/
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7

[extras]
name=CentOS-$releasever - Extras
baseurl=http://vault.centos.org/7.9.2009/extras/$basearch/
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7
```

4、清理缓存并生成新的缓存

```
sudo yum clean all
sudo yum makecache
```

5、运行 `yum repolist` 命令，确保新源已生效

```
sudo yum repolist
```

 显示如下

```
[root@1drk384l6e8r9t3 ~]# sudo yum repolist
Loaded plugins: fastestmirror
Loading mirror speeds from cached hostfile
repo id                                                                         repo name                                                                            status
base/x86_64                                                                     CentOS-7 - Base                                                                      10,072
extras/x86_64                                                                   CentOS-7 - Extras                                                                       526
updates/x86_64                                                                  CentOS-7 - Updates                                                                    6,173
repolist: 16,771
```

### （二）更换阿里镜像及SCL更换数据源

#### 1.更换yum镜像

```ruby
# 1. 首先备份你的yum仓库配置
cp /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
# 2. 更新仓库配置（以CentOS 7为例）
# 下载最新的CentOS 7仓库配置
curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
```

#### 2.修改CentOS-SCLo-scl.repo

```ruby
vi /etc/yum.repos.d/CentOS-SCLo-scl.repo
```

修改此部分的baseurl

```ruby
[centos-sclo-sclo]
name=CentOS-7 - SCLo sclo
baseurl=https://mirrors.aliyun.com/centos/7/sclo/x86_64/sclo/
# mirrorlist=http://mirrorlist.centos.org?arch=$basearch&release=7&repo=sclo-sclo
gpgcheck=0
enabled=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-SIG-SCLo
```

#### 3.修改CentOS-SCLo-scl-rh.repo

```ruby
vi /etc/yum.repos.d/CentOS-SCLo-scl-rh.repo
```

修改此部分的baseurl

```ruby
[centos-sclo-rh]
name=CentOS-7 - SCLo rh
baseurl=https://mirrors.aliyun.com/centos/7/sclo/x86_64/rh/
# mirrorlist=http://mirrorlist.centos.org?arch=$basearch&release=7&repo=sclo-rh
gpgcheck=0
enabled=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-SIG-SCLo
```

#### 4.刷新缓存

```ruby
yum repolist
yum clean all
yum makecache
```

# 二、Centos 7的PS1美化

> 引用自https://blog.csdn.net/qq_44792624/article/details/107732536

## PS1变量参考

`字体颜色`参考: https://www.ohyee.cc/post/note_bash_terminal

![](https://bu.dusays.com/2024/12/08/675520eb9be06.png)

| 变量   | 解释                                                 |
| ------ | ---------------------------------------------------- |
| \u：   | 显示当前用户账号                                     |
| \h：   | 显示当前主机名                                       |
| \W：   | 只显示当前路径最后一个目录                           |
| \w：   | 显示当前绝对路径（当前用户目录会以~代替）            |
| $PWD： | 显示当前全路径                                       |
| $$：   | 显示命令行’$$'或者’#'符号                            |
| #：    | 下达的第几个命令                                     |
| \d：   | 代表日期，格式为week day month date，例如：“MonAug1” |
| \t：   | 显示时间为24小时格式，如：HH：MM：SS                 |
| *\T：  | 显示时间为12小时格式                                 |
| *\A：  | 显示时间为24小时格式：HH：MM                         |
| *\v：  | BASH的版本信息                                       |

```shell
# 一般颜色符是以[m\]结尾
## 主机名和用户名
export PS1="\[\e[42m\]\h\[\e[m\]  \[\e[42m\]\u\[\e[m\] "

## 主机名
export PS1="\[\e[42m\]\h\[\e[m\] "
```

### 终端字体颜色

![在这里插入图片描述](https://bu.dusays.com/2024/12/08/675520f342e43.png)

### 临时设定PS1

```shell
# 如
export PS1=’[\u@\h\w#]$‘
```

## 让PS1环境变量为每个用户永久生效

在`/etc/bashrc`的最后一行添加上面`PS1`变量

### 让PS1环境变量为某个用户永久生效

就在那个用户的家目录下的`.bashrc`的最后一行添加上面`PS1`变量

### linux启动后环境变量加载顺序

https://blog.csdn.net/omaidb/article/details/116019501

```
/etc/profile` → `/etc/profile.d/*.sh` → `~/.bash_profile` → `~/.bashrc` → `/etc/bashrc
```

`Bash`在显示`PS1`之前`先执行PROMPT_COMMAND环境变量定义的内容`.

## PS1美化脚本

以下示例只适用于`bash`.
[echo $STY的意思](https://serverfault.com/questions/257975/how-to-check-if-im-in-screen-session) : 获取`screen`等`会话保持`的`会话ID`。

建议将`ps1美化脚本`写在`/etc/profile.d/ps1.sh`中。

示例1: 以`～`显示`home`

```shell
# \u 表示当前用户的用户名。
# $(echo $STY | cut -d . -f2) 表示获取当前 screen 会话的编号，并去掉前缀部分，只保留编号部分。
# \h 表示主机名。
# \w 表示当前目录的完整路径。
# ${PIPESTATUS[0]} 表示最近一条命令执行后的退出状态码。

PS1='\[\033[01;35m\][\[\033[01;32m\]\u\[\033[01;32m\]$(echo $STY | cut -d . -f2)\[\033[01;35m\] \[\033[01;35m\]\[\033[01;35m\]\h\[\033[01;35m\] \[\033[38;5;39m\]\w\[\033[31m\]] \[\033[38;5;221m\]WORK \[\033[1;37m\]${PIPESTATUS[0]}\[\033[01;36m\] \n# \[\033[00m\]'

# 声明全局变量
export PS1
```

![在这里插入图片描述](https://bu.dusays.com/2024/12/08/675520fb3d163.png)

示例2: 以`绝对路径`显示`PWD`,且以`终端颜色`显示`路径`

```shell
PS1='\[\033[01;35m\][\[\033[01;32m\]\u\[\033[01;32m\]$(echo $STY | cut -d . -f2)\[\033[01;35m\] \[\033[01;35m\]\[\033[01;35m\]\h\[\033[01;35m\] \[$(tput setaf 0)\]$(pwd)] \[\033[38;5;221m\]WORK \[\033[1;37m\]${PIPESTATUS[0]}\[\033[01;36m\] \n# \[\033[00m\]'

# 声明全局变量
export PS1
```

![在这里插入图片描述](https://bu.dusays.com/2024/12/08/675520ff2564f.png)

示例3: 以`绝对路径`显示`PWD`,且以`蓝色`显示`路径`

```shell
PS1='\[\033[01;35m\][\[\033[01;32m\]\u\[\033[01;32m\]$(echo $STY | cut -d . -f2)\[\033[01;35m\] \[\033[01;35m\]\[\033[01;35m\]\h\[\033[01;35m\] \[\033[38;5;39m\]$(pwd)\[\033[31m\]] \[\033[38;5;221m\]WORK \[\033[1;37m\]${PIPESTATUS[0]}\[\033[01;36m\] \n# \[\033[00m\]'

# 声明全局变量
export PS1
```

![在这里插入图片描述](https://bu.dusays.com/2024/12/08/67552104cb245.png)

## zsh的PS1配置

> 参考：
> https://blog.csdn.net/zxc3590235/article/details/109954843
> https://blog.csdn.net/u014218108/article/details/51195582

`zsh`的`.zshrc`会覆盖`PS1`配置，需要单独在`~/.zshrc`中配置。

```shell
# 编辑.zshrc
vim ~/.zshrc

# 将PS1内容复制进去

# 使PS1变量生效
source ~/.zshrc
```

## PS1变量在线生成工具

https://ezprompt.net/

# 三、Centos开放指定端口命令

1.开启防火墙

```shell
systemctl start firewalld
```

2.开放指定端口

```sh
firewall-cmd --zone=public --add-port=6666/tcp --permanent
```

> 命令含义：
> --zone #作用域
> --add-port=6666/tcp #添加端口，格式为：端口/通讯协议
> --permanent #永久生效，没有此参数重启后失效

3.重启防火墙

```shell
firewall-cmd --reload
```

4.查看端口号

```sh
netstat -ntlp //查看当前所有tcp端口·
netstat -ntulp |grep 6666 //查看所有1935端口使用情况·
```

CentOS默认开放的本地端口范围：（默认30000多到60000多）
```sh
vim /etc/sysctl.conf
net.ipv4.ip_local_port_range = 10240 65000 #建议不要小于10000 ，因为本机很可能会有类似如8080这样的服务
```

# 四、配置IP

1.开启DHCP客户端，在终端输入如下命令：

```ruby
dhclient
```

2.安装net-tools，在终端输入如下命令：

```ruby
sudo yum install net-tools
```

3.使用`ifconfig`命令查看获取的ip,如下图：

![image 20241205223035760](https://bu.dusays.com/2024/12/08/6755210e95f00.png)

4.为防止服务器重启IP发生变化，建议改为静态IP，使用如下命令：

```ruby
# 进入网络配置目录
cd /etc/sysconfig/network-scripts/
# 查看目录内文件，一般会看到ifcfg-ens33这个文件
ls
# 修改ifcfg-ens33文件
vim ifcfg-ens33
```

按<kbd>i</kbd>键进行修改，具体修改内容如下：

```ruby
TYPE="Ethernet"
PROXY_METHOD="none"
BROWSER_ONLY="no"
BOOTPROTO="static" #将该处dhcp修改为static
DEFROUTE="yes"
IPV4_FAILURE_FATAL="no"
IPV6INIT="yes"
IPV6_AUTOCONF="yes"
IPV6_DEFROUTE="yes"
IPV6_FAILURE_FATAL="no"
IPV6_ADDR_GEN_MODE="stable-privacy"
NAME="ens33"
UUID="af117c45-fb98-402d-b265-97988b666547"
DEVICE="ens33"
ONBOOT="yes" #将该处no修改为yes
#添加如下配置
IPADDR="192.168.5.30"
PREFIX="24" #或写成 NETMASK="255.255.255.0"
GATEWAY="192.168.5.1"
DNS1="192.168.5.1"
```

5.修改后，重启网络服务：

```ruby
systemctl restart network.service
```





