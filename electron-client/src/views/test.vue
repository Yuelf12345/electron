<template>
    <div class="container">
        <div class="left">left</div>
        <div class="right">right
            <div class="box">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, quaerat voluptatem? Sint tempora inventore saepe animi, provident fuga fugiat illo quos ea consequuntur in suscipit ipsum officiis nemo totam reiciendis?</div>
        </div>
    </div>
</template>

<style lanf="scss" scoped>
.container {
    width: auto;
    max-width: 80vw;
    height: 90vh;
    display: flex;
    .left {
        width: 300px;
        height: 90vh;
        background-color: antiquewhite;
    }

    .right {
        flex: 1;
        height: 90vh;
        background-color: rgb(167, 99, 10);
        .box{
            max-width: 100%;
        }
    }
}
</style>