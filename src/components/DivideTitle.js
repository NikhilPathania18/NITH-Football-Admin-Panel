import React from "react";

export default function DivideTitle({ as, className, title, children, ...rest }) {
    const Component = as || "h6";
    return <Component className={`mc-divide-title ${ className ? className : "" }`} {...rest}>{ title || children || "divide title" }</Component>
}