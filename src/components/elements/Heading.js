import React from "react";

export default function Heading({ as, children, className, ...rest }) {
    const Component = as || "h3";
    return <Component className={ className } {...rest}>{ children }</Component>
}