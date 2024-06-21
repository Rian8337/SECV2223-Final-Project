import { PropsWithChildren, createContext, useState } from "react";
import { User } from "../types/User";

const defaultValue = undefined;

export const UserContext = createContext({
    value: defaultValue as User | null | undefined,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    setValue: (_: User | null) => {},
});

export function UserContextProvider(props: PropsWithChildren) {
    const [value, setValue] = useState<User | null | undefined>(defaultValue);

    return (
        <UserContext.Provider
            value={{
                value,
                setValue,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
}
