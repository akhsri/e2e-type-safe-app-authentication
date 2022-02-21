import Link from 'next/link'
import useSWR from 'swr'
import Image from 'next/image'
import { client } from '../util/genqlClient'
import { GetServerSideProps } from 'next'
import { requireAuthentication } from '../auth/requireAuthentication'
import { getAuth, signOut } from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebaseConfig from "../config/firebaseConfig";
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react'

export default function Home() {

  const Router = useRouter();

  useEffect(() => {
    let userData = localStorage.getItem("user_data");
    let userDataObject = JSON.parse(userData!);
    if(!(userData && userDataObject.uid)){
      Router.push('/');
    }
  })

  firebase.initializeApp(firebaseConfig);
  const fetcher = () =>
    client.query({
      getItems: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        createdAt: true,
      }
    })

  const { data, error } = useSWR('getItems', fetcher)

  const handleSignout = () => {
    console.log("signout called")
    const auth = getAuth();
signOut(auth).then(() => {
  // Sign-out successful.
  Router.push('/')
  localStorage.removeItem("user_data")
}).catch((error) => {
  // An error happened.
});
  }
  
  return (
    <div>
      <div className="right">
        <Link href="/create">
          <a className="btn"> Create Item &#8594;</a>
        </Link>
        
      </div>
      <div className="right">
        <div className='right'>
          <button className='btn' onClick={handleSignout}>
            Signout
          </button>
        </div>
        
      </div>
      {error && <p>Oops, something went wrong!</p>}
      <ul>
        {data?.getItems && data.getItems.map((item) => (
          <li key={item.id}>
            <Link href={`/item/${item.id}`}>
              <a>
                {item.imageUrl ?
                  <img src={item.imageUrl} height="640" width="480" /> :
                  <img src="https://user-images.githubusercontent.com/33921841/132140321-01c18680-e304-4069-a0f0-b81a9f6d5cc9.png" height="640" width="480" />
                }
                <h2>{item.title}</h2>
                <p>{item.description ? item?.description : "No description available"}</p>

                {/* {item?.imageUrl} */}

                <p>Created At: {new Date(item?.createdAt).toDateString()}</p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

// export const getServerSideProps: GetServerSideProps = requireAuthentication(async (_ctx) => {
//     return {
//       props: {},
//     };
//   });
