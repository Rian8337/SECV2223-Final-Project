import { PropsWithChildren, createContext, useState } from "react";
import { Family } from "../model/Family";

const defaultValue = null;

export const FamilyContext = createContext({
    value: defaultValue as Family | null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    setValue: (_: Family | null) => {},
});

export function FamilyContextProvider(props: PropsWithChildren) {
    const [value, setValue] = useState<Family | null>(defaultValue);

    return (
        <FamilyContext.Provider value={{ value, setValue }}>
            {props.children}
        </FamilyContext.Provider>
    );
}
