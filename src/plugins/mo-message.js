import MessageOptions from './mo-message.vue'

const Message = {};
Message.install = function(Vue){  
  var MessageConstructor = Vue.extend(MessageOptions);
  //上面的MessageConstructor相当于Vue, 只是比它低级, Vue用来创建根组件, 它用来创建子组件
  //extend这个单词见名知义, 延伸, 拓展, 儿砸
  var mountPoint = document.createElement('div');
  document.body.appendChild(mountPoint);  
  // console.log(new MessageConstructor().$mount(mountPoint))
  //上面是一个vue实例
  // console.log(MessageOptions)
  //上面是一个vue实例选项对象
  Vue.prototype.$message = new MessageConstructor().$mount(mountPoint);
  // Vue.prototype.$showMessage = new MessageConstructor().$mount(mountPoint).show; 这样子也可以
  //挂载的过程 $mount执行手动挂载/ 不管是否用模板代替 (创建$el) / 才是vue实例与dom相连接的开始
}

export default Message

//有很多过程vue是替我们执行了的, 通过回调函数; vue同时提供很多接口,让我们可以手动执行这些方法


