import TerminalInput from './assets/components/TerminalInput'
import './App.css'

function App() {
  return (
    <div className="App">
      <TerminalInput
        type="something"
        placeholder="click to start typing"
        focus={true}
      />
    </div>
  )
}

export default App
