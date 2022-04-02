import React from 'react'
import { AmplifyAuthenticator } from '@aws-amplify/ui-react';
import Home from '../../pages/home-page';
import HighlightImage from '../highlight-image';
import useUser from '../../hook/useUser';

const Login = () => {
    const [thisUser, isAdmin]= useUser();
    return (
       <>{!thisUser&&<HighlightImage />}
            <AmplifyAuthenticator>
                <Home />
            </AmplifyAuthenticator>
            </>
    )
}

export default Login
