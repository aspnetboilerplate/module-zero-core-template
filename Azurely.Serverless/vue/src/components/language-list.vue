<template>
    <div  class="full-screen-btn-con language-list" style="width:80px">
        <Dropdown @on-click="changeLanguage">
            <a>
                <i :class="currentLanguage.icon" style="display:inline-block"></i>
                {{currentLanguage.displayName}}
                <Icon type="arrow-down-b"></Icon>
            </a> 
            <DropdownMenu slot="list">
                <DropdownItem v-for="(language,index) in languages" :key="index" :name="language.name" style="text-align:left">
                    <i :class="language.icon" style="display:inline-block"></i>
                    {{language.displayName}}
                </DropdownItem>
            </DropdownMenu>       
        </Dropdown>
    </div>
</template>
<script lang="ts">
import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
import Util from '../lib/util'
import AbpBase from '../lib/abpbase'
@Component
export default class LanguageList extends AbpBase{
    get languages(){
        return abp.localization.languages.filter(val=>{
            return !val.isDisabled&&val.name!==this.currentLanguage.name;
        });
    }
    async changeLanguage(languageName:string){
        await this.$store.dispatch({
            type:'user/changeLanguage',
            data:{languageName:languageName}
        })
        abp.utils.setCookieValue(
            "Abp.Localization.CultureName",
            languageName,
            new Date(new Date().getTime() + 5 * 365 * 86400000), //5 year
            abp.appPath
        );
        location.reload();
    }
    get currentLanguage(){
        return abp.localization.currentLanguage;
    }
}
</script>
<style>
.language-list{
    width:80px;
}
.language-list i{
    display: inline-block
}
</style>


