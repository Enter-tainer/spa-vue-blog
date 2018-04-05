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
  props: ['filename', 'title', 'raw_article'],
  data: function () {
    return {
      loading: true,
      error: false,
      md: '',
      article_title: '',
      article_time: ''
    }
  },
  mounted () {
    mdui.mutation()
    this.getTitle()
    this.compiledMarkdown(this.filename)
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
      for (var i = 0; i < this.raw_article.length; ++i) {
        if (this.raw_article[i].filename === this.filename) {
          this.article_title = this.raw_article[i].title
          this.article_time = this.raw_article[i].time
        }
      }
    }
  },
  watch: {
    loading: function () {
      this.renderMath()
    },
    filename: function () {
      this.compiledMarkdown(this.filename)
      this.getTitle()
    },
    raw_article: function () {
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
