<template>
  <div class="singer"
       ref="singer">
    <list-view :data="singerList"
               ref="list"
               @select="selectSinger"></list-view>
    <router-view></router-view>
  </div>
</template>
<script>
import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'
import { mapMutations } from 'vuex'
import Singer from 'common/js/singer'
import ListView from 'base/listview/listview'
import { playlistMixin } from 'common/js/mixin'
const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'
export default {
  mixins: [playlistMixin],
  data () {
    return {
      singerList: []
    }
  },
  created () {
    this._getSingerList()
  },
  methods: {
    handlePlaylist (playlist) {
      const bottom = playlist.length > 0 ? '60px' : '0'
      this.$refs.singer.style.bottom = bottom
      this.$refs.list.refresh()
    },
    selectSinger (singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    _getSingerList () {
      getSingerList().then((res) => {
        if (ERR_OK === res.code) {
          this.singerList = this.handleSingerData(res.data.list)
        }
      })
    },
    handleSingerData (list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({ id: item.Fsinger_mid, name: item.Fsinger_name }))
        }
        let key = item.Findex
        // 若当前索引不存在，则创建索引集合
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({ id: item.Fsinger_mid, name: item.Fsinger_name }))
      })
      // 使map数据有序化
      let normal = []
      let hot = []
      for (let key in map) {
        if (map[key].title.match(/[a-zA-Z]/)) {
          normal.push(map[key])
        } else if (map[key].title === HOT_NAME) {
          hot.push(map[key])
        }
      }
      normal.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(normal)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  components: {
    ListView
  }
}
</script>
<style lang="stylus" scoped>
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>