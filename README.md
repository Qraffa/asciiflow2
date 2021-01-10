Follow the instructions to get asciiflow running locally.

Compile the javascript:
~/asciiflow2$ ./compile.sh

If you get a permissions error:
~/asciiflow2$ chmod a+x closure-compiler.jar

Run a simple web server:
~/asciiflow2$python -m SimpleHTTPServer

Goto: http://localhost:8000/index.html

When developing, use the Google JS linter, gjslint.

---

Features:
- 增加中文汉字和部分标点符号的支持

使用正则，匹配中文字符。
```js
var reg = new RegExp("[\\u4E00-\\u9FFF]+");
// 匹配这些中文标点符号 。 ？ ！ ， 、 ； ： “ ” ‘ ' （ ） 《 》 〈 〉 【 】 『 』 「 」 ﹃ ﹄ 〔 〕 … — ～ ﹏ ￥
var reg2 = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/
```

Notes：
- 导出后的asciiflow尽量使用等宽字体（如更纱黑体），以保证对齐。
- 对于全角字母和数字暂未支持
- 对于`·`字符，在导出时，显示位置不正确，因为它占了两个标准字符位置，但在正常使用时占用一个标准字符位置，显示位置是正常的