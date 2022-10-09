<template>
    <div class="box">
        <img src="./assets/logo.png" alt="" class="logo">
        <div >数值:{{num}}</div>
        <div><button @click="num++">+1</button><button @click="num--">-1</button></div>

        <p>名称:oufeiyang-cli</p>
        <p>描述:简易版web-cli工具</p>
        <p>地址:https://github.com/OUFEIYANG/oufeiyang-cli</p>
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


<style scoped>
.logo{
    margin: auto;
}
.box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>