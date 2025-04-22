import { useTransactions } from '../context/TransactionContext'
import { formatNumber } from '../utils/mockData'

const TransactionStats = () => {
  const { 
    filteredTransactions, 
    selectedTransactions,
    transactions
  } = useTransactions()
  
  // Calculate total fee and weight for selected transactions
  const selectedStats = selectedTransactions.reduce((stats, txid) => {
    const tx = transactions.find(t => t.txid === txid)
    if (tx) {
      stats.totalFee += tx.fee
      stats.totalWeight += tx.weight
      stats.totalVsize += tx.vsize
    }
    return stats
  }, { totalFee: 0, totalWeight: 0, totalVsize: 0 })
  
  // Calculate average fee rate for selected transactions
  const avgFeeRate = selectedStats.totalVsize > 0 
    ? (selectedStats.totalFee / selectedStats.totalVsize).toFixed(2) 
    : 0
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        title="Transaction Pool" 
        value={formatNumber(transactions.length)}
        subtitle="Total Transactions" 
        color="purple"
      />
      <StatCard 
        title="Selected Transactions" 
        value={formatNumber(selectedTransactions.length)}
        subtitle={`${((selectedTransactions.length / transactions.length) * 100).toFixed(1)}% of Total`}
        color="orange" 
      />
      <StatCard 
        title="Selected Weight" 
        value={`${formatNumber(selectedStats.totalWeight)} WU`}
        subtitle={`${formatNumber(selectedStats.totalVsize)} vBytes`}
        color="green" 
      />
      <StatCard 
        title="Avg. Fee Rate" 
        value={`${avgFeeRate} sat/vB`}
        subtitle={`${formatNumber(selectedStats.totalFee)} sats Total Fee`}
        color="purple" 
      />
    </div>
  )
}

// Stat card component
const StatCard = ({ title, value, subtitle, color }) => {
  let colorClass
  
  switch (color) {
    case 'purple':
      colorClass = 'border-accent-purple/20 bg-gradient-to-br from-background-secondary to-accent-purple/10'
      break
    case 'green':
      colorClass = 'border-accent-green/20 bg-gradient-to-br from-background-secondary to-accent-green/10'
      break
    case 'orange':
      colorClass = 'border-accent-orange/20 bg-gradient-to-br from-background-secondary to-accent-orange/10'
      break
    default:
      colorClass = 'border-border bg-background-secondary'
  }
  
  return (
    <div className={`card border p-4 ${colorClass}`}>
      <h3 className="text-text-secondary text-sm font-medium">{title}</h3>
      <p className="text-text-primary text-2xl font-bold mt-2">{value}</p>
      <p className="text-text-secondary text-xs mt-1">{subtitle}</p>
    </div>
  )
}

export default TransactionStats