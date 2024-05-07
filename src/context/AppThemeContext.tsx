import React, { useEffect } from 'react'

export enum AppTheme {
    LIGHT = 'LIGHT',
    DARK = 'DARK'
}


export interface AppThemeContextInterface {
    theme: AppTheme;
    toggleTheme: () => void
}

export const AppThemeContext = React.createContext<AppThemeContextInterface>({
    theme: AppTheme.LIGHT,
    toggleTheme: () => void 0
})

export function AppThemeContextProvider(props: React.PropsWithChildren<unknown>): React.ReactElement {
    const [theme, setTheme] = React.useState<AppTheme>(AppTheme.LIGHT)


    const toggleTheme = React.useCallback(() => {
        if (theme === AppTheme.LIGHT) {
            setTheme(AppTheme.DARK)
        } else {
            setTheme(AppTheme.LIGHT)
        }
    }, [theme])



    return (
        <AppThemeContext.Provider value={{ theme, toggleTheme }}>
            {props.children}
        </AppThemeContext.Provider>
    )
}

export function useAppThemeContext(): AppThemeContextInterface {
    return React.useContext(AppThemeContext)
}
