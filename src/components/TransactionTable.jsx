import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { formatNumber, formatBTC } from '../utils/mockData'
import { useTransactions } from '../context/TransactionContext'

const TransactionTable = ({ onSelectTransaction }) => {
  const { 
    filteredTransactions, 
    sortConfig, 
    handleSort,
    selectedTransactions,
    toggleSelectTransaction
  } = useTransactions()
  
  // Get sort direction indicator
  const getSortDirectionIndicator = (key) => {
    if (sortConfig.key !== key) return null
    return sortConfig.direction === 'asc' ? '↑' : '↓'
  }
  
  // Format timestamp to date string
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString()
  }
  
  // Get transaction status badge
  const getStatusBadge = (status) => {
    if (status.confirmed) {
      return (
        <span className="badge bg-accent-green bg-opacity-20 text-accent-green">
          Confirmed
        </span>
      )
    } else {
      return (
        <span className="badge bg-accent-orange bg-opacity-20 text-accent-orange">
          Pending
        </span>
      )
    }
  }
  
  // Memoized row renderer for better performance
  const tableRows = useMemo(() => {
    return filteredTransactions.map((tx) => {
      const isSelected = selectedTransactions.includes(tx.txid)
      
      return (
        <tr 
          key={tx.txid} 
          onClick={() => onSelectTransaction(tx)}
          className={`
            border-b border-border hover:bg-background-tertiary transition-colors duration-150 cursor-pointer
            ${isSelected ? 'bg-accent-purple bg-opacity-10' : ''}
          `}
        >
          <td className="py-3 px-4">
            <div 
              className="flex items-center"
              onClick={(e) => {
                e.stopPropagation()
                toggleSelectTransaction(tx.txid)
              }}
            >
              <input 
                type="checkbox" 
                checked={isSelected}
                onChange={() => {}}
                className="rounded border-border bg-background-tertiary text-accent-purple focus:ring-accent-purple focus:ring-offset-0"
              />
            </div>
          </td>
          <td className="py-3 px-4">
            <div className="flex flex-col">
              <span className="font-mono text-xs text-text-primary truncate w-24 md:w-40">
                {tx.txid.substring(0, 8)}...{tx.txid.substring(tx.txid.length - 8)}
              </span>
              <span className="text-xs text-text-secondary">
                {formatTimestamp(tx.timestamp)}
              </span>
            </div>
          </td>
          <td className="py-3 px-4">
            <div className="flex flex-col items-start md:items-end">
              <span className="text-sm font-medium text-text-primary">
                {formatNumber(tx.fee)} sats
              </span>
              <span className="text-xs text-text-secondary">
                {formatBTC(tx.fee)} BTC
              </span>
            </div>
          </td>
          <td className="py-3 px-4 text-right">
            <span className="text-sm text-text-primary">
              {formatNumber(tx.vsize)}
            </span>
          </td>
          <td className="py-3 px-4 text-right">
            <span className="text-sm text-text-primary">
              {formatNumber(tx.weight)}
            </span>
          </td>
          <td className="py-3 px-4 text-right">
            <span className={`text-sm font-medium ${
              tx.feeRate > 50 ? 'text-accent-green' : 
              tx.feeRate > 10 ? 'text-accent-purple' : 'text-accent-orange'
            }`}>
              {tx.feeRate.toFixed(2)}
            </span>
          </td>
          <td className="py-3 px-4">
            {getStatusBadge(tx.status)}
          </td>
        </tr>
      )
    })
  }, [filteredTransactions, selectedTransactions, toggleSelectTransaction, onSelectTransaction])
  
  return (
    <div className="card overflow-hidden animate-fade-in">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-background-tertiary">
            <tr>
              <th className="py-3 px-4">
                <span className="sr-only">Select</span>
              </th>
              <th 
                className="py-3 px-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:text-text-primary"
                onClick={() => handleSort('timestamp')}
              >
                Txid / Time {getSortDirectionIndicator('timestamp')}
              </th>
              <th 
                className="py-3 px-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:text-text-primary"
                onClick={() => handleSort('fee')}
              >
                Fee {getSortDirectionIndicator('fee')}
              </th>
              <th 
                className="py-3 px-4 text-right text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:text-text-primary"
                onClick={() => handleSort('vsize')}
              >
                vSize {getSortDirectionIndicator('vsize')}
              </th>
              <th 
                className="py-3 px-4 text-right text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:text-text-primary"
                onClick={() => handleSort('weight')}
              >
                Weight {getSortDirectionIndicator('weight')}
              </th>
              <th 
                className="py-3 px-4 text-right text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:text-text-primary"
                onClick={() => handleSort('feeRate')}
              >
                Fee Rate {getSortDirectionIndicator('feeRate')}
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-background-secondary divide-y divide-border">
            {tableRows.length > 0 ? (
              tableRows
            ) : (
              <tr>
                <td colSpan="7" className="py-8 text-center text-text-secondary">
                  No transactions found matching your filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

TransactionTable.propTypes = {
  onSelectTransaction: PropTypes.func.isRequired,
}

export default TransactionTable