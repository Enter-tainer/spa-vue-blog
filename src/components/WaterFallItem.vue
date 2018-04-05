<template>
  <div class="mdui-col-sm-12 mdui-col-md-6 mdui-col-lg-4 mdui-col-xl-4">
    <div class="mdui-card mdui-shadow-5 mdui-m-t-2">
      <div class="mdui-card-primary">
        <router-link :to="link">
          <div class="mdui-card-primary-title mdui-text-color-theme-700">{{ title }}</div>
        </router-link>
        <div class="mdui-card-primary-subtitle">{{ time }}</div>
      </div>
      <div class="mdui-card-content mdui-typo" v-html="detail"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'WaterFlowItem',
  props: ['title', 'time', 'link', 'detail']
}
</script>
<style scoped>
a:link { text-decoration:none;}
a:active { text-decoration:none}
a:hover { text-decoration:none;}
a:visited { text-decoration:none;}
</style>
