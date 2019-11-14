import Vue from 'vue'
import MessageBox from './MessageBox'

export var messageBox = (function(){
    var defaults = {  // 默认值
        content: '',
        cancel: '',
        okay: '',
        handleCancel: null,
        handleOkay: null
    };

    // 如何让JS与自带的vue文件结合？ -> Vue.extend()->返回一个新的实例对象
    var myComponent = Vue.extend(MessageBox);

    return function( opts ){ // 配置参数
        for(var attr in defaults){
            defaults[attr] = opts[attr]
        };
        
        var vm = new myComponent({
            // 包裹容器 - 挂载成功后会被替换掉
            el: document.createElement('div'),
            data: {
                content: defaults.content,
                cancel: defaults.cancel,
                okay: defaults.okay
            },
            methods: {
                handleCancel(){
                    defaults.handleCancel && defaults.handleCancel.call(this);
                    document.body.removeChild( vm.$el );
                },
                handleOkay(){
                    defaults.handleOkay && defaults.handleOkay.call(this);
                    document.body.removeChild( vm.$el );
                }
            }
        });
        // 添加到body身上
        document.body.appendChild( vm.$el );
    }
})()