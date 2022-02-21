import React, {FC, Fragment, useCallback, useEffect, useState } from 'react'
import firebaseConfig from '../config/firebaseConfig';
import * as firebaseui from "firebaseui";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useRouter } from 'next/dist/client/router';

interface Props {
    firebaseClient: typeof firebase;
    config: firebaseui.auth.Config;
  }

const Register : FC<Props> = ({ firebaseClient, config }) => {
    const Router = useRouter();
    const [user, setUser] = useState({})

    const loadFirebaseui = useCallback(async () => {
        const firebaseui = await import("firebaseui");
        const firebaseUi =
          firebaseui.auth.AuthUI.getInstance() ||
          new firebaseui.auth.AuthUI(firebaseClient.auth());
        firebaseUi.start("#firebaseui-auth-container", config);
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("user: ", user)
                localStorage.setItem('user_data', JSON.stringify(user));
              setUser(user);  
            } else {
              // User is signed out
              // ...
            }
          });
      }, [firebaseClient, config]);
    
      useEffect(() => {
       loadFirebaseui()
      }, []);

    return (
        <Fragment>
            <div>register</div>
            <div id="firebaseui-auth-container"></div>
        </Fragment>
    )
}

export default Register