---

## 一、数据类型

|      数据关键字      | 占用大小 |              数据范围              |            存储类型            |
| :------------------: | :------: | :--------------------------------: | :----------------------------: |
|        `char`        |  1 字节  |           `−128` ~ `127`           | 单个字符 / 字母 / 数字 / ASCII |
|    `signed char`     |  1 字节  |           `−128` ~ `127`           |               -                |
|   `unsigned char`    |  1 字节  |            `0` ~ `255`             |               -                |
|        `int`         |  4 字节  | `-2,147,483,648` ~ `2,147,483,647` |            存储整数            |
|     `signed int`     |  4 字节  | `-2,147,483,648` ~ `2,147,483,647` |            存储整数            |
|    `unsigned int`    |  4 字节  |       `0` ~ `4,294,967,295`        |            存储整数            |
|     `short int`      |  2 字节  |        `−32,768` ~ `32,767`        |            存储整数            |
|  `signed short int`  |  2 字节  |        `−32,768` ~ `32,767`        |            存储整数            |
| `unsigned short int` |  2 字节  |           `0` ~ `65,535`           |            存储整数            |
|      `long int`      |  4 字节  | `-2,147,483,648` ~ `2,147,483,647` |            存储整数            |
|  `signed long int`   |  4 字节  | `-2,147,483,648` ~ `2,147,483,647` |            存储整数            |
| `unsigned long int`  |  4 字节  |       `0` ~ `4,294,967,295`        |            存储整数            |
|       `float`        |  4 字节  |    可精确表示至少 6 位有效数字     |           存储浮点数           |
|       `double`       |  8 字节  |    可精确表示至少 10 位有效数字    |           存储浮点数           |
|    `long double`     | 16 字节  |         至少比 double 更大         |           存储浮点数           |

> Tip：数据占用大小和范围因不同系统各有不同，具体大小可用 `size of (数据关键字)` 输出查看。如下：

```cpp
#include <stdio.h>
#include <stdlib.h>
int main()
{
    printf("Type short has a size of %zd bytes.\n", sizeof(short));
    printf("Type int has a size of %zd bytes.\n", sizeof(int));
    printf("Type char has a size of %zd bytes.\n", sizeof(char));
    printf("Type long has a size of %zd bytes.\n", sizeof(long));
    printf("Type long long has a size of %zd bytes.\n", sizeof(long long));
    printf("Type float has a size of %zd bytes.\n", sizeof(float));
    printf("Type double has a size of %zd bytes.\n", sizeof(double));
    printf("Type long double has a size of %zd bytes.\n", sizeof(long double));
    system("pause");
    return 0;
}
```

> Tip：C99 和 C11 提供 `%zd` 转换说明符以匹配 `sizeof` 的返回类型，一些不支持 C99 和 C11 的编译器可用 `%u` 或 `%lu` 代替 `%zd`。运行输出结果如下：

```perl
Type short has a size of 2 bytes.
Type int has a size of 4 bytes.
Type char has a size of 1 bytes.
Type long has a size of 4 bytes.
Type long long has a size of 8 bytes.
Type float has a size of 4 bytes.
Type double has a size of 8 bytes.
Type long double has a size of 16 bytes.
```

## 二、基本格式说明符

| 格式说明符类型  |                       对应数据类型                       |
| --------------- | :------------------------------------------------------: |
| `%d` 或 `%i`    |                        `int` 整数                        |
| `%ld` 和 `%lld` |          `long int` 整数和 `long long int` 整数          |
| `%u`            |                   `unsigned int` 整数                    |
| `%lu` 和 `%llu` | `unsigned long int` 整数和 `unsigned long long int` 整数 |
| `%f`            |                `float` 单精度的十进制类型                |
| `%lf`           |              `double` 高精度浮点数据或数字               |
| `%c`            |                       `char` 字符                        |
| `%s`            |                  用于 `strings` 字符串                   |

| 进制类型 | short 类型说明符 | 基础型说明符 | long 类型说明符 |
| :------: | :--------------: | :----------: | :-------------: |
|  8 进制  |      `%ho`       |     `%o`     |      `%lo`      |
| 10 进制  |      `%hd`       |     `%d`     |      `%ld`      |
| 16 进制  |  `%hx` / `%hX`   | `%x` / `%X`  |  `%lx` / `%lX`  |

## 三、转义序列

