/**
 * @vitest-environment happy-dom
 */
import { mount } from '@vue/test-utils'
import DropdownInput from '../components/DropdownInput.vue'
import { describe, it, expect } from 'vitest'

describe.concurrent('DropdownInput Default', () => {
  it('should render by default', () => {
    const wrapper = mount(DropdownInput, {
      props: {
        placeholder: '',
        options: [''],
      },
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('[data-test="input"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="clear-icon"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="clear-icon"]').classes()).toContain(
      'hidden'
    )
    expect(wrapper.find('[data-test="search-icon"]').exists()).toBeFalsy()
    expect(wrapper.find('[data-test="multiple-icon"]').exists()).toBeFalsy()
    expect(wrapper.find('[data-test="drop-list"]').exists()).toBeFalsy()
    expect(
      wrapper.findComponent({ name: 'ChevrondownIconButton' }).exists()
    ).toBeTruthy()
  })
})

describe.concurrent('DropdownInput Props', () => {
  it('should render modelValue', () => {
    const wrapper = mount(DropdownInput, {
      props: {
        modelValue: 'Hello world',
        placeholder: '',
        options: [''],
      },
    })
    const input = wrapper.find('[data-test="input"]')
    expect((input.element as HTMLInputElement).value).toBe('Hello world')
  })

  it('should render placeholder', () => {
    const wrapper = mount(DropdownInput, {
      props: {
        placeholder: 'Hello world',
        options: [''],
      },
    })
    expect(wrapper.find('[data-test="input"]').attributes().placeholder).toBe(
      'Hello world'
    )
  })

  it('should change type of input', () => {
    const wrapper = mount(DropdownInput, {
      props: {
        type: 'multiple',
        placeholder: '',
        options: [''],
      },
    })
    const input = wrapper.find('[data-test="input"]')
    expect(input.attributes().type).toBe('multiple')
  })

  it('should change disable', () => {
    const wrapper = mount(DropdownInput, {
      props: {
        disabled: true,
        placeholder: '',
        options: [''],
      },
    })
    const input = wrapper.find('[data-test="input"]')
    expect((input.element as HTMLInputElement).disabled).toBe(true)
  })

  it('should change options', () => {
    const wrapper = mount(DropdownInput, {
      props: {
        options: ['bar', 'foo'],
        placeholder: '',
      },
    })
    expect(wrapper.props().options).toEqual(['bar', 'foo'])
  })

  it('should change maxListHeight', () => {
    const wrapper = mount(DropdownInput, {
      props: {
        maxListHeight: 500,
        placeholder: '',
        options: [''],
      },
    })
    expect(wrapper.props().maxListHeight).toEqual(500)
  })

  it('should show multiple-icon', async () => {
    const wrapper = mount(DropdownInput, {
      props: {
        type: 'multiple',
        placeholder: '',
        options: [''],
      },
    })
    const multipleIcon = wrapper.find('[data-test="multiple-icon"]')
    expect(multipleIcon.exists()).toBeTruthy()
  })

  it('should show search-icon', async () => {
    const wrapper = mount(DropdownInput, {
      props: {
        type: 'search',
        placeholder: '',
        options: [''],
      },
    })
    const searchIcon = wrapper.find('[data-test="search-icon"]')
    expect(searchIcon.exists()).toBeTruthy()
  })
})

describe.concurrent('DropdownInput Actions', () => {
  it('should show clear-icon after having some inputs from props', async () => {
    const wrapper = mount(DropdownInput, {
      props: {
        options: ['bar', 'foo'],
        placeholder: '',
      },
    })
    const clearIcon = wrapper.find('[data-test="clear-icon"]')
    expect(clearIcon.exists()).toBeTruthy()
    expect(clearIcon.classes()).toContain('hidden')
    await wrapper.setProps({ modelValue: 'bar' })
    expect(clearIcon.classes()).not.toContain('hidden')
  })

  it('should clear value after clicking clear-icon', async () => {
    const wrapper = mount(DropdownInput, {
      props: {
        modelValue: 'bar',
        placeholder: '',
        options: [''],
      },
    })
    const clearIcon = wrapper.get('[data-test="clear-icon"]')
    await clearIcon.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((wrapper.emitted('update:modelValue') as any[])[0]).toEqual([''])
  })

  it('should show drop-list after clicking chevron-down button', async () => {
    const wrapper = mount(DropdownInput, {
      props: {
        options: ['bar', 'foo'],
        placeholder: '',
      },
    })
    expect(wrapper.find('[data-test="drop-list"]').exists()).toBeFalsy()
    const ChevrondownIconButton = wrapper.findComponent({
      name: 'ChevrondownIconButton',
    })
    await ChevrondownIconButton.trigger('click')
    expect(wrapper.find('[data-test="drop-list"]').exists()).toBeTruthy()
    const buttonArr = wrapper.find('[data-test="drop-list"]').findAll('button')
    expect(buttonArr.length).toEqual(2)
  })

  it('should show filtered drop-list after having some input', async () => {
    const wrapper = mount(DropdownInput, {
      props: {
        options: ['bar', 'foo'],
        placeholder: '',
      },
    })
    await wrapper.setProps({ modelValue: 'f' })
    const buttonArr = wrapper.find('[data-test="drop-list"]').findAll('button')
    expect(buttonArr.length).toEqual(1)
    expect(buttonArr[0].text()).toEqual('foo')
  })

  it('should show check-icon after clicking on the button of drop-list', async () => {
    const wrapper = mount(DropdownInput, {
      props: {
        options: ['bar', 'foo'],
        placeholder: '',
      },
    })
    const ChevrondownIconButton = wrapper.findComponent({
      name: 'ChevrondownIconButton',
    })
    await ChevrondownIconButton.trigger('click')
    const buttonArr = wrapper.find('[data-test="drop-list"]').findAll('button')
    expect(buttonArr.length).toEqual(2)
    await buttonArr[0].trigger('click')
    expect(buttonArr[0].find('svg').exists()).toBeTruthy()
  })

  it('should render the item on input after clicking the button of the item of drop-list', async () => {
    const wrapper = mount(DropdownInput, {
      props: {
        options: ['bar', 'foo'],
        placeholder: '',
      },
    })
    const ChevrondownIconButton = wrapper.findComponent({
      name: 'ChevrondownIconButton',
    })
    await ChevrondownIconButton.trigger('click')
    const firstButton = wrapper
      .find('[data-test="drop-list"]')
      .findAll('button')[0]
    expect(firstButton.text()).toEqual('bar')
    await firstButton.trigger('click')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((wrapper.emitted('update:modelValue') as any[])[0]).toEqual(['bar'])
  })

  it('should have multiple items after clicking more than 1 item button', async () => {
    const wrapper = mount(DropdownInput, {
      props: {
        options: ['bar', 'foo'],
        type: 'multiple',
        placeholder: '',
      },
    })
    const ChevrondownIconButton = wrapper.findComponent({
      name: 'ChevrondownIconButton',
    })
    await ChevrondownIconButton.trigger('click')
    const firstButton = wrapper
      .find('[data-test="drop-list"]')
      .findAll('button')[0]
    expect(firstButton.text()).toEqual('bar')
    const secondButton = wrapper
      .find('[data-test="drop-list"]')
      .findAll('button')[1]
    expect(secondButton.text()).toEqual('foo')
    await firstButton.trigger('click')
    await secondButton.trigger('click')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((wrapper.emitted('update:modelValue') as any[])[0]).toEqual([
      ['bar', 'foo'],
    ])
  })
})
