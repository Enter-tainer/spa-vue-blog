<template>
  <div class="mdui-drawer" id="left-drawer">
    <ul class="mdui-list" v-for="i in articles" :key="i.id">
      <router-link :to="root_dir+'/post/'+i.filename">
        <li class="mdui-list-item mdui-ripple" @click="changeView(i.title)">
          <div class="mdui-list-item-content">{{ i.title }}</div>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Drawer',
  props: ['articles', 'root_dir'],
  methods: {
    changeView: function (title) {
      this.$emit('view_change', title)
    }
  }
}
</script>
