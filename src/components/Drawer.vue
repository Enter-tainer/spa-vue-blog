<template>
  <div class="mdui-drawer" id="left-drawer">
    <ul class="mdui-list" mdui-collapse="{accordion: true}">
      <router-link to="/">
        <li class="mdui-list-item mdui-ripple">
          <i class="mdui-list-item-icon mdui-icon material-icons">home</i>
          <div class="mdui-list-item-content">主页</div>
        </li>
      </router-link>
      <li class="mdui-collapse-item mdui-collapse-item-open">
        <div class="mdui-collapse-item-header mdui-list-item mdui-ripple">
          <i class="mdui-list-item-icon mdui-icon material-icons">library_books</i>
          <div class="mdui-list-item-content">文章</div>
          <i class="mdui-collapse-item-arrow mdui-icon material-icons">keyboard_arrow_down</i>
        </div>
        <ul class="mdui-collapse-item-body mdui-list mdui-list-dense" v-for="i in articles" :key="i.id">
          <router-link :to="root_dir+'/post/'+i.filename">
            <li class="mdui-list-item mdui-ripple">
              <div class="mdui-list-item-content mdui-text-truncate">{{ i.title }}</div>
            </li>
          </router-link>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import mdui from 'mdui'
export default {
  name: 'Drawer',
  props: ['articles', 'root_dir'],
  mounted: function () {
    mdui.mutation()
  }
}
</script>
