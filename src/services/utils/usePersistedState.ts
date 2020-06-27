import { useState, useEffect, Dispatch, SetStateAction } from 'react'

type Response<T> = [
    T,
    Dispatch<SetStateAction<T>>
]

function usePersistedState<T>(key: string, initialState: T): Response<T> {
    const [theme, setTheme] = useState(() => {
        const storageValue = localStorage.getItem(key)

        if (storageValue) {
            return JSON.parse(storageValue)
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(theme))
    }, [key, theme])

    return [theme, setTheme]
}

export default usePersistedState