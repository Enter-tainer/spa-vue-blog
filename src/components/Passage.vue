<template>
  <div v-if="!loading">
    <div class="mdui-card mdui-m-t-4 mdui-m-b-4 mdui-shadow-5">
      <div class="mdui-card-primary">
        <div class="mdui-typo-display-1 mdui-m-t-1 mdui-m-b-1 mdui-text-color-theme-700">{{ article_title }}</div>
      </div>
      <a class="mdui-btn mdui-m-l-1 mdui-m-r-1"><i class="mdui-text-color-theme-700 mdui-icon material-icons">create</i> Margatroid</a>
      <a class="mdui-btn mdui-m-l-1 mdui-m-r-1"><i class="mdui-text-color-theme-700 mdui-icon material-icons">access_time</i>{{publishTime}}</a>
      <div class="mdui-divider mdui-m-t-1 mdui-m-b-1"></div>
      <div class="mdui-typo mdui-card-content" v-html="md"></div>
    </div>
  </div>
  <div class="mdui-spinner mdui-center mdui-valign mdui-m-t-4" v-else-if="!error"></div>
  <div v-else>Error!</div>
</template>

<script>
import _ from 'lodash'
import mdui from 'mdui'
import axios from 'axios'
import hljs from 'highlight.js'
import marked from 'marked'
import moment from 'moment'
// import katex from 'katex'

export default {
  name: 'Passage',
  props: ['filename', 'title'],
  data: function () {
    return {
      loading: true,
      error: false,
      md: '',
      articles: [],
      article_title: '',
      article_time: ''
    }
  },
  mounted () {
    mdui.mutation()
    this.compiledMarkdown(this.filename)
    this.getTitle()
    this.article_title = this.title
  },
  methods: {
    compiledMarkdown: function (filename) {
      this.loading = true
      axios
        .get('static/' + filename)
        .then(
          function (response) {
            this.loading = false
            this.md = marked(response.data, {
              sanitize: true
            })
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error)
          this.error = true
        }.bind(this))
    },
    renderMath: function () {
      _.delay(function () {
        // renderMathInElement(document.body, {
        //   delimiters: [
        //     {
        //       left: '$$',
        //       right: '$$',
        //       display: true
        //     },
        //     {
        //       left: '\\[',
        //       right: '\\]',
        //       display: true
        //     },
        //     {
        //       left: '\\(',
        //       right: '\\)',
        //       display: false
        //     },
        //     {
        //       left: '$',
        //       right: '$',
        //       display: false
        //     }
        //   ]
        // })
        mdui.JQ('pre code').each(function (i, block) {
          hljs.highlightBlock(block)
        })
        mdui.JQ('h1').addClass('mdui-text-color-theme-700')
        mdui.JQ('h2').addClass('mdui-text-color-theme-700')
        mdui.JQ('h3').addClass('mdui-text-color-theme-700')
        mdui.JQ('h4').addClass('mdui-text-color-theme-700')
        mdui.JQ('h5').addClass('mdui-text-color-theme-700')
      }, 100)
    },
    getTitle: function () {
      fetch('static/data.json')
        .then(response => response.json())
        .then(json => {
          this.articles = json.data
        })
        .then(function () {
          for (var i = 0; i < this.articles.length; ++i) {
            if (this.articles[i].filename === this.filename) {
              this.article_title = this.articles[i].title
              this.article_time = this.articles[i].time
            }
          }
        }.bind(this))
    }
  },
  watch: {
    loading: function () {
      this.renderMath()
    },
    filename: function () {
      this.compiledMarkdown(this.filename)
      this.getTitle()
    }
  },
  computed: {
    publishTime: function () {
      return moment.parseZone(this.article_time).locale('zh-cn').format('lll')
    }
  }
}
</script>
<style>
@import url(https://cdn.bootcss.com/highlight.js/9.12.0/styles/ocean.min.css);
</style>
