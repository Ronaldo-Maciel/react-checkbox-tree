const {
  nodeHasChildren,
  flattenObj,
  flattenWithNewProps,
} = require('./helpers')

const data = {
  0: {
    id: 'e0d52ca9-4b39-42c2-8b2b-bbb8efa2e78d',
    name: 'Paul Adrien Maurice Sir Arthur',
    children: {
      0: {
        id: '4de37406-3f6b-4766-a8ca-cce5e144204d',
        name: 'John Cowdery William',
        children: {},
        level: 1,
      },
    },
    level: 0,
  },
  1: {
    id: '3eb03733-4b0a-4aa0-9423-d833505c9a46',
    name: 'René Hans Adolf',
    children: {},
    level: 0,
  },
}

describe('nodeHasChildren', () => {
  it('should return true when has children', () => {
    expect(nodeHasChildren(data[0])).toBeTruthy()
  })

  it('should return true when has children', () => {
    const data = {
      id: '3eb03733-4b0a-4aa0-9423-d833505c9a46',
      name: 'René Hans Adolf',
      children: {},
      level: 0,
    }
    expect(nodeHasChildren(data)).toBeFalsy()
  })
})

describe('flattenObj', () => {
  it('should return true when has children', () => {
    const flatten = {
      '4de37406-3f6b-4766-a8ca-cce5e144204d': {
        id: '4de37406-3f6b-4766-a8ca-cce5e144204d',
        name: 'John Cowdery William',
        children: {},
        level: 1,
      },
      'e0d52ca9-4b39-42c2-8b2b-bbb8efa2e78d': {
        id: 'e0d52ca9-4b39-42c2-8b2b-bbb8efa2e78d',
        name: 'Paul Adrien Maurice Sir Arthur',
        children: {
          0: {
            id: '4de37406-3f6b-4766-a8ca-cce5e144204d',
            name: 'John Cowdery William',
            children: {},
            level: 1,
          },
        },
        level: 0,
      },
      '3eb03733-4b0a-4aa0-9423-d833505c9a46': {
        id: '3eb03733-4b0a-4aa0-9423-d833505c9a46',
        name: 'René Hans Adolf',
        children: {},
        level: 0,
      },
    }

    expect(flattenObj(data)).toEqual(flatten)
  })
})

describe('flattenWithNewProps', () => {
  it('should return true when has children', () => {
    const flattenNewProps = {
      '4de37406-3f6b-4766-a8ca-cce5e144204d': {
        id: '4de37406-3f6b-4766-a8ca-cce5e144204d',
        name: 'John Cowdery William',
        children: {},
        level: 1,
        isParent: false,
        isLastChildren: true,
      },
      'e0d52ca9-4b39-42c2-8b2b-bbb8efa2e78d': {
        id: 'e0d52ca9-4b39-42c2-8b2b-bbb8efa2e78d',
        name: 'Paul Adrien Maurice Sir Arthur',
        children: {
          0: {
            id: '4de37406-3f6b-4766-a8ca-cce5e144204d',
            name: 'John Cowdery William',
            children: {},
            level: 1,
            isParent: false,
            isLastChildren: true,
          },
        },
        level: 0,
        isParent: true,
        isLastChildren: false,
      },
      '3eb03733-4b0a-4aa0-9423-d833505c9a46': {
        id: '3eb03733-4b0a-4aa0-9423-d833505c9a46',
        name: 'René Hans Adolf',
        children: {},
        level: 0,
        isParent: false,
        isLastChildren: true,
      },
    }
    const flatten = flattenObj(data)
    expect(flattenWithNewProps(flatten)).toEqual(flattenNewProps)
  })
})
