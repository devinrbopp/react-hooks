// hooks come fromt he react library
// we import just like we would anything else from react
// the two hooks we'll be using are useState and useEffect
import React, { useState, useEffect } from 'react'
import Layout from '../shared/Layout'

// counter will have a button, that can be clicked to increase count
// there will also be a button to reset the count
// counter is a function component, so it will use hooks
// this is different from class components!

const Counter = () => {
  // to access a function component, we call useState
  // useState requires two things, an initial value and an updater function
  // our piece of state will be count, which means we'll call our updater function seCount
  const [count, setCount] = useState(0) // look up this syntax later
  const [donut, setDonut] = useState('chocolate')
  // we used these console logs to look at our hook for a second
  // console.log('this is count', count)
  // console.log('this is setCount', setCount)
  const increaseCount = () => {
    // this can be used to set a value OR do what it's supposed to do and increment!
    // setCount(1)
    // setCount(count + 1)
    // according to the react lifecycle, this doesn't work the best because it doesn't set state immediately
    // this is fine for something simple like this, but breaks down for more complex things
    // for instance, if i wanted to increase by 2 using this syntax:
    // setCount(count + 1)
    // setCount(count + 1)
    // the above syntax is going to run both calls based on the state when we called increase count
    // so both see the SAME current value of count and return count + 1
    // that's because of the way this updater function works
    // so best practice is to make your count increase based on the previous count:
    setCount(prevCount => prevCount + 1)
    // using this syntax allows multiple state setting functions to run effectively one after the other
    // it's important to remember these updater functions do NOT merge state, they replace the current state with the passed value
    // so really they are STATE SETTING FUNCTIONS
  }
  const resetCount = () => {
    // use this to set count to value not dependent on a previous value
    setCount(0)
  }

  // useEffect --> takes the place of componentDidMount, componentDidUpdate, componentDidUnmount
  // the effect hook (useEffect) requires two things: a callback function, and a dependency array
  // (dependency array isn't always required)
  // the dependency array is what the hook depends on, aka what will trigger it to run
  // the below hook will recreate componentDidMount
  // it will run on the first render ONLY
  useEffect(() => {
    console.log('first render only')
  }, [])

  // this takes the place of componentDidMount AND componentDidUpdate
  // runs on first render and any time the count changes
  // this is because count is inside the dependency array, which triggers the useEffect hook
  useEffect(() => {
    console.log('first render and count change \n count:', count)
  }, [count])

  // an effect hook with no dependency array will be called after every render
  useEffect(() => {
    console.log('i run every time there is a render')
  })

  // this effect hook will act like componentDidUnmount
  // the way to do this is to return a 'cleanup' function (clearing a timer, removing data, removing something from the DOM, etc.)
  useEffect(() => {
    console.log('some effect XYZ')
    // an effect can return a cleanup function
    // cleanup functions run two different times
    // 1) when the component is unmounted
    // 2) before the second and following state updates/renders
    // adding an empty dependency array makes it so the cleanup function only runs when the component is unmounted
    // this is because it doesn't depend on any piece of state that could cause it to be reapplied
    return () => {
      console.log('cleaning up XYZ')
    }
  }, [])

  useEffect(() => {
    console.log('the donut has sprinkles')
  }, [donut])

  const addSprinkles = () => {
    setDonut(prevDonut => prevDonut + ' with sprinkles')
  }

  return (
    <Layout>
      <h1>Counter</h1>
      <h2>Count: {count}</h2>
      <button onClick={increaseCount}>increase count</button>
      <button onClick={resetCount}>reset count</button>
      <h5>donut is: {donut}</h5>
      <button onClick={addSprinkles}>add sprinkles</button>
    </Layout>
  )
}

export default Counter
