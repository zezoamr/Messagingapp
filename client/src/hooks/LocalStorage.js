import { useEffect, useState } from "react";

const PREFIX = 'Messaging-app'

export default function useLocalStorage(key, initalValue) {
    const prefixedKey = PREFIX + key

    const [value, setValue] = useState(() => {
        const jsonVal = localStorage.getItem(prefixedKey)
        if (jsonVal != null) {
            if (jsonVal === "undefined") {
                return null;
            } else {
                return JSON.parse(jsonVal);
            }
        }
        if (typeof initalValue == 'function') {
            return initalValue()
        }
        else {
            return initalValue
        }
    })

    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey, value])

    return [value, setValue]
}