import React from "react";

export const useInput = (initialValue: string = '') => {
    const [value, setValue] = React.useState(initialValue);

    return {
        value,
        setValue: (text: string) => setValue(text),
        reset: () => setValue(""),
        bind: {
            value,
            onChangeText: (text: string) => {
                setValue(text);
            },
        }
    }
};