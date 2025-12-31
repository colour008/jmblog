---
title: VSCode在Windows系统配置C和C++环境💻
date: 2023-01-20 20:00:00
updated: 2024-11-30 18:00:00
tag: [教程,VSCode,C/C++]
categories: [知识库,VSCode]
cover: 
description: VSCode在Windows系统配置C和C++环境💻
swiper_index: 
sticky:  
---

---

> 注：博主电脑系统为Win10（X64）

# 一、下载安装及配置中文界面

1.首先，我们直接去[VSCode官网](https://code.visualstudio.com/)或在[中文网](http://vscode.bianjiqi.net/)下载对应操作系统版本的安装包即可。

2.安装路径按自己需求更改，安转完成后配置中文界面：

- 可在自动弹出界面直接安装；
- 如未自动弹出语言设置界面，可点击扩展→输入Chinese→选择中文简体安装。

# 二、下载c/c++ 插件

> 1.C/C++
>
> 2.C/C++ Bulid Task
>
> 3.C/C++ Extension Pack
>
> 4.C/C++ Runner
>
> 5.code runner.

# 三、安装MinGW调试器

## （一）下载方法

1.可在[MinGW官网](https://sourceforge.net/projects/mingw-w64/files/)下载MinGW调试器，但是下载的版本比较旧（一般是8.1.0），而且用在线安装包安装的话，下载会很慢甚至报错。

2.也可在https://github.com/niXman/mingw-builds-binaries/releases 下载最新版本，根据自己电脑配置选择32位或64位下载解压包后进行解压。

3.可在题主的百度网盘下载，链接: https://pan.baidu.com/s/1CBZjPMdwP0uO2TyVkI_HZg?pwd=r7bi 提取码: r7bi。版本为12.2.0，其中msvcrt版本对旧系统兼容性比较好，ucrt版本更好地支持win10等较新系统。

## （二）安装配置方法

安装参照教程：http://c.biancheng.net/view/8077.html

1.在安装完成的基础上，我们需要手动配置 PATH 环境变量。依次右击计算机（我的电脑） -> 属性 -> 高级系统设置 -> 环境变量，建议读者在当前用户的 PATH 环境变量中增加 MinGW 的安装路径，例如我将其安装到了C:\MinGW文件夹中，因此 PATH 环境变量的设置为：C:\MinGW\bin。

2.由此，打开命令行窗口（通过在搜索栏中执行 cmd 指令即可），输入gcc -v指令，如果输出 GCC编译器的具体信息，则表示安装成功。

# 四、配置C++环境（只配置C的话，在选择g++的时候换成gcc就行）

1.在自己电脑硬盘分区新建类似“CPP”文件夹，在此文件夹下新建一个“exe”文件夹（目的是将编译生成的exe文件全部放在这个文件夹，便于管理）。

2.在vscode点击文件打开建的文件夹（快捷键 Ctrl+k Ctrl+O）。

3.接下来配置编译器路径，按快捷键Ctrl+Shift+P调出命令面板，输入C/C++，选择“Edit Configurations(UI)”进入配置编译器路径：`C:/MinGW/bin/g++.exe`，IntelliSense 模式选择：`Windows-gcc-x64`。

4.新建一个`cpp`文件，会自动生成` .vscode `文件夹,此文件夹包含：`c_cpp_properties.json`，可稍作修改如下：

```json
{
  "configurations": [
    {
      "name": "windows-gcc-x64",
      "includePath": [
        "${workspaceFolder}/**"
      ],
      "defines": [
        "_DEBUG",
        "UNICODE",
        "_UNICODE"
      ],
      "compilerPath": "C:/MinGW/bin/gcc.exe",
      "intelliSenseMode": "windows-gcc-x64",
      "browse": {
        "limitSymbolsToIncludedHeaders": false,
        "path": []
      },
      "cStandard": "c17",
      "cppStandard": "c++17"
    }
  ],
  "version": 4
}
```

5.配置完成后点击键盘F5或者运行→启动调试：选择`C++(GDB/LLDB)`，出现错误提示，点击中止，会生成一个`tasks.json`。然后修改`tasks.json`，这样做的目的是将编译生成的exe文件单独放在之前新建的exe文件夹中，修改代码参考如下：

```json
{
	"version": "2.0.0",
	"type": "cppbuild", // cppbuild是把预定义变量和转义解析后直接全部传给command；shell相当于先打开shell再输入命令，所以args还会经过shell再解析一遍
	"label": "g++", // 任务名称，与launch.json的preLaunchTask相对应
	"command": "g++", // 要使用的编译器，C++用g++
	"args": [
		"-fexec-charset=gbk", // 生成的程序使用GBK编码，不加这条会导致Win下输出中文乱码；繁体系统改成BIG5
		"-D__USE_MINGW_ANSI_STDIO=1",
		"${file}",
		"-g", // 生成和调试有关的信息
		"-m64", // 不知为何有时会生成16位应用而无法运行，加上此条可强制生成64位的
		"-Wall", // 开启额外警告
		"-static-libgcc", // 静态链接libgcc，一般都会加上
		"-o", // 指定输出文件名，不加该参数则默认输出a.exe，Linux下默认a.out
		"${workspaceFolder}/exe/${fileBasenameNoExtension}.exe",//编译输出exe文件到exe文件夹
		// "${fileDirname}\\${fileBasenameNoExtension}.exe",
		"-fdiagnostics-color=always"
	],
	"problemMatcher": {
		"owner": "cpp",
		"fileLocation": ["relative", "\\"],
		"pattern": {
			"regexp": "^(.*):(\\d+):(\\d+):\\s+(warning|error):\\s+(.*)$",
			"file": 1,
			"line": 2,
			"column": 3,
			"severity": 4,
			"message": 5
		}
	},
	"group": {
		"kind": "build",
		"isDefault": true // 不为true时ctrl shift B就要手动选择了
	},
	"options": {
		"cwd": "C:/MinGW/bin"
	},
	"presentation": {
		"echo": true,
		"reveal": "always", // 执行任务时是否跳转到终端面板，可以为always，silent，never。具体参见VSC的文档
		"focus": false, // 设为true后可以使执行task时焦点聚集在终端，但对编译C/C++来说，设为true没有意义
		"panel": "shared" // 不同的文件的编译信息共享一个终端面板
	},
	"detail": "编译器: C:/MinGW/bin/g++.exe"
}
```

6.修改`launch.json`，注意修改`"miDebuggerPath": "C:/MinGW/bin/gdb.exe"`, // miDebugger的路径，注意这里要与MinGw的路径对应 ：

```json
{
	"version": "0.2.0",
	"configurations": [
		{
			"name": "(gdb) 启动", // 配置名称，将会在启动配置的下拉菜单中显示
			"type": "cppdbg", // 配置类型，这里只能为cppdbg
			"request": "launch", // 请求配置类型，可以为launch（启动）或attach（附加）
			"program": "${workspaceFolder}/exe/${fileBasenameNoExtension}.exe", // 将要进行调试的程序的路径
			// "program": "${fileDirname}\\${fileBasenameNoExtension}.exe", // 将要进行调试的程序的路径
			"args": [], // 程序调试时传递给程序的命令行参数，一般设为空即可
			"stopAtEntry": false, // 设为true时程序将暂停在程序入口处，一般设置为false
			"cwd": "${workspaceFolder}", // 调试程序时的工作目录，一般为${workspaceFolder}即代码所在目录
			"environment": [], // 环境变量
			"externalConsole": true, // 调试时是否显示控制台窗口，一般设置为true显示控制台
			"MIMode": "gdb",
			"miDebuggerPath": "C:/MinGW/bin/gdb.exe", // miDebugger的路径，注意这里要与MinGw的路径对应
			"miDebuggerArgs": "-q",
			"preLaunchTask": "g++", // 调试会话开始前执行的任务，一般为编译程序，c++为g++, c为gcc
			"setupCommands": [
				{
					"description": "Enable pretty-printing for gdb",
					"text": "-enable-pretty-printing",
					"ignoreFailures": true
				}
			]
		}
	]
}
```

> 注意：上述过程，每完成一步最好重启一遍vscode，以免产生不必要的错误。

# 五、参考和引用

## 修改乱码：

只需要在tasks.json的args项下添加一行"-fexec-charset=gbk"即可，参考：[vscode终端中文乱码问题的解决方案合集c++](https://blog.csdn.net/weixin_45653971/article/details/118908200?spm=1001.2101.3001.6650.4&utm_medium=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~Rate-4-118908200-blog-123590573.pc_relevant_default&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~Rate-4-118908200-blog-123590573.pc_relevant_default&utm_relevant_index=5)

## 安装及json文件修改参考教程：

[【c++】VSCode配置 c++ 环境（小白教程）](https://blog.csdn.net/Zhouzi_heng/article/details/115014059)

## VS Code修改默认生成HTML模板的英文lang=en修改为中文lang=zh-CN，参考教程：

https://www.mainblog.cn/255.html

# 六、VSCode相关站点

## VSCode最全必备实用插件

https://www.uihtm.com/blog/18823.html

## VSCodethemes主题网站

https://vscodethemes.com/