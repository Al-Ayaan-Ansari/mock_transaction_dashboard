import { useState } from 'react'
import Dashboard from './components/Dashboard'
import Header from './components/Header'
import { TransactionProvider } from './context/TransactionContext'

function App() {
  const [darkMode] = useState(true) // Default to dark mode
  
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-background-primary' : 'bg-gray-100'}`}>
      <TransactionProvider>
        <Header />
        <main className="container mx-auto px-4 py-6">
          <Dashboard />
        </main>
        <footer className="py-4 px-6 text-center text-text-secondary text-sm border-t border-border">
          <p>© {new Date().getFullYear()} Transaction Selection Dashboard • Miner Tools</p>
        </footer>
      </TransactionProvider>
    </div>
  )
}

export default App