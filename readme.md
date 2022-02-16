# statetoy

This is a toy global state based on the simple concept of
pub sub to handle state updates between components.

This is in no way or form written to be used in production, this is a fun little
snippet I wrote when I was half asleep.

## Install

Nope.

## Usage

Here's what an basic counter example would look like...

```jsx
import create from 'statetoy'

const useCounterAtom = create(0)

const Counter = () => {
	const [state, update] = useCounterAtom()
	return (
		<div>
			Counter: {state}
			<button onClick={() => update(state + 1)}>inc</button>
		</div>
	)
}
const Counter2 = () => {
	const [state, update] = useCounterAtom()
	return (
		<div>
			Counter2: {state}
			<button onClick={() => update(state + 1)}>inc</button>
		</div>
	)
}

function App() {
	return (
		<>
			<Counter />
			<Counter2 />
		</>
	)
}

export default App
```
