<template>
  <div v-if="!loading">
    <div class="mdui-row">
      <div v-for="i in article" :key="i.id">
        <WaterfallItem :title="i.title" :time="i.time" :detail="i.detail" :link="i.link"></WaterfallItem>
      </div>
    </div>
  </div>
  <div class="mdui-spinner mdui-center mdui-valign mdui-m-t-4" v-else></div>
</template>
<script>
import WaterfallItem from './WaterFallItem.vue'
import axios from 'axios'
import marked from 'marked'
import moment from 'moment'
import _ from 'lodash'
export default {
  name: 'WaterFall',
  props: ['raw_article'],
  data: function () {
    return {
      article: [],
      loading: true
    }
  },
  components: {WaterfallItem},
  methods: {
    makeArticle: function (mtitle, mtime, mdetail, mlink) {
      return {
        title: mtitle,
        time: mtime,
        detail: mdetail,
        link: mlink
      }
    },
    getSingleArticle: function (data) {
      axios.get('static/' + data.filename)
        .then(function (response) {
          moment.locale('zh-cn')
          var mdetail = marked(_.split(response.data, '<!--more-->')[0])
          var mtitle = data.title
          var mtime = moment.parseZone(data.time).fromNow()
          var mlink = '/post/' + data.filename
          this.article.push(this.makeArticle(mtitle, mtime, mdetail, mlink))
        }.bind(this))
    },
    getArticles: function () {
      for (var i = 0; i < this.raw_article.length; ++i) {
        this.getSingleArticle(this.raw_article[i])
      }
      this.loading = false
    }
  },
  watch: {
    raw_article: function () {
      this.getArticles()
    }
  }
}
</script>
