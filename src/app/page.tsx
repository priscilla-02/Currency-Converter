'use client';
import Head from 'next/head';
import * as React from 'react';
import '@/lib/env';
import UnderlineLink from '@/reusable/links/UnderlineLink';

import { NavBar } from '@/app/components/navBar';
import { Converter } from '@/app/components/converter';
import { CryptoConverter } from '@/app/components/cryptoConverter';
import SavedList from '@/app/components/savedList';

export default function HomePage() {
  const [selectMenu, setSelectMenu] = React.useState<"currency" | "crypto">("currency")

  return (
    <main>
      <Head>
        <title>Currency Converter Test</title>
      </Head>
      <section className='bg-indigo-950'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>

          <h1 className='my-4 text-white'>Currency Converter Test</h1>

          <form className="w-full max-w-4xl bg-gray-200 rounded-xl shadow-md border-4 border-purple-400 flex-col justify-center items-center">
            <NavBar selectMenu={selectMenu} setSelectMenu={setSelectMenu} />
            {selectMenu == "currency" ? <Converter selectMenu={selectMenu} /> : <CryptoConverter selectMenu={selectMenu} />}
          </form>

          <form className="my-10 min-h-[350px] w-full max-w-4xl bg-gray-200 rounded-xl shadow-md border-4 border-purple-400 flex-col">
            <SavedList />
          </form>

          <footer className='absolute bottom-2 text-white'>
            © 2024 By{' '}
            <UnderlineLink href='https://github.com/priscilla-02'>
              Priscilla Chan
            </UnderlineLink>
          </footer>
        </div>
      </section>
    </main >
  );
}