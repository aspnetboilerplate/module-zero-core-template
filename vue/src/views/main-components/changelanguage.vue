<template>
    <div  style="display:inline-block;" class="topbar-menu-item">
        <Row type="flex" justify="start" align="middle">
        <i :class="currentLanguage.icon" style="margin-right:5px"></i>
        <Dropdown trigger="click" @on-click="setLanguage">
            <a href="javascript:void(0)">
                {{currentLanguage.displayName}}
                <Icon type="arrow-down-b"></Icon>
            </a>
            <DropdownMenu slot="list">
                <DropdownItem v-for="(item, index) in languages" v-if="item.name!==currentLanguage.name" :key="index" :name="item.name">
                    <Row type="flex" justify="start" align="middle">
                        <i :class="item.icon"></i><span style="margin-left:5px">{{item.displayName}}</span>
                    </Row>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
        </Row>
    </div>
</template>
<script>
export default {
    methods:{
        async setLanguage(name){
            let changeLanguageInput={
                languageName:name
            };
            await this.$store.dispatch({
                type:'user/changeLanguage',
                data:changeLanguageInput
            })
        }
    },
    data(){
        return{
            languages:[],
            currentLanguage:{}
        }
    },
    created(){
        this.languages=abp.localization.languages.filter(val=>{
            return !val.isDisabled;
        });
        this.currentLanguage=abp.localization.currentLanguage
    }
}
</script>