| 转义序列 |                                    含义                                    |
| :------: | :------------------------------------------------------------------------: |
|   `\a`   |                               警报（ANSI C）                               |
|   `\b`   |                                    退格                                    |
|   `\f`   |                                    换页                                    |
|   `\n`   |                                    换行                                    |
|   `\r`   |                                    回车                                    |
|   `\t`   |                                 水平制表符                                 |
|   `\v`   |                                 垂直制表符                                 |
|   `\\`   |                                反斜杠（\）                                 |
|   `\'`   |                                   单引号                                   |
|   `\"`   |                                   双引号                                   |
|   `\?`   |                                    问号                                    |
|  `\0oo`  |   八进制值（oo 必须是有效的八进制数，即每个 o 可表示 0 ～ 7 中的一个数）   |
|  `\xhh`  | 十六进制值（hh 必须是有效的十六进制数，即每个 h 可表示 0 ～ f 中的一个数） |

> 应用实例如下：

```cpp
#include <stdio.h>
#include <stdlib.h>
int main()
{
    float salary;
    printf("\aEnter your desired monthly salary:");
    printf(" $_______\b\b\b\b\b\b\b");
    scanf("%f", &salary);
    printf("\n\t$%.2f a month is $%.2f a year.",salary,salary*12.0);
    printf("\rGee!\n");
    system("pause");
    return 0;
}
```

> 运行结果为：

```perl
//初始状态是这样
Enter your desired monthly salary: $_______
//输入数据按回车键后显示如下
Enter your desired monthly salary: $4000.00

Gee!    $4000.00 a month is $48000.00 a year.
```

## 四、算术运算符

|    名称    | 符号 |                  功能                  | 示例  |
| :--------: | :--: | :------------------------------------: | :---: |
| 单目运算符 | `+`  |      取正数 (一般不需要写 “+” 号)      | `+m`  |
| 单目运算符 | `-`  |                 取负数                 | `-m`  |
| 双目运算符 | `+`  |                  加法                  | `m+n` |
| 双目运算符 | `-`  |                  减法                  | `m-n` |
| 双目运算符 | `*`  |                  乘法                  | `m*n` |
| 双目运算符 | `/`  |  除法 (在取值时，只取整数，不取余数)   | `m/n` |
| 双目运算符 | `%`  | 取余（求模）(两个操作数必须是整数数据) | `m%n` |

## 五、自增、自减运算符

|       名称        | 符号 |   运算规则    |   示例   |        解释        |
| :---------------: | :--: | :-----------: | :------: | :----------------: |
| 自增运算符 (后缀) | `++` | 先赋值后加 1  | `n=m++;` | ①:`n=m`; ②:`m=m+1` |
| 自增运算符 (前缀) | `++` | 先加 1 后赋值 | `n=++m;` | ①:`m=m+1`; ②:`n=m` |
| 自减运算符 (后缀) | `--` | 先赋值后减 1  | `n=m--;` | ①:`n=m`; ②:`m=m-1` |
| 自减运算符 (前缀) | `--` | 先减 1 后赋值 | `n=--m;` | ①:`m=m-1`; ②:`n=m` |

> 注意：自增和自减运算符的运算对象只能是变量，不能是常量或表达式，如：代码写成 `++5` 或 `(i+j)--` 是不合法的，编译不会通过。应用实例如下：

```cpp
#include <stdio.h>
#include <stdlib.h>

int main()
{
    int i = 5;
    printf("%d %d %d %d\n", i--, --i, i++, ++i);
    system("pause");
    return 0;
}
```

运行结果为：`6 5 6 5`。

之所以输出上述结果，是因为涉及到 `printf` 函数压栈和出栈的知识，这里粗略说明一下，在处理 `printf` 时，压栈顺序为从右往左，也就是说从右往左的计算（“计算” 不等于 “输出”）。在计算时，遇到 `x++` 会记录此时的 `x` 的值作为最后的输出结果。遇到 `x` 和 `++x` 的时候则不会将此时的计算结果作为最终的输出，只会修改 `x` 的值，在最终输出的时候都输出 `x` 的值（所以 `++x` 和 `x` 的结果总是一样的）。自减运算同理。

## 六、关系运算符

