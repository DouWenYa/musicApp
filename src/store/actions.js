import * as types from './mutation-types'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'
function findIndex(arr, item) {
  return arr.findIndex(val => val.id === item.id)
}
// 选择播放
export function selectPlay({ commit, state }, { list, index }) {
  commit(types['SET_PLAYING_STATE'], true)
  commit(types['SET_FULL_SCREEN'], true)
  if (state.mode === playMode.random) {
    const randomList = shuffle(list)
    index = findIndex(randomList, list[index])
    commit(types['SET_PLAYLIST'], randomList)
  } else {
    commit(types['SET_PLAYLIST'], list)
  }
  commit(types['SET_CURRENT_INDEX'], index)
  commit(types['SET_SEQUENCE_LIST'], list)
}
// 随机播放
export const randomPlay = function({ commit }, { list }) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types['SET_SEQUENCE_LIST'], list)
  const randomList = shuffle(list)
  commit(types['SET_PLAYLIST'], randomList)
  commit(types['SET_CURRENT_INDEX'], 0)
  commit(types['SET_PLAYING_STATE'], true)
  commit(types['SET_FULL_SCREEN'], true)
}
