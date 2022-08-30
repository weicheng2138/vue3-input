/**
 * @vitest-environment happy-dom
 */
import { mount } from '@vue/test-utils'
import ChevrondownIconButton from '../buttons/ChevrondownIconButton.vue'
import { describe, it, expect } from 'vitest'

describe.concurrent('ChevrondownIconButton Default', () => {
  it('should render by default', () => {
    const wrapper = mount(ChevrondownIconButton)
    expect(wrapper.find('[data-test="button"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="chevrondown-icon"]').exists()).toBeTruthy()
  })
})