|    名称    | 符号 |  示例  |                                   解释                                    |
| :--------: | :--: | :----: | :-----------------------------------------------------------------------: |
|    等于    | `==` | `7==5` | 因为 7 不等于 5，所以该关系不成立，表达式的结果为假值 (即 `false` 或 `0`) |
|    大于    | `>`  | `7>5`  |   因为 7 大于 5，所以该关系成立，表达式的结果为真值 (即 `true` 或 `1`)    |
| 大于或等于 | `>=` | `7>=5` |   因为 7 大于 5，所以该关系成立，表达式的结果为真值 (即 `true` 或 `1`)    |
|    小于    | `<`  | `7<5`  |  因为 7 大于 5，所以该关系不成立，表达式的结果为假值 (即 `false` 或 `0`)  |
| 小于或等于 | `<=` | `7<=5` |  因为 7 大于 5，所以该关系不成立，表达式的结果为假值 (即 `false` 或 `0`)  |
|   不等于   | `!=` | `7!=5` |  因为 7 不等于 5，所以该关系成立，表达式的结果为真值 (即 `true` 或 `1`)   |

> Tip：在 C 语言中，`1` 为真，`0` 为假，也就是 `1` 是 `true`，`0` 是 `false`。

## 七、逻辑运算符

| 运算符 |    功能     |  示例  |    备注    |
| :----: | :---------: | :----: | :--------: |
|   &&   | 逻辑与 (且) |  A&&B  | 双目运算符 |
|  \|\|  |   逻辑或    | A\|\|B | 双目运算符 |
|   !    |   逻辑非    |   !A   | 单目运算符 |

> 假设有两个变量 `m` 和 `n`，`m` 和 `n` 可以进行如下表所示的 **3** 种逻辑运算。其中 `1` 表示 `true`(真)，`0` 表示 `false`(假)。

|  m  |  n  | m&&n | m\|\|n | !m  |
| :-: | :-: | :--: | :----: | :-: |
|  0  |  0  |  0   |   0    |  1  |
|  0  |  1  |  0   |   1    |  1  |
|  1  |  0  |  0   |   1    |  0  |
|  1  |  1  |  1   |   1    |  0  |

> Tip：对于 “逻辑与” 来说，两个操作数中有一个为 0，结果即为 0；对于 “逻辑或” 来说，两个操作数中有 1 个为 1，结果即为 1；对于 “逻辑非” 来说，结果与操作数总是相反。

## 八、位运算符

| 位运算符 |   功能   |     |
| :------: | :------: | --- |
|    &     |  按位与  |     |
|    \|    |  按位或  |     |
|    ^     | 按位异或 |     |
|    ~     |   取反   |     |
|    <<    |   左移   |     |
|    >>    |   右移   |     |

> 假设有两个变量 `m` 和 `n`，`m` 和 `n` 可以进行如下表所示的 **4** 种位运算。其中 `1` 表示 `true`（真），`0` 表示 `false`（假）。

|  m  |  n  | m&n | m\|n | ~m  | m^n |
| :-: | :-: | :-: | :--: | :-: | :-: |
|  0  |  0  |  0  |  0   |  1  |  0  |
|  0  |  1  |  0  |  1   |  1  |  1  |
|  1  |  0  |  0  |  1   |  0  |  1  |
|  1  |  1  |  1  |  1   |  0  |  0  |

> Tip：按位与，遇 0 则 0；按位或，遇 1 则 1；按位异或，相同为 0，不同为 1。巧妙运用位运算的实例如下：

```cpp
#include <stdio.h>
#include <stdlib.h>
int main()
{
    //用位运算符实现交换a和b的值
    int a, b;
    scanf("%d%d", &a, &b);
    printf("你输入的a=%d, b=%d\n", a, b);
    a = a ^ b;
    b = a ^ b; // => b = a^b^b = a^0 = a
    a = a ^ b; // => a = a^b^b(等于最开始的a) = a^b^a = a^a^b = 0^b = b
    printf("交换后的a=%d, b=%d\n", a, b);
    system("pause");
    return 0;
}
```

> 从上表和实例可以，我们得出如下结论：
> （1）两个相同的十进制数异或的结果一定为零。
> （2）任何一个数和 0 的异或结果一定是它本身。
> （3）异或运算满足结合律和交换律。

## 九、复合赋值运算符

| 复合赋值运算符 |    功能    |        示例         |
| :------------: | :--------: | :-----------------: |
|       +=       |   加赋值   |  m+=n 等价于 m=m+n  |
|       -=       |   减赋值   |  m-=n 等价于 m=m-n  |
|      \*=       |   乘赋值   |  m*=n 等价于 m=m*n  |
|       /=       |   除赋值   |  m/=n 等价于 m=m/n  |
|       %=       |  取余赋值  | m%=n 等价于 m=m% n  |
|       &=       |  位与赋值  |  m&=n 等价于 m=m&n  |
|      \|=       |  位或赋值  | m\|=n 等价于 m=m\|n |
|       ^=       | 位异或赋值 |  m^=n 等价于 m=m^n  |
|      <<=       | 位左移赋值 | m<<=n 等价于 m=m<<n |
|      >>=       | 位右移赋值 | m>>=n 等价于 m=m>>n |

