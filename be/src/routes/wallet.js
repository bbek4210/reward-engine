import express from "express";
import {
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  Keypair,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

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

// POST /api/wallet/redeem - Redeem points for SOL (transfers from treasury to user)
router.post("/redeem", async (req, res) => {
  try {
    const { walletAddress, points, sol } = req.body;

    if (!walletAddress || !points || !sol) {
      return res.status(400).json({
        success: false,
        error: "walletAddress, points, and sol are required",
      });
    }

    // Validate recipient
    let recipientPublicKey;
    try {
      recipientPublicKey = new PublicKey(walletAddress);
    } catch {
      return res
        .status(400)
        .json({ success: false, error: "Invalid wallet address" });
    }

    // Load treasury keypair from environment
    const treasuryKeyEnv = process.env.TREASURY_PRIVATE_KEY;
    if (!treasuryKeyEnv) {
      return res.status(503).json({
        success: false,
        error:
          "Treasury wallet not configured. Set TREASURY_PRIVATE_KEY in .env",
      });
    }

    let treasuryKeypair;
    try {
      // Expects a JSON byte-array string, e.g. [1,2,3,...]
      const keyBytes = JSON.parse(treasuryKeyEnv);
      treasuryKeypair = Keypair.fromSecretKey(Uint8Array.from(keyBytes));
    } catch {
      return res.status(500).json({
        success: false,
        error: "Invalid TREASURY_PRIVATE_KEY format. Use a JSON byte array.",
      });
    }

    const lamports = Math.floor(parseFloat(sol) * LAMPORTS_PER_SOL);

    // Check treasury has enough balance (+ fee buffer)
    const treasuryBalance = await connection.getBalance(
      treasuryKeypair.publicKey,
    );
    if (treasuryBalance < lamports + 10_000) {
      return res.status(503).json({
        success: false,
        error: "Treasury has insufficient SOL balance",
      });
    }

    // Build and send the transfer transaction
    const { blockhash } = await connection.getLatestBlockhash();
    const transaction = new Transaction({
      recentBlockhash: blockhash,
      feePayer: treasuryKeypair.publicKey,
    }).add(
      SystemProgram.transfer({
        fromPubkey: treasuryKeypair.publicKey,
        toPubkey: recipientPublicKey,
        lamports,
      }),
    );

    const signature = await sendAndConfirmTransaction(connection, transaction, [
      treasuryKeypair,
    ]);

    const network =
      process.env.SOLANA_NETWORK === "mainnet-beta" ? "" : "?cluster=devnet";

    res.json({
      success: true,
      message: `Transferred ${sol} SOL to ${walletAddress}`,
      data: {
        signature,
        solAmount: parseFloat(sol),
        pointsRedeemed: parseInt(points),
        txUrl: `https://explorer.solana.com/tx/${signature}${network}`,
      },
    });
  } catch (error) {
    console.error("Redemption transfer error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to process SOL transfer: " + error.message,
    });
  }
});

export default router;
