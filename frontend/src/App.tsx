import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home'
import Upload from './Pages/Upload'
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' Component={Home}/>
          <Route path='/upload' Component={Upload}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
