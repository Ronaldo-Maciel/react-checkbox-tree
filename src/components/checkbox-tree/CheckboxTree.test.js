import React from 'react'
import { render, screen, within, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CheckboxList from './ChecboxTree'
import { mockData } from '../../constants/constants'

beforeAll(() => {
  if (!HTMLElement.prototype.scrollIntoView) {
    HTMLElement.prototype.scrollIntoView = () => {}
  }
})

afterEach(() => cleanup())

describe('CheckboxList', () => {
  it('should contain 3 role="treeitem in the document', () => {
    render(
      <CheckboxList
        data={mockData}
        expanded={[]}
        checked={[]}
        onCheck={() => {}}
        onExpand={() => {}}
      />
    )

    expect(screen.getAllByRole('treeitem')).toHaveLength(3)
  })

  it('should contain a role group with 5 items after click end expanded', () => {
    render(
      <CheckboxList
        data={mockData}
        expanded={[]}
        checked={[]}
        onCheck={() => {}}
        onExpand={() => {}}
      />
    )

    const { getByRole } = within(screen.getAllByRole('treeitem')[0])
    const firstButtonList = getByRole('button', {
      'aria-expanded': false,
    })

    userEvent.click(firstButtonList)

    const group = getByRole('group')
    const { getAllByRole } = within(group)

    expect(group).toBeInTheDocument()
    expect(getAllByRole('treeitem')).toHaveLength(5)
  })

  it('should all checkboxes checked', () => {
    render(
      <CheckboxList
        data={mockData}
        expanded={[]}
        checked={[]}
        onCheck={() => {}}
        onExpand={() => {}}
      />
    )
    const { getByLabelText, getByRole } = within(
      screen.getAllByRole('treeitem')[0]
    )
    const firstParentCheckbox = getByLabelText(
      /Paul Adrien Maurice Sir Arthur/i
    )
    userEvent.click(firstParentCheckbox)

    const group = getByRole('group')
    const { getByLabelText: getByLabelTextInsideGroup } = within(group)

    expect(getByLabelTextInsideGroup(/John Cowdery William/i)).toBeChecked()
    expect(getByLabelTextInsideGroup(/Eric A. John/i)).toBeChecked()
    expect(
      getByLabelTextInsideGroup(/Otto Paul Hermann Aristide/i)
    ).toBeChecked()
    expect(getByLabelTextInsideGroup(/Paul Hermann Hans/i)).toBeChecked()
    expect(
      getByLabelTextInsideGroup(/Frederik Willem Thomas R./i)
    ).toBeChecked()
    // reset
    userEvent.click(firstParentCheckbox)
  })

  it('should some checkboxes children is checked and parent is indeterminate', () => {
    render(
      <CheckboxList
        data={mockData}
        expanded={[]}
        checked={[]}
        onCheck={() => {}}
        onExpand={() => {}}
      />
    )

    const { getByRole, getByLabelText: getByLabelTextParentList } = within(
      screen.getAllByRole('treeitem')[0]
    )
    const group = getByRole('group')
    const { getByLabelText } = within(group)

    userEvent.click(getByLabelText(/Eric A. John/i))

    expect(getByLabelText(/Eric A. John/i)).toBeChecked()
    expect(
      getByLabelTextParentList(/Paul Adrien Maurice Sir Arthur/i)
    ).not.toBeChecked()
  })
})
