import { EmailContextProvider } from "./context/EmailContext"
import EmailClient from "./EmailClient"

function App() {
  return (
    <EmailContextProvider>
      <EmailClient />
    </EmailContextProvider>
  )
}

export default App
