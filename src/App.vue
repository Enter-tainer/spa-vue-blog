<template>
  <div id='app'>
    <drawer :articles='articles' :root_dir='root_dir'></drawer>
    <div class='mdui-container'>
      <router-view :title="active_title" :raw_article="articles"/>
    </div>
  </div>
</template>

<script>
import drawer from './components/Drawer.vue'
export default {
  name: 'App',
  data: function () {
    return {
      author: '',
      root_dir: '',
      articles: [],
      active_title: ''
    }
  },
  components: {drawer},
  created () {
    fetch('static/data.json')
      .then(response => response.json())
      .then(json => {
        this.articles = json.data
        this.author = json.author
        this.root_dir = json.root_dir
      })
  }
}
</script>

<style>
@import 'mdui';
</style>
