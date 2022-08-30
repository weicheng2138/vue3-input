/**
 * @vitest-environment happy-dom
 */
import { mount } from '@vue/test-utils'
import BasicInput from '../components/BasicInput.vue'
import { describe, it, expect } from 'vitest'

describe.concurrent('BasicInput Default', () => {
  it('should render by default', () => {
    const wrapper = mount(BasicInput)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('[data-test="input"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="clear-icon"]').exists()).toBeTruthy()
    expect(
      wrapper.find('[data-test="password-toggle-icon"]').exists()
    ).toBeTruthy()
    expect(
      wrapper.find('[data-test="password-close-icon"]').exists()
    ).toBeTruthy()
    expect(
      wrapper.find('[data-test="password-open-icon"]').exists()
    ).toBeTruthy()
  })
})

describe.concurrent('BasicInput Slots', () => {
  it('should render slot', () => {
    const Foo = {
      template: '<div data-test="slot">Foo</div>',
    }
    const wrapper = mount(BasicInput, {
      slots: {
        default: Foo,
      },
    })
    expect(wrapper.find('[data-test="slot"]').html()).toBe(
      '<div data-test="slot">Foo</div>'
    )
  })
})

describe.concurrent('BasicInput Props', () => {
  it('should render modelValue', () => {
    const wrapper = mount(BasicInput, {
      props: {
        modelValue: 'Hello world',
      },
    })
    const input = wrapper.find('[data-test="input"]')
    expect((input.element as HTMLInputElement).value).toBe('Hello world')
  })

  it('should render placeholder', () => {
    const wrapper = mount(BasicInput, { props: { placeholder: 'Hello world' } })
    expect(wrapper.find('[data-test="input"]').attributes().placeholder).toBe(
      'Hello world'
    )
  })

  it('should change type of input', () => {
    const wrapper = mount(BasicInput, {
      props: {
        type: 'password',
      },
    })
    const input = wrapper.find('[data-test="input"]')
    expect(input.attributes().type).toBe('password')
  })

  it('should change disable', () => {
    const wrapper = mount(BasicInput, {
      props: {
        disabled: true,
      },
    })
    const input = wrapper.find('[data-test="input"]')
    expect((input.element as HTMLInputElement).disabled).toBe(true)
  })
})

describe.concurrent('BasicInput Actions', () => {
  it('should show clear-icon after having some inputs from props', async () => {
    const wrapper = mount(BasicInput, {
      props: {
        modelValue: '',
      },
    })
    const clearIcon = wrapper.find('[data-test="clear-icon"]')
    expect(clearIcon.exists()).toBeTruthy()
    expect(clearIcon.classes()).toContain('hidden')
    await wrapper.setProps({ modelValue: 'bar' })
    expect(clearIcon.classes()).not.toContain('hidden')
  })

  it('should show password-toggle-icon after having some inputs from props', async () => {
    const wrapper = mount(BasicInput, {
      props: {
        modelValue: '',
        type: 'password',
      },
    })
    const passwordToggleIcon = wrapper.find(
      '[data-test="password-toggle-icon"]'
    )
    expect(passwordToggleIcon.exists()).toBeTruthy()
    expect(passwordToggleIcon.classes()).toContain('hidden')
    await wrapper.setProps({ modelValue: 'bar' })
    expect(passwordToggleIcon.classes()).not.toContain('hidden')
  })

  it('should clear value after clicking clear-icon', async () => {
    const wrapper = mount(BasicInput, {
      props: {
        modelValue: 'bar',
      },
    })
    const clearIcon = wrapper.get('[data-test="clear-icon"]')
    await clearIcon.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((wrapper.emitted('update:modelValue') as any[])[0]).toEqual([''])
  })

  it('should change type of input and show open icon after clicking password toggle icon', async () => {
    const wrapper = mount(BasicInput, {
      props: {
        modelValue: 'bar',
        type: 'password',
      },
    })
    expect(
      wrapper.find('[data-test="password-close-icon"]').classes()
    ).not.contain('hidden')
    expect(wrapper.find('[data-test="password-open-icon"]').classes()).contain(
      'hidden'
    )
    const input = wrapper.get('[data-test="input"]')
    expect(input.attributes().type).toBe('password')
    const passwordCloseIcon = wrapper.get('[data-test="password-close-icon"]')
    await passwordCloseIcon.trigger('click')
    expect(input.attributes().type).toBe('text')
    expect(
      wrapper.find('[data-test="password-close-icon"]').classes()
    ).toContain('hidden')
    expect(
      wrapper.find('[data-test="password-open-icon"]').classes()
    ).not.toContain('hidden')
  })
})