> Tip：复合赋值运算符都是由 2 个运算符组成，计算的顺序为从右向左，具体示例如下：

```perl
a += a *= a /= a - 5 (假如a取7)，则计算步骤如下：
          a = a/(a - 5) = a / 2 = 7 / 2 = 3   ①
	 a = a * a = 3 * 3 = 9					  ②
a = a + a = 9 + 9 = 18						  ③
```

## 十、杂项运算符 ↦ sizeof & 三元

|   运算符   |      描述      |                实例                 |
| :--------: | :------------: | :---------------------------------: |
| `sizeof()` | 返回变量的大小 | sizeof (a) 将返回 4，其中 a 是整数  |
|    `&`     | 返回变量的地址 |      &a; 将给出变量的实际地址       |
|    `*`     |  指向一个变量  |         \*a; 将指向一个变量         |
|   `? :`    |   条件表达式   | 如果条件为真？则值为 X : 否则值为 Y |

## 十一、选择流程控制

### 11.1 if 语句控制流程

`语法格式`：

```cpp
if(表达式)
 {
 	语句或语句块;
 }
```

`流程图`：

![if 语句控制流程图_看图王](https://bu.dusays.com/2024/12/08/6755843b07f16.jpg)

### 11.2 if…else 语句控制流程

`语法格式`：

```cpp
if(表达式)
 {
 	语句1或语句块1;
 }
 else
 {
 	语句2或语句块2;
 }
```

`流程图`：

![if...else 语句控制流程图_看图王](https://bu.dusays.com/2024/12/08/6755846f69194.jpg)

> Tip:`if...else` 语句可以用 “三目运算符” 进行简化，语法格式为：`返回值=表达式1?表达式2:表达式3;` 例如 `b=a>2?2:3;` 转换成 `if...else`，等价于：
>
> ```cpp
> >if(a>2)
> {
>  b=2;
> }
>    else
> {
>  b=3;
> }
> ```

### 11.3 if…else if 语句控制流程

`语法格式`：

```cpp
if(表达式1)
 {
 	语句1或语句块1;
 }
 else if(表达式2)
 {
 	语句2或语句块2;
 }
 ...
 else if(表达式m)
 {
 	语句m或语句块m;
 }
 else
 {
 	语句n或语句块n;
 }
```

`流程图`：

![if...else if 语句控制流程图_看图王](https://bu.dusays.com/2024/12/08/675585c999044.jpg)

> Tip：`else if` 前必须要有 `if` 语句

### 11.4 switch 分支语句控制流程

`语法格式`：

```cpp
switch(表达式)
{
    case 情况1:
        语句块1;
    case 情况2:
        语句块2;
    ...
    case 情况n:
        语句块n;
    default:
        默认情况语句;
}
```

`流程图`：

![switch 分支语句控制流程图-1678884001896-2_看图王](https://bu.dusays.com/2024/12/08/675586152b4b3.jpg)

> Tip：`switch` 关键字后面的表达式必须是整数，不能是实数；`case` 语句后面的情况通常可以使常量或常量表达式，但是不能有变量，同时要注意每个 `case` 语句后必须有一个冒号 `(:)`。`default` 分支可以省略，如果省略的话，在所有常量表达式与 `switch` 后面括号内的表达式的值不相等时，`switch` 结构将没有语句执行。应用实例如下：

```cpp
#include <stdio.h>
#include <stdlib.h>
int main()
{
    int chooseNumber;
    printf("***********************\n");
    printf("**    可选择的商品： **\n");
    printf("**     1. 巧克力     **\n");
    printf("**     2. 小面包     **\n");
    printf("**     3. 可口可乐   **\n");
    printf("***********************\n");
    printf("请您从序号1~3中选择：");
input:
    scanf("%d", &chooseNumber);
    switch (chooseNumber)
    {
    case 1:
        printf("您选择了巧克力。\n");
        break;
    case 2:
        printf("您选择了小面包。\n");
        break;
    case 3:
        printf("您选择了可口可乐。\n");
        break;
    default:
        printf("您输入错误，请重新输入：");
        goto input;
        break;
    }
    system("pause");
    return 0;
}
```

`输出结果`：

```perl
***********************
**    可选择的商品：  **
**     1. 巧克力     **
**     2. 小面包     **
**     3. 可口可乐   **
***********************
请您从序号1~3中选择：4
您输入错误，请重新输入：3
您选择了可口可乐。
```

### 11.5 switch 多路开关模式控制流程

`语法格式`：

```cpp
switch(表达式)
{
    case 情况1:
        语句块1;
    case 情况2:
    case 情况3:
        语句块2;
    ...
    default:
        默认情况语句;
}
```

`流程图`：

![switch 多路开关模式控制流程图_看图王](https://bu.dusays.com/2024/12/08/6755865a90cdf.jpg)

`应用实例`：

```cpp
#include <stdio.h>
#include <stdlib.h>
int main()
{
    int month;
    printf("请输入现在的月份：");
input:
    scanf("%d", &month);
    switch (month)
    {
    case 1:
    case 2:
    case 3:
        printf("%d月是第一季度。\n", month);
        break;
    case 4:
    case 5:
    case 6:
        printf("%d月是第二季度。\n", month);
        break;
    case 7:
    case 8:
    case 9:
        printf("%d月是第三季度。\n", month);
        break;
    case 10:
    case 11:
    case 12:
        printf("%d月是第四季度。\n", month);
        break;
    default:
        printf("您输入错误，请重新输入：");
        goto input;
        break;
    }
    system("pause");
    return 0;
}
```

`输出结果`：

```perl
请输入现在的月份：9
9月是第三季度。
```

## 十二、循环控制语句

### 12.1 当型循环：while 语句

`语法格式`：

```cpp
while(循环条件)
{
    循环体;
}
```

`流程图`：

![while 语句控制流程图_看图王](https://bu.dusays.com/2024/12/08/675586a9a00c0.jpg)

> 注意: while 语句后面的循环条件可以是各种表达式，既可以是关系表达式，也可以是逻辑表达式。只要表达式的返回值为非 0，就认为循环条件为真；表达式的返回值为 0，就认为循环条件为假，循环就会结束。如果循环条件一直为真，那么循环就会一直执行下去，这种情况称为无限循环（又称死循环）。

`应用实例`：

农夫一共有 1020 个西瓜，第一天卖掉一半多 2 个，第二天卖掉剩下的一半多 2 个，如此循环下去，总共需要几天就可以卖完所有西瓜，示例代码如下：

```cpp
#include <stdio.h>
#include <stdlib.h>
int main()
{
    int total_melon = 1020, day = 0, remaining; // 声明西瓜总数、天数和西瓜剩余数
    while (total_melon)                         // 当西瓜总数不为0时，执行循环
    {
        remaining = total_melon / 2 - 2; // 西瓜剩余数为原来数量的一半少2个
        total_melon = remaining;         // 将剩余数赋值给总数
        day++;                           // 每循环一次天数加1
    }
    printf("总共需要%d天就可以卖完了\n", day);
    system("pause");
    return 0;
}
```

`运行结果`：

```perl
总共需要8天就可以卖完了
```

### 12.2 直到型循环：do・・・while 语句

`语法格式`：

```cpp
do
{
    循环体;
}while(循环条件);
```

`流程图`：

![do…while 语句控制流程图_看图王](https://bu.dusays.com/2024/12/08/675586e899d71.jpg)

> 注意：do・・・while 语句是先执行后判断，也就是说第一次循环无论是否满足条件都会执行循环体中的内容，然后再进行判断是否继续执行循环。while 循环条件后面必须有一个分号。
>
> Tip：while 和 do・・・while 的循环体如果是一条语句，大括号 “{}” 可以省略，但如果是多条语句，大括号 “{}” 就不能省略。因此，无论循环体是否是一条语句，建议不要省略大括号，以便于其他人阅读代码内容，同时养成良好的书写代码习惯。

`应用实例`：

利用 do・・・while 语句计算 1~100 之和，代码如下：

```cpp
#include <stdio.h>
#include <stdlib.h>
int main()
{
    int number = 1, sum = 0;
    do
    {
        sum = sum + number;
        number++;
    } while (number <= 100);
    printf("1~100的和 sum 为 %d\n", sum);
    system("pause");
    return 0;
}
```

`运行结果`：

```perl
1~100 的和 sum 为 5050
```

## 十三、C 预处理器

`预处理指令`：

```cpp
#define
#include
#ifdef
#else
#endif
#ifndef
#if
#elif
#line
#error
#pragma
```

### 13.1 宏定义 #define
