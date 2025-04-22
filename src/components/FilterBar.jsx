import { useTransactions } from '../context/TransactionContext'

const FilterBar = () => {
  const { 
    filters, 
    updateFilter, 
    resetFilters 
  } = useTransactions()
  
  // Handler for filter input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target
    updateFilter(name, value)
  }
  
  // Handler for clearing all filters
  const handleResetFilters = () => {
    resetFilters()
  }
  
  return (
    <div className="card p-4 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
        <button 
          onClick={handleResetFilters}
          className="text-xs text-accent-purple hover:text-opacity-80 transition-colors"
        >
          Reset All
        </button>
      </div>
      
      <div className="space-y-4">
        {/* Search filter */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-text-secondary mb-1">
            Search by TXID
          </label>
          <input
            type="text"
            id="search"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Enter transaction ID..."
            className="input w-full text-sm"
          />
        </div>
        
        {/* Fee range filter */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">
            Fee Range (sats)
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              name="minFee"
              value={filters.minFee}
              onChange={handleFilterChange}
              placeholder="Min"
              className="input w-full text-sm"
              min="0"
            />
            <span className="text-text-secondary">-</span>
            <input
              type="number"
              name="maxFee"
              value={filters.maxFee}
              onChange={handleFilterChange}
              placeholder="Max"
              className="input w-full text-sm"
              min="0"
            />
          </div>
        </div>
        
        {/* vSize range filter */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">
            vSize Range (vB)
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              name="minVsize"
              value={filters.minVsize}
              onChange={handleFilterChange}
              placeholder="Min"
              className="input w-full text-sm"
              min="0"
            />
            <span className="text-text-secondary">-</span>
            <input
              type="number"
              name="maxVsize"
              value={filters.maxVsize}
              onChange={handleFilterChange}
              placeholder="Max"
              className="input w-full text-sm"
              min="0"
            />
          </div>
        </div>
        
        {/* Weight range filter */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">
            Weight Range (WU)
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              name="minWeight"
              value={filters.minWeight}
              onChange={handleFilterChange}
              placeholder="Min"
              className="input w-full text-sm"
              min="0"
            />
            <span className="text-text-secondary">-</span>
            <input
              type="number"
              name="maxWeight"
              value={filters.maxWeight}
              onChange={handleFilterChange}
              placeholder="Max"
              className="input w-full text-sm"
              min="0"
            />
          </div>
        </div>
        
        {/* Fee Rate range filter */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">
            Fee Rate (sats/vB)
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              name="minFeeRate"
              value={filters.minFeeRate}
              onChange={handleFilterChange}
              placeholder="Min"
              className="input w-full text-sm"
              min="0"
              step="0.01"
            />
            <span className="text-text-secondary">-</span>
            <input
              type="number"
              name="maxFeeRate"
              value={filters.maxFeeRate}
              onChange={handleFilterChange}
              placeholder="Max"
              className="input w-full text-sm"
              min="0"
              step="0.01"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterBar