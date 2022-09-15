/**
 * @vitest-environment happy-dom
 */
import { mount } from '@vue/test-utils'
import AdjustIconButton from '../buttons/AdjustIconButton.vue'
import { describe, it, expect } from 'vitest'

describe.concurrent('AdjustIconButton Default', () => {
  it('should render by default', () => {
    const wrapper = mount(AdjustIconButton)
    expect(wrapper.find('[data-test="button"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="adjust-icon"]').exists()).toBeTruthy()
  })
})
