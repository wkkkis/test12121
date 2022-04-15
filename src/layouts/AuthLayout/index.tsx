import React from "react";

//Interfaces
import { IAuthLayout } from "./AuthLayout.type";

import Container from '@material-ui/core/Container';

const AuthLayout: React.FC<IAuthLayout> = ({children}) => {

    return (
        <Container maxWidth="sm">
            {children}
        </Container>
    );
};

export default AuthLayout;
