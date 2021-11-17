import {Routes, Route} from 'react-router-dom'
import Landing from './pages/Landing'

function App() {
  return (
    <div className="App">
        <main>
            <Routes>
                <Route path={"/"} exact element={<Landing/>}/>
            </Routes>
        </main>
    </div>
  );
}

export default App
