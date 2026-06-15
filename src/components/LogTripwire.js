'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function LogTripwire() {
    const pathname = usePathname();

    useEffect(() => {
        const sendLog = async () => {
            try {
                await fetch('/api/logger', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                    url: pathname,
                    method: 'GET',
                    ip: '127.0.0.1', 
                    userAgent: navigator.userAgent,
                }),
                });
            } catch (error) {
            }
        };

        sendLog();
    }, [pathname]);

    return null;
}