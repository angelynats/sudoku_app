import React, {FC, ChangeEvent} from "react";

// components
import {Text} from "src/components";

// styles
import {Fill, Input, Root} from "./styles";

interface IProps {
    value: string;
    labelText: string;
    name: string;
    checked: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Radio: FC<IProps> = ({onChange, value, labelText, name, checked}) => {
    return (
        <Root>
            <Text color="blackLight" size="18px" textAlign="start">
                <label>
                    {labelText}
                    <Input
                        type="radio"
                        onChange={onChange}
                        name={name}
                        value={value}
                        checked={checked}
                        aria-checked={checked}
                    />
                    <Fill />
                </label>
            </Text>
        </Root>
    );
};

export default Radio;
