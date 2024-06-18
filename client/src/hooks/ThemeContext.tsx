import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { Theme } from "../types/Theme";

const defaultValue = (localStorage.getItem("theme") ?? "standard") as Theme;

export const ThemeContext = createContext({
    theme: defaultValue,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    setTheme: (_: Theme) => {},
});

export function ThemeContextProvider(props: PropsWithChildren) {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        document.body.className = defaultValue;
    }, []);

    const modifyValue = (newValue: Theme) => {
        document.body.className = newValue;

        localStorage.setItem("theme", newValue);

        setValue(newValue);
    };

    return (
        <ThemeContext.Provider
            value={{
                theme: value,
                setTheme: modifyValue,
            }}
        >
            {props.children}
        </ThemeContext.Provider>
    );
}
