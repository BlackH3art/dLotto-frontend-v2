import { FC, useContext } from "react";
import { ethers } from 'ethers';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { ToastContainer } from 'react-toastify';

import { Navigation } from "./components/Navigation/Navigation";

import 'react-toastify/dist/ReactToastify.css';
import '@rainbow-me/rainbowkit/styles.css';
import { Main } from "./components/Main/Main";
import TicketModal from "./components/TicketModal/TicketModal";
import { AppContext } from "./context/AppContext";

const ethersProvider = new ethers.providers.InfuraProvider("maticmum");
const { chains, provider } = configureChains(
  
  [chain.polygonMumbai],
  [
    alchemyProvider(ethersProvider),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})


const App: FC = () => {

  const { showTicketModal } = useContext(AppContext);

  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>

          <ToastContainer />

          <Navigation />
          <Main />
          {showTicketModal ? <TicketModal /> : null }

        </RainbowKitProvider>
      </WagmiConfig>
    </>
  )
}

export default App
