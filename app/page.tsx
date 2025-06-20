"use client"

import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Dashboard from './dashboard/page';

export default function Home() {

  return (
    <div>
      <Navbar/>
      <Dashboard/>
      <Footer/>
    </div>
  );
}
