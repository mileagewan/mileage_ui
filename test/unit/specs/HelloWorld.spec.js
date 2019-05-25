import Vue from 'vue'
import views from '@/views/views'

describe('views.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(views)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.router').textContent.trim()).toEqual(
      '组件列表'
    )
  })
})
