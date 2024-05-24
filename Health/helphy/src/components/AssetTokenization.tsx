import React from 'react';
import { Button } from 'react-bootstrap';

interface AssetTokenizationProps {
  mintTokens: () => Promise<void>; // Define the type of mintTokens function
}

const AssetTokenization: React.FC<AssetTokenizationProps> = ({ mintTokens }) => {
  const handleMintTokens = async () => {
    try {
      await mintTokens();
      alert('Tokens minted successfully');
    } catch (error) {
      console.error('Error minting tokens:', error);
      alert('Error minting tokens');
    }
  };

  return (
    <div className="asset-tokenization-container">
      <h2 className="asset-tokenization-title">Asset Tokenization Interface</h2>
      <p className="asset-tokenization-description">
        Asset tokenization allows you to represent ownership of assets as digital tokens on a blockchain.
        With this interface, you can mint tokens to represent ownership of various assets.
      </p>
      <Button variant="primary" onClick={handleMintTokens} className="mint-tokens-button">
        Mint Tokens
      </Button>
    </div>
  );
};

export default AssetTokenization;
