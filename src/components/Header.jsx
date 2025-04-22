import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// Logo component with mining theme
const Logo = ({ className = '' }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <div className="flex items-center justify-center h-8 w-8 rounded-md bg-accent-orange">
      <span className="text-white font-bold text-sm">M</span>
    </div>
    <span className="font-semibold text-lg text-text-primary">TxMiner</span>
  </div>
)

Logo.propTypes = {
  className: PropTypes.string
}

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  
  // Add shadow when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header 
      className={`sticky top-0 z-10 py-4 px-6 transition-all duration-200 ${
        scrolled 
          ? 'bg-background-primary shadow-md' 
          : 'bg-background-primary'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Logo />
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-1">
            <div className="h-2 w-2 rounded-full bg-accent-green animate-pulse"></div>
            <span className="text-accent-green text-xs">Network Active</span>
          </div>
          
          <div className="px-3 py-1 rounded-full bg-background-secondary border border-border text-text-secondary text-xs">
            <span className="font-medium">Block Height:</span> 824,568
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header