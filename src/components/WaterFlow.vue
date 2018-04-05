<template>
  <div v-if="!loading">
    <div class="mdui-row">
      <div v-for="i in article" :key="i.id">
        <WaterflowItem :title="i.title" :time="i.time" :detail="i.detail" :link="i.link"></WaterflowItem>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="mdui-spinner mdui-center mdui-valign mdui-m-t-4"></div>
  </div>
</template>
<script>
import WaterflowItem from './WaterFlowItem.vue'
import axios from 'axios'
import marked from 'marked'
import moment from 'moment'
import _ from 'lodash'
export default {
  name: 'WaterFlow',
  data: function () {
    return {
      article: [],
      raw_article: [],
      loading: true
    }
  },
  mounted () {
    this.getArticles()
  },
  components: {WaterflowItem},
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
      fetch('static/data.json')
        .then(response => response.json())
        .then(json => {
          this.raw_article = json.data
        })
        .then(function () {
          for (var i = 0; i < this.raw_article.length; ++i) {
            this.getSingleArticle(this.raw_article[i])
          }
        }.bind(this))
        .then(function () {
          this.loading = false
        }.bind(this))
    }
  }
}
</script>
