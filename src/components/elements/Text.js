import React from "react";

export default function Text({ as, style, children, className , ...rest}) {
    const Component = as || "p";
    return <Component className={ className } style={ style } {...rest} >{ children }</Component>
}