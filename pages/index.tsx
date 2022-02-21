import Link from 'next/link'
import useSWR from 'swr'
import Image from 'next/image'
import { client } from '../util/genqlClient'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import * as firebaseui from "firebaseui";
import firebaseConfig from "../config/firebaseConfig";
import Register from './register'

export default function App() {

  firebase.initializeApp(firebaseConfig);
  const uiConfig = {
    signInSuccessUrl: "http://localhost:3000/home", 
    signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
    tosUrl: "http://localhost:3000/home"
  };
  return (
    <div>
      <Register firebaseClient={firebase} config={uiConfig}/>
    </div>
  )
}

