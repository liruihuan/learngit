通过建立虚拟dom树document.createDocumentFragment(),方法创建虚拟dom树。
一旦被监测的数据改变，会通过Object.defineProperty定义的数据拦截，截取到数据的变化。
截取到的数据变化，从而通过订阅——发布者模式，触发Watcher（观察者）,从而改变虚拟dom的中的具体数据。
最后，通过更新虚拟dom的元素值，从而改变最后渲染dom树的值，完成双向绑定

Dep.global是在第一次new Watcher()的时候，进入update()方法，触发这里的get方法。
这里非常的重要的一点！在此时new Watcher()只走到了this.update();方法，
此刻没有触发Dep.global = null函数，所以值并没有清空，所以可以进到dep.add(Dep.global);方法里面去。
而第二次后，由于清空了Dep的全局变量，所以不会触发add()方法。

定义Vue对象，声明vue的data里面的属性值，准备初始化触发observe方法。
在Observe定义过响应式方法Object.defineProperty()的属性，在初始化的时候，通过Watcher对象进行addDep的操作。即每定义一个vue的data的属性值，就添加到一个Watcher对象到订阅者里面去。
每当形成一个Watcher对象的时候，去定义它的响应式。即Object.defineProperty()定义。这就导致了一个Observe里面的getter&setter方法与订阅者形成一种依赖关系。
由于依赖关系的存在，每当数据的变化后，会导致setter方法，从而触发notify通知方法，通知订阅者我的数据改变了，你需要更新。
订阅者会触发内部的update方法，从而改变vm实例的值，以及每个Watcher里面对应node的nodeValue，即视图上面显示的值。
Watcher里面接收到了消息后，会触发改变对应对象里面的node的视图的value值，而改变视图上面的值。
至此，视图的值改变了。形成了双向绑定MVVM的效果。
