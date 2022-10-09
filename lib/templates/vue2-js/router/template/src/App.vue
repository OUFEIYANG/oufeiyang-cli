<template>
    <div id="app">
        <div id="nav">
            <img src="./assets/logo.png" alt="" class="logo">
            <div>{{num}}</div>
            <div><button @click="num++">+1</button><button @click="num--">-1</button></div>

            <p>名称:oufeiyang-cli</p>
            <p>描述:简易版web-cli工具</p>
            <p>地址:https://github.com/OUFEIYANG/oufeiyang-cli</p>
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
        </div>
        <router-view />
    </div>
</template>

<script>
export default {
    data() {
        return {
            num: 0,
        }
    },
}
</script>
    
<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>