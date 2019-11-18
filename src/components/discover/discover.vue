<template>
  <transition name="slide">
    <music-list :title="title"
                :bg-image="bgImage"
                :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import MusicList from 'components/music-list/music-list'
import { getCDinfo } from 'api/recommend'
import { ERR_OK } from 'api/config'
import { mapGetters } from 'vuex'
import { createNewSong } from 'common/js/song'
import { getMusicVkey } from 'api/song'
export default {
  computed: {
    title () {
      return this.disc.dissname
    },
    bgImage () {
      return this.disc.imgurl
    },
    ...mapGetters([
      'disc'
    ])
  },
  data () {
    return {
      songs: []
    }
  },
  created () {
    this._getCDinfo()
  },
  methods: {
    _getCDinfo () {
      getCDinfo(this.disc.dissid).then((res) => {
        if (ERR_OK === res.code) {
          this.songs = this.handleData(res.cdlist[0].songlist)
        }
      })
    },
    handleData (song) {
      let ret = []
      // TODO ：优化歌曲播放地址获取 放在点击播放时获取
      let musicDataList = []
      let promises = song.map((item) => {
        musicDataList.push(item)
        return getMusicVkey(item.mid)
      })
      Promise.all(promises).then(function (posts) {
        console.log(posts)
        posts.forEach((item, inx) => {
          let vkey = item.req_0.data.midurlinfo[0].purl
          ret.push(createNewSong(musicDataList[inx], vkey))
        })
      }).catch(function (reason) {
        // ...
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>