import React, { useState, useEffect } from 'react'

export default function ReadString( { drizzle, drizzleState} : any) {
    const [dataKey, setDataKey] = useState(null)

    useEffect(() => {
        const contract = drizzle.contracts.StringStore;
        // let drizzle know we want to watch the `myString` method
        const dataKey = contract?.methods["myString"].cacheCall();
        // save the `dataKey` to local component state for later reference
        setDataKey(dataKey);
    }, [drizzle.contracts.StringStore])

    useEffect(() => {
        console.log(drizzle);
        console.log(drizzleState);
    }, [drizzle, drizzleState])

    // get the contract state from drizzleState
    const StringStore = drizzleState?.contracts?.StringStore;

    // using the saved `dataKey`, get the variable we're interested in
    const myString : any = dataKey && StringStore?.myString[dataKey];

    return (
        <p>My stored string: {myString && myString.value}</p>
    )
}
