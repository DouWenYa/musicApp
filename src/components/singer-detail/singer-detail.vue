<template>
  <transition name="slide">
    <div class="detail-wrap"></div>
  </transition>
</template>
<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from 'api/singer'
import { getMusicVkey } from 'api/song'
import { createSong } from 'common/js/song'
import { ERR_OK } from 'api/config'
export default {
  data () {
    return {
      song: []
    }
  },
  created () {
    this._getSingerDetail()
  },
  computed: {
    ...mapGetters([
      'singer'
    ])
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
          console.log(res.data)
        }
      })
    },
    handleData (song) {
      let ret = []
      song.forEach(item => {
        let { musicData } = item
        if (musicData.songmid && musicData.albummid) {
          getMusicVkey(musicData.songmid).then((res) => {
            if (ERR_OK === res.code) {
              let vkey = res.req_0.data.midurlinfo[0].purl
              ret.push(createSong(musicData, vkey))
            }
          }).catch(e => {
            console.log(e)
          })
        }
      })
      console.log(ret)
      return ret
    }
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