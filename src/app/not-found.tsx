import { Metadata } from 'next';
import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';

export const metadata: Metadata = {
  title: 'Not Found',
};

export default function NotFound() {
  return (
    <main>
      <section className='bg-indigo-950'>
        <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-black'>
          <RiAlarmWarningFill
            size={60}
            className='drop-shadow-glow animate-flicker text-red-500'
          />
          <h1 className='my-8 text-3xl md:text-6xl text-white'>Page Not Found</h1>
          <a href='/' className='text-purple-400 animated-underline cursor-pointer'>Back to homepage</a>
        </div>
      </section>
    </main>
  );
}
