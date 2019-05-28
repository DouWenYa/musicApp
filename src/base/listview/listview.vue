<template>
  <scroll :data="data"
          class="listview"
          ref="listview"
          :listenScroll="listenScroll"
          :probeType="probeType"
          @scroll='scroll'>
    <ul>
      <li v-for="(group, index) in data"
          class="list-group"
          ref="listGroup"
          :key='index'>
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="(item, index ) in group.items"
              class="list-group-item"
              :key='index'
              @click='selectSinger(item)'>
            <img class="avatar"
                 v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </uL>
      </li>
    </ul>
    <div class="list-shortcut"
         @touchstart='shortCutListStart'
         @touchmove.stop.prevent='shortCutListMove'
         @touchend.stop>
      <ul>
        <li v-for="(item, index) in shortcutList"
            :key="index"
            :data-index="index"
            :class="{'current':currentIndex===index}"
            class="item">
          {{item}}</li>
      </ul>
    </div>
    <div class="list-fixed"
         ref="fixed"
         v-show="fixedTitle">
      <div class="fixed-title">{{fixedTitle}} </div>
    </div>
    <div v-show="!data.length"
         class="loading-container">
      <loading></loading>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import { data } from 'common/js/dom'
const HEIGHT = '18'
const FIXED_TITLE_HEIGHT = 30
export default {
  created () {
    this.touch = {}
    this.listenScroll = true
    this.listGroupHeight = []
    this.probeType = 3
  },
  data () {
    return {
      scrollY: 0,
      currentIndex: 0,
      diffY: 0
    }
  },
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    shortcutList () {
      return this.data.map((item) => {
        return item.title.substr(0, 1)
      })
    },
    fixedTitle () {
      if (this.scrollY > 0) {
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  methods: {
    selectSinger (singer) {
      this.$emit('select', singer)
    },
    shortCutListStart (e) {
      let curIndex = data(e.target, 'index')
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.startIndex = curIndex
      this._scrollTo(curIndex)
    },
    shortCutListMove (e) {
      let curTouch = e.touches[0]
      this.touch.y2 = curTouch.pageY
      let delta = (this.touch.y2 - this.touch.y1) / HEIGHT | 0// 向下取整；
      let index = delta + parseInt(this.touch.startIndex)
      this._scrollTo(index)
      console.log(index)
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    _scrollTo (index) {
      if (!index && index !== 0) { // 点击在索引区域外
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.listGroupHeight.length - 2) {
        index = this.listGroupHeight.length - 2
      }
      this.scrollY = -this.listGroupHeight[index]
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    },
    _calculateHeight () {
      this.listGroupHeight = []
      let list = this.$refs.listGroup
      let height = 0
      this.listGroupHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        height += list[i].clientHeight
        this.listGroupHeight.push(height)
      }
    }
  },
  components: {
    Scroll, Loading
  },
  watch: {
    data () {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    scrollY (newY) {
      const listHeight = this.listGroupHeight
      // 当newy>0时
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      // 当在中间滑动时，
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if ((-newY >= height1 && -newY < height2)) {
          this.currentIndex = i
          this.diffY = height2 + newY
          return
        }
      }
      // 当newy大于最后一个下限
      this.currentIndex = listHeight.length - 2
    },
    diffY (newY) {
      let fixedTop = (newY > 0 && newY < FIXED_TITLE_HEIGHT) ? newY - FIXED_TITLE_HEIGHT : 0
      if (this.fixedTop === fixedTop) { // 过滤掉title不接触的地方
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
    }
  }
}

</script>
<style scoped lang='stylus'>
@import '~common/stylus/variable';

.listview {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;

  .list-group {
    padding-bottom: 30px;

    .list-group-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      text-align: left;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }

    .list-group-item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }

  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;

    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;

      &.current {
        color: $color-theme;
      }
    }
  }

  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
      text-align: left;
    }
  }

  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>