import React from "react";

interface IRenderIf {
    condition: string | number | boolean | null | undefined,
    children: React.ReactNode
}

export const RenderIf: React.FC<IRenderIf> = ({ condition, children }) => {
    return condition ? <>{children}</> : null

}


export default RenderIf