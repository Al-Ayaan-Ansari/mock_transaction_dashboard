import { useState } from 'react'
import { useTransactions } from '../context/TransactionContext'

const SelectionTools = () => {
  const { 
    filteredTransactions,
    selectedTransactions,
    selectAllVisible,
    clearSelections,
    selectTopByFeeRate
  } = useTransactions()
  
  const [topCount, setTopCount] = useState(10)
  
  // Handler for selecting top N transactions by fee rate
  const handleSelectTop = () => {
    selectTopByFeeRate(Number(topCount))
  }
  
  return (
    <div className="card p-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-medium text-text-primary mb-1">Selection Tools</h3>
          <p className="text-xs text-text-secondary">
            {selectedTransactions.length} of {filteredTransactions.length} transactions selected
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={selectAllVisible}
            className="btn-secondary text-xs py-1.5"
          >
            Select All
          </button>
          
          <button
            onClick={clearSelections}
            className="btn-secondary text-xs py-1.5"
            disabled={selectedTransactions.length === 0}
          >
            Clear
          </button>
          
          <div className="flex items-center">
            <span className="text-text-secondary text-xs mr-2">Top</span>
            <input
              type="number"
              value={topCount}
              onChange={(e) => setTopCount(e.target.value)}
              className="input w-16 text-xs py-1.5"
              min="1"
              max={filteredTransactions.length}
            />
            <button
              onClick={handleSelectTop}
              className="btn-primary text-xs py-1.5 ml-2"
            >
              Select Top 10 by fee rate
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectionTools