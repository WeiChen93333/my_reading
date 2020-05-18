先想着给自己做, 不要想太远了, 但是我同时也觉得我的想法是可行的, 只是要等到合适的时机;
念念不忘, 必有回响, 我已不再空想, 付出行动, 顺其自然

(
  标记说明: 
  【to be continued】: 待办; 
  【extension】: 可办可不办   
)

数据库相关:
1. convert txt to json;
2. import json into mongoDB
relations in database:
db: dict
collection: words
document:
{
  word: structure,
  meanings: [
    {
      explanation: The structure of something is the way in which it is made, built, or organized. 
      sentences: The typical family structure of Freud's patients involved two parents and two children.
    },
    {
      explanation:
      sentences: 
    }
  ]
}
***数据库没区分, 但是前端需要区分的: 单词其他词性词形和例句, 通过是否包含 [part of speech] 判断 class 是否激活
【extension】: (因为资源提供者命名错误, 处理错了词典, 但是这两本词典都是我正在用的(欧陆里, 版本也一样), 感觉可以做一个扩展, 做一个同时展示或词典切换的功能)


前后台交互:
使用node搭建服务器, 监听http请求:
*服务端可以只传回数据, 交给前端去渲染; 也可以把渲染好的页面传回给前端
*通过地址(在地址栏输入, 在src和href中填写)获取静态资源, 如网页, 图片; 通过get post请求获取和修改数据
前台使用axios发送请求, 请求数据;
服务器根据传入的params从数据库中获取信息, 再返回前端


界面与功能设计:
上下两栏:
上栏为各种功能按钮
点击导入按钮, 弹出内容输入框textarea, 可输入散乱的单词和有意义的文本片段, 单词之间以空格分割;
点击单词集按钮, 弹出单词集;
点击单词库按钮, 弹出单词库

下栏分为左右两个区域, 左边为内容展示区域, 右边为单词信息展示区域
点击单个单词:
把每个单词单独包裹在span中, 为span添加点击事件;
单击则向服务器发出请求, 获取单词信息并展示, 双击则将单词加入单词集(当前阅读文本的单词);
(阅读完毕后,)点击"单词集"按钮弹出单词集, 提供两种操作, 将当前单词集全部或部分加入用户单词仓(位于数据库中), 或者将当前单词集生成包含释义和例句的文档
【extension】把已经单击查询的单词缓存, 一般用户双击加入的肯定是单击查询过的, 这样就不必重新发送请求获取数据 

<!-- 以下通过上栏点击按钮实现 -->
单词集功能:
在data中设置一个数组, 保存加入的单词;

【to be continued】单词仓功能:
在数据库中新建一个名为'userInfo' 的 db, 在users的集合下保存:
{
  username: '',
  password: '',
  wordbase: []
}
单词集, 单词仓 属性与使用说明:
将当前单词集保存在localStorage中, 随着阅读手动更新(加入操作和删减操作); 如果换电脑, 就把之前的单词集保存到单词仓中

单词集和单词仓都是单词暂放之地:
简单的单词或者有点模糊的单词, 不要加入单词集; 
新单词和比较复杂的单词看完文本片段中使用的义项后加入单词集, 保证阅读不被打断, 之后再学习; 
七天内主动学习复习, 如果觉得还没有掌握, 加入单词仓
总之: 这两者就好像冰箱, 把吃不完的放进去, 但是之后一两天要吃掉, 要不然放坏了就要倒掉

句集功能: 
【extension】: 添加阅读文本中的句子到句集

<!-- 以下功能在下栏右侧单词信息展示区实现 -->
【to be continued】
搜索框: 不打算做单词释义内部点击跳转查词, 但偶尔会需要查询没有导入的单词
在父元素区域的最开始加上一个div, 显示是一个粗一点的横线, hover显示; 点击显示

查词结果
一 词典释义
二 所有包含此单词的句子
单词查询 出现了三处
阅读区点击查询; 搜索框点击查询; 记忆卡点击查询(第一二个是共用的, 第三个是单独的, 不过自己用, 就做到一起, 把处理函数放在父组件里)
注册与登录按钮要上移 可以在上面加上查询模式的选择(释义 or 句子)
登录注册功能 多用户 练习动态路由相关

【extension】
做一个仿书籍页面的 ui 哈哈, 虽然感觉没啥必要...或许可以增加真实感和幸福感



一个小项目可以逐步拓展功能变成大项目的
版权问题: 查词使用的是柯林斯词典的盗版 txt, 无法发布到网上
那么是否可以收集例句呢, 公开新闻里的句子, 总是可以收集展示的
也可以像听力集锦一样 设置资料夹 从中选取文章来看 但是是用户的资料夹 和收藏夹一样分为公有和私有, 私有只有自己可以看到, 公有都能看到

这个项目虽然看着简单, 但是其实可以搞得很复杂呀...然后项目描述方面下点功夫

终端适配
电脑版 手机版
采用路由 或 动态组件
用于展示 还是使用路由