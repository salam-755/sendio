'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../utils/supabase';

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
                    router.push('/login'); // Protection layer
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

    if (loading) return <div style={{ textAlign: 'center', marginTop: '100px', fontWeight: '600' }}>Loading your dashboard...</div>;

    return (
        <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
            
            {/* Header Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid #f1f3f4', paddingBottom: '20px' }}>
                <div>
                    <span style={{ fontSize: '0.85rem', color: '#0b5b2f', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Customer Control Panel</span>
                    <h2 style={{ margin: '5px 0 0 0', color: '#1e2a2f', fontSize: '1.8rem', fontWeight: '800' }}>Welcome back, {client?.full_name} ✨</h2>
                </div>
                <button onClick={handleLogout} style={{ padding: '10px 20px', background: '#fce8e6', color: '#c5221f', border: 'none', borderRadius: '30px', fontWeight: '600', cursor: 'pointer' }}>
                    Sign Out
                </button>
            </div>

            {/* Quick Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                <div style={{ background: '#fcfaf7', padding: '24px', borderRadius: '12px', border: '1px solid #e1d5c6' }}>
                    <h5 style={{ margin: '0 0 10px 0', color: '#7a6a58', textTransform: 'uppercase', fontSize: '0.8rem' }}>Total Service Inquiries</h5>
                    <p style={{ margin: 0, fontSize: '1.4rem', fontWeight: '700', color: '#1e2a2f' }}>0 Placed Orders</p>
                </div>
                <div style={{ background: '#fcfaf7', padding: '24px', borderRadius: '12px', border: '1px solid #e1d5c6' }}>
                    <h5 style={{ margin: '0 0 10px 0', color: '#7a6a58', textTransform: 'uppercase', fontSize: '0.8rem' }}>Verified Account Status</h5>
                    <p style={{ margin: 0, fontSize: '1.4rem', fontWeight: '700', color: '#0b5b2f' }}>Active Premium Client</p>
                </div>
            </div>

            {/* CTA Section to Find Services */}
            <div style={{ background: 'linear-gradient(135deg, #fcfaf7 0%, #e1d5c6 100%)', borderRadius: '16px', padding: '40px 30px', textAlign: 'center', border: '1px solid #e1d5c6' }}>
                <h3 style={{ margin: '0 0 12px 0', color: '#1e2a2f', fontWeight: '800', fontSize: '1.4rem' }}>Ready to Book a Professional Service?</h3>
                <p style={{ color: '#5f6368', maxWidth: '550px', margin: '0 auto 26px auto', fontSize: '0.95rem', lineHeight: '1.6' }}>
                    Browse through our verified database of certified companies and independent technical experts to handle your logistics, maintenance, and setup needs instantly.
                </p>
                <button 
                    onClick={() => router.push('/advanced-search')}
                    style={{ padding: '14px 40px', background: '#0b5b2f', color: '#fff', border: 'none', borderRadius: '40px', fontWeight: '600', cursor: 'pointer', fontSize: '1rem', boxShadow: '0 4px 15px rgba(11,91,47,0.2)' }}
                >
                    Open Advanced Search Engine →
                </button>
            </div>

        </div>
    );
                           }
