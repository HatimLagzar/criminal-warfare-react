import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Middle from '../Middle/Middle';
import Router from '../Router/Router';

export default function App() {
  return (
    <>
      <Header />
      <Middle>
        <Router />
      </Middle>
      <Footer />
    </>
  );
}
