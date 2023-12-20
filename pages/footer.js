import React, { useEffect } from 'react'
import Footer from '../components/Footer'
import { setPageTitle } from '../global/constants/pageTitle';

const footer = () => {

  useEffect(() => {
    setPageTitle('Footers');
  }, []);

  return (
    <div>
        <Footer/>
    </div>
  )
}

export default footer