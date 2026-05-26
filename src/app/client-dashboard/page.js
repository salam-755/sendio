'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../../utils/supabaseClient';

export default function ClientDashboard() {
    const router = useRouter();
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClientData = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push('/login');
                return;
            }

            const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (profile) {
                if (profile.user_type !== 'client') {
                    router.push('/login');
                    return;
                }
                setClient(profile);
            }

            setLoading(false);
        };

        fetchClientData();
    }, [router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', marginTop: '100px', fontWeight: '600' }}>
                Loading your dashboard...
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
            
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid #f1f3f4', paddingBottom: '20px' }}>
                <div>
                    <span style={{ fontSize: '0.85rem', color: '#0b5b2f', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Customer Control Panel
                    </span>
                    <h2 style={{ margin: '5px 0 0 0', color: '#1e2a2f', fontSize: '1.8rem', fontWeight: '800' }}>
                        Welcome back, {client?.full_name} ✨
                    </h2>
                </div>

                <button
