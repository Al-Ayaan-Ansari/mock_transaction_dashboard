import { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { generateMockTransactions } from '../utils/mockData'

// Create context
const TransactionContext = createContext()

// Custom hook to use the transaction context
export const useTransactions = () => {
  const context = useContext(TransactionContext)
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider')
  }
  return context
}

export const TransactionProvider = ({ children }) => {
  // Main state for transactions
  const [transactions, setTransactions] = useState([])
  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [selectedTransactions, setSelectedTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Filters and sorting state
  const [filters, setFilters] = useState({
    search: '',
    minFee: '',
    maxFee: '',
    minVsize: '',
    maxVsize: '',
    minWeight: '',
    maxWeight: '',
    minFeeRate: '',
    maxFeeRate: '',
  })
  
  const [sortConfig, setSortConfig] = useState({
    key: 'feeRate',
    direction: 'desc',
  })
  
  // Load mock data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        // Simulate API fetch with mock data
        const mockData = generateMockTransactions(100)
        setTransactions(mockData)
        setFilteredTransactions(mockData)
      } catch (error) {
        console.error('Error loading transaction data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [])
  
  // Apply filters
  useEffect(() => {
    let results = [...transactions]
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      results = results.filter(tx => 
        tx.txid.toLowerCase().includes(searchLower)
      )
    }
    
    // Apply numeric filters
    if (filters.minFee) {
      results = results.filter(tx => tx.fee >= Number(filters.minFee))
    }
    
    if (filters.maxFee) {
      results = results.filter(tx => tx.fee <= Number(filters.maxFee))
    }
    
    if (filters.minVsize) {
      results = results.filter(tx => tx.vsize >= Number(filters.minVsize))
    }
    
    if (filters.maxVsize) {
      results = results.filter(tx => tx.vsize <= Number(filters.maxVsize))
    }
    
    if (filters.minWeight) {
      results = results.filter(tx => tx.weight >= Number(filters.minWeight))
    }
    
    if (filters.maxWeight) {
      results = results.filter(tx => tx.weight <= Number(filters.maxWeight))
    }
    
    if (filters.minFeeRate) {
      results = results.filter(tx => tx.feeRate >= Number(filters.minFeeRate))
    }
    
    if (filters.maxFeeRate) {
      results = results.filter(tx => tx.feeRate <= Number(filters.maxFeeRate))
    }
    
    // Apply sorting
    if (sortConfig.key) {
      results.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
      })
    }
    
    setFilteredTransactions(results)
  }, [filters, transactions, sortConfig])
  
  // Handler for updating filters
  const updateFilter = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  // Handler for resetting filters
  const resetFilters = () => {
    setFilters({
      search: '',
      minFee: '',
      maxFee: '',
      minVsize: '',
      maxVsize: '',
      minWeight: '',
      maxWeight: '',
      minFeeRate: '',
      maxFeeRate: '',
    })
  }
  
  // Handler for sorting
  const handleSort = (key) => {
    setSortConfig(prev => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === 'asc' ? 'desc' : 'asc'
        }
      }
      return {
        key,
        direction: 'desc' // Default to descending for first click
      }
    })
  }
  
  // Handler for selecting/deselecting transactions
  const toggleSelectTransaction = (txid) => {
    setSelectedTransactions(prev => {
      if (prev.includes(txid)) {
        return prev.filter(id => id !== txid)
      } else {
        return [...prev, txid]
      }
    })
  }
  
  // Handler for selecting all visible transactions
  const selectAllVisible = () => {
    setSelectedTransactions(filteredTransactions.map(tx => tx.txid))
  }
  
  // Handler for clearing all selections
  const clearSelections = () => {
    setSelectedTransactions([])
  }
  
  // Handler for selecting top N transactions by fee rate
  const selectTopByFeeRate = (n = 10) => {
    const topTxs = [...transactions]
      .sort((a, b) => b.feeRate - a.feeRate)
      .slice(0, n)
      .map(tx => tx.txid)
    
    setSelectedTransactions(topTxs)
  }
  
  // Value object to be provided by the context
  const value = {
    transactions,
    filteredTransactions,
    selectedTransactions,
    loading,
    filters,
    sortConfig,
    updateFilter,
    resetFilters,
    handleSort,
    toggleSelectTransaction,
    selectAllVisible,
    clearSelections,
    selectTopByFeeRate,
  }
  
  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  )
}

TransactionProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default TransactionContext