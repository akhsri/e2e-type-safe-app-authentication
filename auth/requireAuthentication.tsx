
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useEffect, useState } from 'react';

export function requireAuthentication(gssp: GetServerSideProps) {
  console.log("Inside requireAuthentication ")
  return async (ctx: GetServerSidePropsContext) => {
    const { req } = ctx;

    try {
      // const ISSERVER = typeof window === "undefined";


      // if(!ISSERVER){
      //     userData = localStorage.getItem("user_data");
      // }
      if (!req) {
        console.log("Inside client")
        let userData = localStorage.getItem("user_data");
        let userDataObject;
        let token;
        if (userData) {
          userDataObject = JSON.parse(userData);
          token = userDataObject.uid;
        }
        console.log("userDataObject: ", userDataObject);
        if (!token) {
          return {
            redirect: {
              permanent: false,
              destination: '/',
            },
          };
        }
      }
    } catch (error) {
      console.log("error: ", error);
      // Failure in the query or any error should fallback here
      // this route is possibly forbidden means the cookie is invalid
      // or the cookie is expired
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
      };
    }


    return await gssp(ctx);
  };
}
