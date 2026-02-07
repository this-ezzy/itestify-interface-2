'use client'

import * as React from 'react'

/**
 * A React hook that runs a cleanup function when the component unmounts.
 *
 * @param fn - The cleanup function to run on unmount
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   useUnmount(() => {
 *     // Cleanup logic here
 *     console.log('Component is unmounting');
 *   });
 *
 *   return <div>Hello world</div>;
 * }
 * ```
 */
export function useUnmount(fn: () => void): void {
  if (typeof fn !== 'function') {
    throw new Error('useUnmount expects a function as argument')
  }

  const fnRef = React.useRef(fn)

  // Keep the function reference up to date without mutating during render
  React.useEffect(() => {
    fnRef.current = fn
  }, [fn])

  React.useEffect(() => {
    // Return the cleanup function that will be called on unmount
    return () => {
      fnRef.current()
    }
  }, [])
}
