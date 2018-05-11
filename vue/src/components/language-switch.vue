<template>
    <div>
        <ul class="language-ul">
            <li v-for="language in languages" v-if="language.displayName!==currentLanguage.displayName" @click="changeLanguage(language.name)">
                <Tooltip :content="language.displayName" placement="bottom"><a><i :class="language.icon"></i></a></Tooltip>
            </li>
        </ul>
    </div>
</template>
<script lang="ts">
import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
import Util from '../lib/util'
import AbpBase from '../lib/abpbase'
@Component
export default class LanguageSwitch extends AbpBase{
    get languages(){
        return abp.localization.languages.filter(val=>{
            return !val.isDisabled;
        });
    }
    changeLanguage(languageName:string){
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
.language-ul{
    text-align: center;
    margin-top: 10px;
}
.language-ul li{
    display: inline;
    margin: 2px;
}
.famfamfam-flags {
    display: inline-block;
}
</style>


