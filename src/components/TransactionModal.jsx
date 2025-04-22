import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { formatNumber, formatBTC } from '../utils/mockData'

const TransactionModal = ({ transaction, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview')
  
  // Close modal on ESC key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose()
    }
    window.addEventListener('keydown', handleEsc)
    
    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [onClose])
  
  // Format address for better display
  const formatAddress = (address) => {
    if (!address) return ''
    if (address.length <= 20) return address
    return `${address.slice(0, 10)}...${address.slice(-10)}`
  }
  
  // Render inputs list
  const renderInputs = () => {
    return transaction.inputs.map((input, index) => (
      <div key={`${input.txid}-${index}`} className="border-b border-border py-3">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-text-secondary">From:</span>
            <span className="font-mono text-sm text-text-primary">
              {formatAddress(input.prevout?.scriptpubkey_address || 'Unknown Address')}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs text-text-secondary">Amount:</span>
            <span className="text-sm text-text-primary">
              {input.prevout ? formatNumber(input.prevout.value) : '?'} sats
            </span>
          </div>
        </div>
        <div className="mt-1">
          <div className="flex flex-wrap gap-2">
            <span className="text-xs bg-background-tertiary rounded px-2 py-1">
              Txid: {input.txid.slice(0, 8)}...{input.txid.slice(-8)}
            </span>
            <span className="text-xs bg-background-tertiary rounded px-2 py-1">
              Vout: {input.vout}
            </span>
          </div>
        </div>
      </div>
    ))
  }
  
  // Render outputs list
  const renderOutputs = () => {
    return transaction.outputs.map((output, index) => (
      <div key={index} className="border-b border-border py-3">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-text-secondary">To:</span>
            <span className="font-mono text-sm text-text-primary">
              {formatAddress(output.scriptpubkey_address || 'Unknown Address')}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs text-text-secondary">Amount:</span>
            <span className="text-sm text-text-primary">
              {formatNumber(output.value)} sats
            </span>
          </div>
        </div>
        <div className="mt-1">
          <span className="text-xs bg-background-tertiary rounded px-2 py-1">
            Type: {output.scriptpubkey_type}
          </span>
        </div>
      </div>
    ))
  }
  
  // Block information display
  const renderBlockInfo = () => {
    const { status } = transaction
    
    if (status.confirmed) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="card px-4 py-3">
            <div className="text-xs text-text-secondary">Block Height</div>
            <div className="text-text-primary font-medium">{status.block_height}</div>
          </div>
          <div className="card px-4 py-3">
            <div className="text-xs text-text-secondary">Block Time</div>
            <div className="text-text-primary font-medium">
              {new Date(status.block_time).toLocaleString()}
            </div>
          </div>
          <div className="card px-4 py-3">
            <div className="text-xs text-text-secondary">Confirmations</div>
            <div className="text-text-primary font-medium">
              {Math.floor(Math.random() * 100) + 1}
            </div>
          </div>
        </div>
      )
    }
    
    return (
      <div className="bg-accent-orange bg-opacity-10 border border-accent-orange/20 rounded-lg px-4 py-3 mb-4">
        <div className="flex items-center">
          <div className="text-accent-orange font-medium">Unconfirmed Transaction</div>
        </div>
        <div className="text-text-secondary text-sm mt-1">
          This transaction is in the mempool and has not been confirmed yet.
        </div>
      </div>
    )
  }
  
  // Overview tab content
  const renderOverview = () => (
    <div className="space-y-4">
      {renderBlockInfo()}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card px-4 py-3">
          <div className="text-xs text-text-secondary">Transaction Fee</div>
          <div className="text-text-primary font-medium">{formatNumber(transaction.fee)} sats</div>
          <div className="text-text-secondary text-xs">{formatBTC(transaction.fee)} BTC</div>
        </div>
        
        <div className="card px-4 py-3">
          <div className="text-xs text-text-secondary">Fee Rate</div>
          <div className="text-text-primary font-medium">{transaction.feeRate.toFixed(2)} sat/vB</div>
        </div>
        
        <div className="card px-4 py-3">
          <div className="text-xs text-text-secondary">Virtual Size</div>
          <div className="text-text-primary font-medium">{formatNumber(transaction.vsize)} vB</div>
        </div>
        
        <div className="card px-4 py-3">
          <div className="text-xs text-text-secondary">Weight Units</div>
          <div className="text-text-primary font-medium">{formatNumber(transaction.weight)} WU</div>
        </div>
      </div>
      
      <div className="card px-4 py-3">
        <div className="text-xs text-text-secondary mb-2">Transaction ID</div>
        <div className="bg-background-tertiary px-3 py-2 rounded overflow-x-auto">
          <code className="text-xs sm:text-sm font-mono text-text-primary break-all">
            {transaction.txid}
          </code>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 card px-4 py-3">
          <div className="text-xs text-text-secondary mb-2">Inputs</div>
          <div className="text-text-primary font-medium text-lg">
            {transaction.inputs.length}
          </div>
          <div className="text-text-secondary text-xs">
            Click on "Inputs" tab to see details
          </div>
        </div>
        
        <div className="flex-1 card px-4 py-3">
          <div className="text-xs text-text-secondary mb-2">Outputs</div>
          <div className="text-text-primary font-medium text-lg">
            {transaction.outputs.length}
          </div>
          <div className="text-text-secondary text-xs">
            Click on "Outputs" tab to see details
          </div>
        </div>
      </div>
    </div>
  )
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>
      
      <div 
        className="relative bg-background-secondary rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-slide-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-border">
          <h3 className="text-xl font-semibold text-text-primary">Transaction Details</h3>
          <button 
            className="text-text-secondary hover:text-text-primary transition-colors"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex border-b border-border overflow-x-auto">
          <button
            className={`px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === 'overview' 
                ? 'text-accent-purple border-b-2 border-accent-purple' 
                : 'text-text-secondary hover:text-text-primary'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === 'inputs' 
                ? 'text-accent-purple border-b-2 border-accent-purple' 
                : 'text-text-secondary hover:text-text-primary'
            }`}
            onClick={() => setActiveTab('inputs')}
          >
            Inputs ({transaction.inputs.length})
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === 'outputs' 
                ? 'text-accent-purple border-b-2 border-accent-purple' 
                : 'text-text-secondary hover:text-text-primary'
            }`}
            onClick={() => setActiveTab('outputs')}
          >
            Outputs ({transaction.outputs.length})
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 130px)' }}>
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'inputs' && (
            <div className="space-y-1">
              <div className="text-sm text-text-secondary mb-2">
                This transaction has {transaction.inputs.length} input{transaction.inputs.length !== 1 ? 's' : ''}
              </div>
              {renderInputs()}
            </div>
          )}
          {activeTab === 'outputs' && (
            <div className="space-y-1">
              <div className="text-sm text-text-secondary mb-2">
                This transaction has {transaction.outputs.length} output{transaction.outputs.length !== 1 ? 's' : ''}
              </div>
              {renderOutputs()}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

TransactionModal.propTypes = {
  transaction: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default TransactionModal