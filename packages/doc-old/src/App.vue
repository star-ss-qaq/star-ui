<template>
  <su-view-control checkFunction="screen-width">
    <su-v-layout>
      <header><div class="menu-button" @click="isOpenMenu=!isOpenMenu"></div> star-ui</header>
      <su-main>
        <su-h-layout>
          <div :class="['menu',{open:isOpenMenu}]">
            <h4>{{$t("menu.base")}}</h4>
            <div>
              <router-link :to="{name:'home'}">{{$t("home.title")}}</router-link>
            </div>

            <h4>{{$t("components.title")}}</h4>
            <div v-for="(item, name) in allComponents" :key="name">
              <router-link :to="{name:'show-component',params:{name:name}}">
                {{$t("components.types."+name+".name")}}{{name}}
              </router-link>
            </div>
          </div>
          <su-v-line :class="{hiddenOnMobile:!isOpenMenu}"/>
          <su-main class="data" @click="isOpenMenu=false">
            <!-- <show v-if="sel" :component="sel"></show>
            <component v-else :is="component"></component> -->
            <router-view/>
          </su-main>
        </su-h-layout>
      </su-main>
    </su-v-layout>
  </su-view-control>
</template>

<script lang="tsx">
import { Options, Vue } from "vue-class-component";

import {func, infos} from "@thestarweb/ui";

@Options({
  components:{
  }
})
export default class HelloWorld extends Vue {
  private get allComponents(){
		let ret:Record<string,typeof infos[string]> = {};
		Object.keys(infos).forEach(key => {
			if(!infos[key].hideInDoc && !infos[key].internalOnly){
				ret[key]=infos[key];
			}
		});
		return ret;
	}
  private isOpenMenu=false;
}
</script>

<style scoped>
.su-view-control,.su-v-layout{
  overflow: hidden;
  height: 100%;
}
header{
  background-color: #000;
  color: #FFF;
  padding: 5px;
  font-size: 28px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.menu{
  width:280px;
  overflow-y: auto;
}
.menu>h4{
  padding: 2px 10px;
}
.menu>div>a{
  display: block;
  padding: 5px 10px;
  padding-left: 20px;
  cursor: pointer;
  position: relative;
  color: #000;
  text-decoration: none;
}
.menu .router-link-active{
  color: #08F;
  background: #DEF;
}
.menu .router-link-active:before{
  content: "";
  position: absolute;
  height: 100%;
  width: 5px;
  top: 0;
  left: 0;
  background: #08F;
}
.data{
  overflow-y: auto;
}

/*移动样式*/
.su-view-control.su-view-control-pc .menu-button{
  display: none;
}
.menu-button{
  width: 32px;
  height: 22px;
  border: 2px solid #FFF;
  border-radius: 5px;
  margin: 0 10px;
  display: inline-block;
  padding: 5px 5px;
  position: relative;
  box-sizing: border-box;
}
.menu-button::before,.menu-button::after{
  content: "";
  position: absolute;
  width: 17px;
  height: 2px;
  background-color: #FFF;
}
.menu-button::after{
  bottom: 5px;
}
.su-view-control.su-view-control-mobile .su-main.data{
  width: 100vw;
  flex: 0 0 100vw;
}
.su-view-control.su-view-control-mobile .menu{
  width: 0;
  transition: width 0.2s;
}
.su-view-control.su-view-control-mobile .menu.open{
  width: 90vw;
}
.su-view-control.su-view-control-mobile .hiddenOnMobile{
  display: none;
}
</style>
