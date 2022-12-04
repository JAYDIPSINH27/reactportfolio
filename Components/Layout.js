import Navbar from './Navbar'
import Footer from './Footer'
import { useState } from 'react'

export default function Layout({ children }) {
  var [darkMode, setDarkMode] = useState(true);
  return (
    <div className={darkMode ? "dark" : ""}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode}/>
      <main>{children}</main>
      <Footer />
    </div>
  )
}