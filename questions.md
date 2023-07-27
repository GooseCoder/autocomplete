#### 1. What is the difference between Component and PureComponent? Give an example where it might break my app.
While both are React classes and can be used to create React components, a PureComponent component has a shallow state and props comparison baked in by default, since it implements the shouldComponentUpdate method for that comparison. A couple of problems that could arise anc break an app would be that since it's a shallow comparison, it could have problems when dealing with complex objects that have other nested objects since those are passed by reference maybe they could change during their lifetime but those changes won't necessarily trigger a re-rendering, another issue is that a PureComponent when doing this check could incur in some performance penalties when doing these comparisons over a large or complex data-structure.
#### 2. Context + ShouldComponentUpdate might be dangerous. Why is that?
Either Context and the shouldComponentUpdate method are not aware of each other during execution, this could lead to some sort of race condition regarding the general control and re-render behavior of the application, since they are controlling the render behavior independently, for example the Context could trigger a re-render based on some context update but shouldComponentUpdate could not allow it because it doesn't satisfy their own logic.
#### 3. Describe 3 ways to pass information from a component to its PARENT.
* The first one would be to pass a callback function from parent to child as a prop and that is used to send back data to the parent as a parameter when invoqued inside the child.
* The second one would be to use the Context API and the useContext Hook.
* The third one would be to have a state management library like redux in place and use that to wire parent and child components to pass the data back and forth.
#### 4. Give 2 ways to prevent components from re-rendering.
- Use the useMemo hook to cache data and avoid unnecessary re-renders.
- Avoid to have inline functions defined as part of an event handler for example:
```javascript
const MyPage = () => {
    return <MyButton onClick={() => console.log('Clicked')} >Click me!</MyButton>
}
```
In this case there is no clear reference since the function is an anonymous one and therefore will trigger an unnecesary re-render.
A way to avoid re-renders would be to give that function a name and reference like other example one:
```javascript
const MyPage = () => {
    const myHandler = () => {
        console.log('Clicked')
    }
    return <MyButton onClick={myHandler} >Click me!</MyButton>
}
```

#### 5. What is a fragment and why do we need it? Give an example where it might break my app.
A fragment is an elegant way to create a component with multiple components at the same level without necessarily create an extra container element like a 'div'. It helps to keep the resulting DOM structure clean. By default it shouldn't create any issues as far as I know.
#### 6. Give 3 examples of the HOC pattern.
* A common use case would be to handle the authenticated state of a user, if the user is logged in it should render the passed component if not it should redirect to the login page or render a different component.
* Other example would be changing the component layout composition or even styling, like optimizing a user profile component for mobile screens or applying a dark theme to it.
* Another use case would be to have a High order component that translate labels based on the user localization, the returned component could then be displayed on the user's language.

#### 7. What's the difference in handling exceptions in promises, callbacks and async…await?
* The primary one would be the way they are used callbacks defers the processing of a function asynchronous result to a callback function with the result as a parameter then the actual result of the call could be processed. Using promises these asynchronous functions could return a Promise object that could be used later to process the data calling their then and catch methods. The async/await structure works more similar to other structured programming languages you only need to mark the container function as 'async' and whenever an asynchronous function is called you should mark it with the 'await' keyword the engine then would wait for the result of the asynchronous function execution and then continue with the program workflow.
* A second difference would be that all this methods were implemented progressively in different javascript versions so not all are available on older Javascript versions for example ES5 only supports callbacks natively.

#### 8. How many arguments does setState take and why is it async.
It can take at most two, however it can support two different signatures, one with an object and a callback function and a second one expecting a function that can take the currentState and props as arguments. The main reason behind is async I think is performance since all setState calls inside a component are handled as a batch by React this could avoid unnecessary re-renders

#### 9. List the steps needed to migrate a Class to Function Component.
This would be my approach for the migration into a Functional component.
* First would be to migrate the jsx part into the new functional component.
* Second would be to transform the props and internal state to prop arguments and constants using the setState hook.
* Third would be migrate the lifecycle implementation using the useEffect hook.
* Fourth, additionally any third party dependency like a state management library should be migrated to their hook version or replaced with one that support hooks and also event handlers should be refactorized.
* Fifth would be to run the related test and test suites to confirm the migration was completed successfully.
* Sixth replace the imports to use the functional version instead. 

#### 10. List a few ways styles can be used with components.
* There could be implemented using in-line styles using the style attribute.
* You could use regular CSS classes using the className attribute.
* Also you could use a CSS-in-JS library like styled-components or emotion to create a container component that handles css stylings.

#### 11. How to render an HTML string coming from the server.
That could be accomplished with the dangereouslySetInnerHTML attribute which is as a replacement of the setInnerHTML javascript native method. One thing to take into consideration is that the content is not sanitized by default so it comes to the developer to be sure that the content is safe and properly sanitized before being rendered.