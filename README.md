<div align="center">
  <h1>移动端电影app</h1>
</div>

## ⚡ 项目描述

主要是有关电影信息方面的移动端项目，整个项目分为两期来做，一期做后台管理中心,，二期来做前端平台。前台：主要是用户登录注册及退出、城市定位、正在热映电影、即将热映电影、电影详情页、不同城市影院信息、电影信息检索等。后台用户管理模块、电影模块、影院模块等。
- 技术栈: Vue + better-scroll
- 地址: [vue-movie](https://github.com/5Iris5/vue-movie/tree/dev)

## ✨ 功能

- 登录、注册及退出
- 城市定位
- 正在热映电影、即将热映电影
- 电影详情页
- 不同城市影院信息、电影信息检索等

## 📚 更多描述

- 各模块组件的架构，涉及页面可视化展示、即时通信、与后端开发进行联调沟通、同步实现项目阶段需求等；
- 利用axios将后台数据渲染到前端页面；
- 全国各城市信息因为数据量较多且不需要变动，所以在调用后台接口成功获取数据后，利用localStorage将其存储在本地，避免多次重复加载以提升性能，运用better-scroll插件完成下拉更新数据功能以及点击侧边栏字母跳转对应首字母城市功能；
- 使用vuex状态管理处理组件间的复杂通信，比如：城市定位等；
- 使用props、$refs等进行简单的父子组件通信;
- 使用动态路由/命名路由完成点击跳转电影详情页面的功能等。

## 🚀 开发

```bash
# 克隆项目
git clone 

# 进入项目目录
cd vue-movie

# 安装依赖
npm install

# 启动服务
npm run dev
```

> For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 📄 License

[MIT](./LICENSE)
Copyright (c) 2019 [IrisLong](https://github.com/5Iris5)
