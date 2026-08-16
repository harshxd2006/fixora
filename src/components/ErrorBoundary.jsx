import { Component } from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Fixora Application Error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center p-6">
          <div className="glass-card max-w-md w-full p-8 text-center flex flex-col items-center">
            <div className="w-14 h-14 bg-[#E5B268]/20 border border-[#E5B268]/40 rounded-full flex items-center justify-center text-[#E5B268] mb-6">
              <AlertCircle size={28} />
            </div>
            <h2 className="text-2xl font-extrabold text-white mb-2">System Interruption Detected</h2>
            <p className="text-sm text-white/70 leading-relaxed mb-6">
              Fixora encountered an unexpected temporary error while rendering this section. Your saved wishlist items and cart remain secure.
            </p>
            <button 
              onClick={this.handleReload} 
              className="btn-primary w-full h-12 flex items-center justify-center gap-2"
            >
              <RefreshCw size={18} /> Refresh Application
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
