import { useState } from 'react'
import ColorSchemesExample from'./components/Navbar'
import ResponsiveAppBar from './components/MuiNavbar'
import Api from './components/Api'
import DataFetcher from './components/Fake'
{
  /* The following line can be included in your src/index.js or App.js file */
}
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

<ResponsiveAppBar/>
<DataFetcher/>
    </>
  )
}

export default App
