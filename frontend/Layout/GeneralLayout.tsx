import React from "react";
import Helmet from "next/head";


type Prop = React.PropsWithChildren<{
    title:string
}>
const GeneralLayout = ({ children,title }:Prop) => {


    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <div className="container my-3">
                {children}
            </div>
        </>
    );

};

export default GeneralLayout;