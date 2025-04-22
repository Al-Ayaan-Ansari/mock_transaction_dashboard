// Generate randomized mock transaction data for testing
export const generateMockTransactions = (count = 100) => {
  const transactions = []
  
  for (let i = 0; i < count; i++) {
    // random Txid
    const txid = [...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')
    
    // Random weight
    const weight = Math.floor(Math.random() * 2000) + 1
    
    // vsize
    const vsize = Math.ceil(weight / 4)
    
    // Random fee
    const fee = Math.floor(Math.random() * 500000) + 1000
    
    // Fee rate
    const feeRate = parseFloat((fee / vsize).toFixed(2))
    
    // Random timestamp
    const timestamp = Date.now() - Math.floor(Math.random() * 24 * 60 * 60 * 1000)
    
    // Generate random inputs
    const inputCount = Math.floor(Math.random() * 5) + 1
    const inputs = []
    
    for (let j = 0; j < inputCount; j++) {
      inputs.push({
        txid: [...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
        vout: Math.floor(Math.random() * 10),
        prevout: {
          scriptpubkey: `76a914${[...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}88ac`,
          scriptpubkey_asm: `OP_DUP OP_HASH160 ${[...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')} OP_EQUALVERIFY OP_CHECKSIG`,
          scriptpubkey_type: "p2pkh",
          scriptpubkey_address: `1${[...Array(33)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`,
          value: Math.floor(Math.random() * 1000000) + 10000
        },
        scriptsig: `${[...Array(10)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`,
        scriptsig_asm: `${[...Array(130)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`,
        witness: [`${[...Array(140)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`],
        is_coinbase: false,
        sequence: 4294967295
      })
    }
    
    // Generate random outputs
    const outputCount = Math.floor(Math.random() * 3) + 1
    const outputs = []
    
    for (let k = 0; k < outputCount; k++) {
      outputs.push({
        scriptpubkey: `76a914${[...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}88ac`,
        scriptpubkey_asm: `OP_DUP OP_HASH160 ${[...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')} OP_EQUALVERIFY OP_CHECKSIG`,
        scriptpubkey_type: "p2pkh",
        scriptpubkey_address: `1${[...Array(33)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`,
        value: Math.floor(Math.random() * 1000000) + 10000
      })
    }
    
    transactions.push({
      txid,
      weight,
      vsize,
      fee,
      feeRate,
      timestamp,
      status: {
        confirmed: Math.random() > 0.2,
        block_height: Math.floor(824000 + Math.random() * 500),
        block_time: timestamp
      },
      inputs,
      outputs
    })
  }
  
  return transactions
}

// Format satoshis to BTC
export const formatBTC = (sats) => {
  return (sats / 100000000).toFixed(8)
}

// Format large numbers with commas
export const formatNumber = (num) => {
  return new Intl.NumberFormat().format(num)
}