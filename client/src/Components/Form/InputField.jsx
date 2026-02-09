import React from "react";
import { TextField } from "@mui/material";
import { useEffect } from "react";

const InputField = (props) => {
  const hasValueProp = Object.prototype.hasOwnProperty.call(props, "value");
  return (
    <div>
      <TextField
        required={!props.required}
        autoComplete="on"
        id={props.id}
        type={props.type ? props.type : "text"}
        name={props.name}
        label={props.label}
        fullWidth={props.fullWidth}
        variant="outlined"
        value={hasValueProp ? props.value : undefined}
        defaultValue={!hasValueProp ? (props.value ? props.value : "") : undefined}
        onChange={props.onChange}
        InputProps={props.inputProps}
        disabled={props.disabled}
      />
    </div>
  );
};

export default InputField;
