'use client';
import Head from 'next/head';
import * as React from 'react';
import '@/lib/env';
import ArrowLink from '@/reusable/links/ArrowLink';
import ButtonLink from '@/reusable/links/ButtonLink';
import UnderlineLink from '@/reusable/links/UnderlineLink';


import { NavBar } from '@/app/components/navBar';

import { Converter } from '@/app/components/converter';
import { CryptoConverter } from '@/app/components/cryptoConverter';

export default function HomePage() {

  const [selectMenu, setSelectMenu] = React.useState<"currency" | "crypto">("currency")

  return (
    <main>
      <Head>
        <title>Currency Converter</title>
      </Head>
      <section className='bg-indigo-950'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>

          <h1 className='my-4  text-white'>CURRENCY CONVERTER</h1>

          <form className="w-full max-w-4xl bg-gray-200 rounded-xl shadow-md border-4 border-purple-400 flex-col justify-center items-center">
            <NavBar selectMenu={selectMenu} setSelectMenu={setSelectMenu} />
            {selectMenu == "currency" ? <Converter selectMenu={selectMenu} /> : <CryptoConverter selectMenu={selectMenu} />}
          </form>

          <p className='mt-2 text-sm text-white'>
            <ArrowLink href='https://github.com/priscilla-02'>
              See the repository
            </ArrowLink>
          </p>
          <ButtonLink className='mt-6' href='/components' variant='light'>
            See all components
          </ButtonLink>
          <footer className='absolute bottom-2 text-white'>
            © {new Date().getFullYear()} By{' '}
            <UnderlineLink href='https://github.com/priscilla-02'>
              Priscilla Chan
            </UnderlineLink>
          </footer>
        </div>
      </section>
    </main >
  );
}