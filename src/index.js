import React from "react";

/*
	We need some form of identifier to be able to differentiate which 
	global state to update , so key, in this case it's just a number 
	but in a better version you'd use some form hashing algorithm to
	generate this 
*/
let key = 0;

/* 
	This is going to be where we store/cache the global data, 
	know that if you are working with concurrent systems, you'll have 
	to add lock and unlock logic to be able to use a single object 
*/
const storage = {};

/* 
	To handle reactivity, we'll need some form of subscription mechanism to 
	know and signal when a change has been made to the state so that all 
	listeners of the state know that there was a change
*/
const listeners = {};

/*  
	getting to the base logic that incorporates the entire set of 
	variable above.
	We start with taking in the initial state from the user for the 
	global state
*/
const create = (initialState) => {
  /*
		We generate a key for the store and add it to the _storeKey variable
	*/
  const _storeKey = key++;

  /* 
		Assign the initial state to variable handling this data with the respective 
		key
	*/
  storage[_storeKey] = initialState;

  /*
		We also create a set to add all the listeners that'll wait for changes to the 
		state
  */
  listeners[_storeKey] = new Set();

  /* 
		this is a helper function which makes sure to change the value in the 
		global variable and also call all the listeners for that particular 
		storage key
  */
  const _setState = (newValue) => {
    storage[_storeKey] = newValue;
    listeners[_storeKey].forEach((x) => x());
  };

  /* 
 		This is just going to make sure that the latest value 
		from the store + hash is sent to the components instead of 
		a previous cached value 
  */
  const _getState = () => storage[_storeKey];

  /* 
 		Finally we return custom hook code which adds the business logic 
	 	of  adding a subscriber and destroying the subscriber when the component
		unmounts.
  */
  return () => {
    /* 
		State with context so that the handlers are triggers with 
		react's lifecycles instead of being called at random times
	*/
    const [_internal, internalSetter] = React.useState(initialState);

    /* 
		The useEffect is also added for the same reason as the state
		but also adds a state changer function to the listeners so 
		the respective triggers for state updates are fired
	*/
    React.useEffect(() => {
      const sub = () => internalSetter(_getState());
      listeners[_storeKey].add(sub);
      return () => {
        listeners[_storeKey].delete(sub);
      };
    }, []);

    /* 
		Return the internal state since that will help avoid unnecessary 
		renders which would be caused if we used the `_getState()` function 
		directly
	*/
    return [_internal, _setState];
  };
};

export default create;
