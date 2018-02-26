<style lang="less">
    @import './500.less';
</style>

<template>
    <div class="error500">
        <div class="error500-body-con">
            <Card>
                <div class="error500-body-con-title">
                    5<span class="error500-0-span"><Icon type="social-freebsd-devil"></Icon></span><span class="error500-0-span"><Icon type="social-freebsd-devil"></Icon></span>
                </div>
                <p class="error500-body-con-message">Oops! the server is wrong</p>
                <div class="error500-btn-con">
                    <Button @click="goHome" size="large" style="width: 200px;" type="text">{{'Return to Home page'|l}}</Button>
                    <Button @click="backPage" size="large" style="width: 200px;margin-left: 40px;" type="primary">{{'Back to last page'|l}}</Button>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Error500',
    methods: {
        backPage () {
            this.$router.go(-1);
        },
        goHome () {
            this.$router.push({
                name: 'home_index'
            });
        }
    }
};
</script>
