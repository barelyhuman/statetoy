import React from 'react'

let key = 0
const storage = {}
const listeners = {}

const create = initialState => {
	const _storeKey = key++
	storage[_storeKey] = initialState
	listeners[_storeKey] = new Set()

	const _setState = newValue => {
		storage[_storeKey] = newValue
		listeners[_storeKey].forEach(x => x())
	}

	const _getState = () => storage[_storeKey]

	return () => {
		const [_internal, internalSetter] = React.useState(initialState)
		React.useEffect(() => {
			const sub = () => internalSetter(_getState())
			listeners[_storeKey].add(sub)
			return () => {
				listeners[_storeKey].delete(sub)
			}
		}, [])

		return [_internal, _setState]
	}
}

export default create
