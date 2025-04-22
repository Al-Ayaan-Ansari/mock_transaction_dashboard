import { useState } from 'react'
import FilterBar from './FilterBar'
import TransactionTable from './TransactionTable'
import TransactionModal from './TransactionModal'
import SelectionTools from './SelectionTools'
import TransactionStats from './TransactionStats'
import { useTransactions } from '../context/TransactionContext'

const Dashboard = () => {
  const { loading } = useTransactions()
  const [selectedTx, setSelectedTx] = useState(null)
  
  // Handler for opening the transaction modal
  const handleOpenModal = (tx) => {
    setSelectedTx(tx)
  }
  
  // Handler for closing the transaction modal
  const handleCloseModal = () => {
    setSelectedTx(null)
  }
  
  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
            Transaction Selection Dashboard
          </h1>
          <p className="text-text-secondary mt-1">
            Select and prioritize transactions for your next block
          </p>
        </div>
      </div>
      
      <TransactionStats />
      
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-1">
          <FilterBar />
        </div>
        
        <div className="xl:col-span-3 space-y-4">
          <SelectionTools />
          
          {loading ? (
            <div className="flex justify-center items-center h-64 card p-6">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-background-tertiary mb-4"></div>
                <div className="h-4 w-32 bg-background-tertiary rounded"></div>
                <div className="mt-2 h-3 w-24 bg-background-tertiary rounded"></div>
              </div>
            </div>
          ) : (
            <TransactionTable onSelectTransaction={handleOpenModal} />
          )}
        </div>
      </div>
      
      {selectedTx && (
        <TransactionModal 
          transaction={selectedTx} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  )
}

export default Dashboard