<template>
    <div id="main" class="app-main">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                theme: this.$store.state.app.themeColor
            };
        },
        async mounted () {
            await this.$store.dispatch({
                type:'session/init'
            })
        },
        beforeDestroy () {

        },
        methods: {

        }
    };
</script>
<style lang="less">
@import './styles/common.less';
</style>
<style>

@import '../node_modules/famfamfam-flags/dist/sprite/famfamfam-flags.css';
html,body{
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    overflow: hidden;
}
.app-main{
    width: 100%;
    height: 100%;
}
</style>
