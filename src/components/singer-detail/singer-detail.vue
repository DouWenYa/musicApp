<template>
  <transition name="slide">
    <music-list :title='title'
                :bg-image='bgImage'
                :songs='song'></music-list>
  </transition>
</template>
<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from 'api/singer'
import { getMusicVkey } from 'api/song'
import { createSong } from 'common/js/song'
import { ERR_OK } from 'api/config'
import MusicList from 'components/music-list/music-list'
export default {
  data () {
    return {
      song: [],
      count: 0
    }
  },
  created () {
    this._getSingerDetail()
  },
  computed: {
    ...mapGetters([
      'singer'
    ]),
    title () {
      return this.singer.name
    },
    bgImage () {
      return this.singer.avatar
    }
  },
  methods: {
    _getSingerDetail () {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (ERR_OK === res.code) {
          this.song = this.handleData(res.data.list)
        }
      })
    },
    handleData (song) {
      let ret = []
      // TODO ：优化歌曲播放地址获取 放在点击播放时获取
      this.len = song.length
      let musicDataList = []
      let promises = song.map((item) => {
        let { musicData } = item
        musicDataList.push(musicData)
        return getMusicVkey(musicData.songmid)
      })
      Promise.all(promises).then(function (posts) {
        console.log(posts)
        posts.forEach((item, inx) => {
          let vkey = item.req_0.data.midurlinfo[0].purl
          ret.push(createSong(musicDataList[inx], vkey))
        })
      }).catch(function (reason) {
        // ...
      })
      /* song.forEach(item => {
        let { musicData } = item
        if (musicData.songmid && musicData.albummid) {
          ret.push(createSong(musicData, ''))
          getMusicVkey(musicData.songmid).then((res) => {
            if (ERR_OK === res.code) {
              let vkey = res.req_0.data.midurlinfo[0].purl
              ret.push(createSong(musicData, vkey))
            }
            _this.count++
            if (_this.count === _this.len) {
              console.log(ret)
              return ret
            }
          }).catch(e => {
            _this.count++
            console.log(e)
            if (_this.count === _this.len) {
              console.log(ret)
              return ret
            }
          })
        }
      }) */
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>
<style lang="stylus">
@import '~common/stylus/variable';

.detail-wrap {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $color-background;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>