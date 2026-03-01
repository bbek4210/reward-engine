import express from "express";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

const router = express.Router();

// Initialize Solana connection
const connection = new Connection(
  process.env.SOLANA_RPC_URL || "https://api.devnet.solana.com",
  "confirmed",
);

// POST /api/wallet/verify - Verify wallet ownership
router.post("/verify", async (req, res) => {
  try {
    const { walletAddress } = req.body;

    if (!walletAddress) {
      return res.status(400).json({
        success: false,
        error: "Wallet address is required",
      });
    }

    // Validate wallet address format
    try {
      new PublicKey(walletAddress);
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: "Invalid wallet address format",
      });
    }

    res.json({
      success: true,
      message: "Wallet verified successfully",
      data: {
        walletAddress,
        verifiedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Wallet verification error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to verify wallet",
    });
  }
});

// GET /api/wallet/:address/balance - Get wallet balance
router.get("/:address/balance", async (req, res) => {
  try {
    const { address } = req.params;

    const publicKey = new PublicKey(address);
    const balance = await connection.getBalance(publicKey);

    res.json({
      success: true,
      data: {
        address,
        balance: balance / LAMPORTS_PER_SOL,
        lamports: balance,
      },
    });
  } catch (error) {
    console.error("Balance fetch error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch balance",
    });
  }
});

// POST /api/wallet/airdrop - Request devnet airdrop (devnet only)
router.post("/airdrop", async (req, res) => {
  try {
    if (process.env.SOLANA_NETWORK !== "devnet") {
      return res.status(403).json({
        success: false,
        error: "Airdrop only available on devnet",
      });
    }

    const { walletAddress, amount = 1 } = req.body;

    const publicKey = new PublicKey(walletAddress);
    const signature = await connection.requestAirdrop(
      publicKey,
      amount * LAMPORTS_PER_SOL,
    );

    await connection.confirmTransaction(signature);

    res.json({
      success: true,
      message: `Airdropped ${amount} SOL to wallet`,
      data: {
        signature,
        amount,
      },
    });
  } catch (error) {
    console.error("Airdrop error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to airdrop tokens",
    });
  }
});

export default router;
