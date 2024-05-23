
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { WagmiProvider } from 'wagmi';
import { arbitrum, mainnet } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Update import
import LandingScreen from '../src/components/LandingScreen';

import RegisterScreen from '../src/components/UserRegistrationScreen';
import VerifyIdentityScreen from '../src/components/IdentityVerification';
import Medicineprovider from '../src/components/MedicineProvider'
import HospitalDashboard from './components/HospitalDashboard';
import PharmacyDashboard from './components/PharmacyDashboard';
import Dashboard from '../src/components/Dashboard';



// 1. Setup QueryClient
const queryClient = new QueryClient();

// 2. Define Project ID
const projectId = 'ca9f39abd6a90d361a2f5a90f9b8ab33'; // Obtain this from https://cloud.walletconnect.com

// 3. Create Wagmi Configuration
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

const chains = [mainnet, arbitrum] as const;
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

// 4. Create Web3Modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});

// 5. App Component
export default function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
      <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingScreen />} />
        <Route path="/dashboard" element={<Dashboard/>} /> 
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/verify-identity" element={<VerifyIdentityScreen />} />
           <Route path="/Dash" element={<Dashboard />} /> 
          <Route path="/MedicineProvider" element={<Medicineprovider />} />
          <Route path="/HospitalDashboard" element={<HospitalDashboard />} />
          <Route path="/PharmacyDashboard" element={<PharmacyDashboard />} />


        </Routes>
      </div>
    </Router>
      
      </QueryClientProvider>
    </WagmiProvider>
  );
}