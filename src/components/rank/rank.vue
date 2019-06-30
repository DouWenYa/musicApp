
<template>
  <div :style="{'-webkit-overflow-scrolling': scrollMode}">
    <v-loadmore @loadBottom="loadBottom"
                @loadTop="loadTop"
                ref="rankWrap"
                :allLoaded="allLoaded"
                :list='list'>
      <div class='hot-one hot-item'
           v-for='(item,index) in list'
           :key='index'
           @click="gotoDetail(item)">
        <a href='javascript:;'
           class='show clearfix'>
          <div class='img-box'>
            <img src='http://qn2.wkmblog.com/FrBnGzapQmFwvb-PhspYaxkXE7_T?imageView2/1/w/160/h/90'
                 class='fl'>
          </div>
          <h5 class='white-space'>别让错误的认知毁掉我们的人生</h5>
          <p>女孩天生就不擅长数学、女孩学不好数学是正常的。因为<span class='color_e85647'>...详情</span>
          </p>
          <p class='read'>
            <span class='fa fa-eye'></span> 391 &nbsp;&nbsp;&nbsp;
            <span class='fa fa-pencil-square-o'></span> 10
          </p>
        </a>
      </div>

    </v-loadmore>
  </div>
</template>

<script>
import Loadmore from './loadmore'
export default {
  data () {
    return {
      allLoaded: false,
      list: [],
      limit: 0,
      scrollMode: 'auto'
    }
  },
  components: {
    'v-loadmore': Loadmore
  },
  mounted () {
    this.list = [0, 1, 2, 3, 4, 5, 6]
  },
  methods: {
    loadTop () {
      this.allLoaded = false
      this.limit = 0
      const _this = this
      setTimeout(() => {
        _this.list = [0, 1, 2, 3, 4, 5, 6]
        _this.$refs.rankWrap.onTopLoaded()
      }, 1000)
    },
    loadBottom () {
      const _this = this
      this.limit++
      setTimeout(() => { // 上拉加载更多 模拟数据请求这里为了方便使用一次性定时器
        if (_this.limit <= 3) { // 最多下拉三次
          // _this.list.concat([8, 3, 2, 4, 8, 9]) // 上拉加载 每次数值加5
          _this.list = [..._this.list, ...[8, 3, 2, 4, 8, 9]]
          console.log(_this.list)
          _this.$nextTick(() => {
            _this.scrollMode = 'touch'
          })
        } else {
          _this.allLoaded = true// 模拟数据加载完毕 禁用上拉加载
        }
        _this.$refs.rankWrap.onBottomLoaded()
      }, 1500)
    },
    gotoDetail (p) {
      console.log(p)
    },
    test () {
      console.log('111')
    }
  }

}

</script>
<style lang="stylus" scoped>

.page-loadmore-wrapper {
  overflow: scroll;
  z-index: 100;
}

.hot-list {
  padding: 0 8px;
}

.hot-item {
  padding: 10px 0;
}

.hot-one {
  overflow: hidden;
  border-bottom: 1px dashed #ccc;
}

.hot-one a img {
  padding-right: 10px;
}

.hot-item a img {
  width: 135px;
  height: 90px;
}

.fl {
  float: left;
}

.hot-one a h5 {
  margin-top: 2px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-bottom: 6px;
  font-size: 16px;
  color: #000;
}

.hot-one a p {
  font-size: 12px;
  color: #828282;
  margin: 0 0 3px;
}

.color_e85647 {
  color: #e85647;
}

div.hot-list > div:first-child .img-box {
  overflow: hidden;
}

div.hot-list > div:first-child img {
  width: 100%;
  height: auto;
  padding-right: 0;
}
</style>