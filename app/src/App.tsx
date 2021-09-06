import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import ReadString from './components/ReadString';

function App ( { drizzle } : any) {
  const [drizzleState, setDrizzleState] = useState(null)
  const [loading, setLoading] = useState(false)

  const unsubscribe = useCallback(() => {
      drizzle.store.subscribe(() => {
        setLoading(true)
        // every time the store updates, grab the state from drizzle
        const drizzleState = drizzle.store.getState();
        // check to see if it's ready, if so, update local component state
        if (drizzleState.drizzleStatus.initialized) {
          setLoading(false)
          setDrizzleState(drizzleState)
        }
      })
    },[drizzle.store]
  )
  useEffect(() => {
    // subscribe to changes in the store
    unsubscribe()
  }, [unsubscribe])
  
  return (
    <div className='App'>
      {
        loading ? 
                'Loading' 
                : 
                <ReadString
                  drizzle={drizzle}
                  drizzleState={drizzleState}
                />
      }
    </div>
  );
}

export default App;
