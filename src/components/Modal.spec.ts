/**
 * @vitest-environment happy-dom
 */
import { mount } from '@vue/test-utils'
import Modal from '../components/Modal.vue'
import { describe, it, expect } from 'vitest'

describe.concurrent('Modal Default', () => {
  it('should render by default', () => {
    const wrapper = mount(Modal)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('[data-test="header"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="content"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="close"]').exists()).toBeTruthy()
  })
})

describe.concurrent('Modal Actions', () => {
  it('should emit after clicking the close button', async () => {
    const wrapper = mount(Modal)
    console.log(wrapper.emitted())
    const closeButton = wrapper.find('[data-test="close"]').find('button')
    await closeButton.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('close')
  })
})
