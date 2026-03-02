'use client';

import { useState, useEffect, useCallback } from 'react';
import type { WalletState } from '@/types';

// Phantom wallet types
interface PublicKey {
    toString: () => string;
    toBytes: () => Uint8Array;
}

type PhantomProviderEvents = {
    accountChanged: (publicKey: PublicKey | null) => void;
    disconnect: () => void;
    connect: (publicKey: PublicKey) => void;
};

interface PhantomProvider {
    isPhantom?: boolean;
    connect: (opts?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey: PublicKey }>;
    disconnect: () => Promise<void>;
    on<K extends keyof PhantomProviderEvents>(
        event: K,
        callback: PhantomProviderEvents[K]
    ): void;
    removeAllListeners: () => void;
    publicKey: PublicKey | null;
}

declare global {
    interface Window {
        solana?: PhantomProvider;
    }
}

/**
 * usePhantomWallet Hook
 * 
 * Handles Phantom wallet connection and state management
 * 
 * Features:
 * - Connect/disconnect wallet
 * - Auto-reconnect on page load
 * - Listen to account changes
 * - Get wallet balance (mock for now)
 * 
 * Usage:
 * const { connected, address, connect, disconnect } = usePhantomWallet();
 */
export function usePhantomWallet() {
    const [walletState, setWalletState] = useState<WalletState>({
        connected: false,
        address: null,
        balance: 0,
        provider: null,
    });

    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Check if Phantom is installed
    const getProvider = useCallback((): PhantomProvider | null => {
        if (typeof window !== 'undefined' && window.solana?.isPhantom) {
            return window.solana;
        }
        return null;
    }, []);

    // Connect wallet
    const connect = useCallback(async () => {
        setError(null);
        setIsConnecting(true);

        try {
            const provider = getProvider();

            if (!provider) {
                throw new Error('Phantom wallet not found. Please install it from phantom.app');
            }

            const response = await provider.connect();
            const address = response.publicKey.toString();

            // Mock balance - in production, fetch from Solana blockchain
            const balance = 0;

            setWalletState({
                connected: true,
                address,
                balance,
                provider: 'phantom',
            });

            console.log('Phantom wallet connected:', address);
        } catch (err) {
            console.error('Error connecting wallet:', err);
            setError(err instanceof Error ? err.message : 'Failed to connect wallet');
        } finally {
            setIsConnecting(false);
        }
    }, [getProvider]);

    // Disconnect wallet
    const disconnect = useCallback(async () => {
        try {
            const provider = getProvider();
            if (provider) {
                await provider.disconnect();
            }

            setWalletState({
                connected: false,
                address: null,
                balance: 0,
                provider: null,
            });

            console.log('Phantom wallet disconnected');
        } catch (err) {
            console.error('Error disconnecting wallet:', err);
            setError(err instanceof Error ? err.message : 'Failed to disconnect wallet');
        }
    }, [getProvider]);

    // Auto-connect on page load if previously connected
    useEffect(() => {
        const provider = getProvider();
        if (!provider) return;

        // Attempt silent reconnect — only succeeds if user already approved this site.
        // No popup is shown; rejects silently if not previously approved.
        provider
            .connect({ onlyIfTrusted: true })
            .then((response) => {
                const address = response.publicKey.toString();
                setWalletState({
                    connected: true,
                    address,
                    balance: 0,
                    provider: 'phantom',
                });
            })
            .catch(() => {
                // Not previously approved — stay disconnected, no error shown
            });

        // Listen for account changes
        provider.on('connect', (publicKey: PublicKey) => {
            setWalletState((prev) => ({
                ...prev,
                connected: true,
                address: publicKey.toString(),
            }));
        });

        provider.on('accountChanged', (publicKey: PublicKey | null) => {
            if (publicKey) {
                setWalletState((prev) => ({
                    ...prev,
                    connected: true,
                    address: publicKey.toString(),
                }));
            } else {
                setWalletState({
                    connected: false,
                    address: null,
                    balance: 0,
                    provider: null,
                });
            }
        });

        provider.on('disconnect', () => {
            setWalletState({
                connected: false,
                address: null,
                balance: 0,
                provider: null,
            });
        });

        return () => {
            provider.removeAllListeners();
        };
    }, [getProvider]);

    return {
        ...walletState,
        isConnecting,
        error,
        connect,
        disconnect,
        isPhantomInstalled: !!getProvider(),
    };
}
