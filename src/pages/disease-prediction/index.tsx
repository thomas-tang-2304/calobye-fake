/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect } from 'react';
import DiseasePrediction from '@/components/DiseasePrediction/DiseasePrediction';
import Head from 'next/head';
import SideMenu from '@/components/SideMenu';
import { NextRouter, useRouter } from 'next/router';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function Index() {
  const { asPath }: NextRouter = useRouter();
  const router: NextRouter = useRouter();

  useEffect(() => {
    if (!cookies.get('account_token')) {
      router.push('/login');
    }
  }, []);

  return (
    <div className={`container  mx-auto`}>
      <Head>
        <title>Disease prediction</title>
        <meta
          name="description"
          content="TypeScript starter for Next.js that includes all you need to build amazing apps"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`h-[100vh]`}>
        <div className={`flex gap-6 w-[100%`}>
          <SideMenu currentPath={asPath} />
          <DiseasePrediction />
        </div>
      </div>
    </div>
  );
}
