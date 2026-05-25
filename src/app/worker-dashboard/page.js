'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../utils/supabase';

export default function WorkerDashboard() {
    const router = useRouter();
    const [worker, setWorker] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkerData = async () => {
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
                if (profile.user_type !== 'worker') {
                    router.push('/login'); // Protection layer
                    return;
                }
                setWorker(profile);
            }
            setLoading(false);
        };
        fetchWorkerData();
    }, [router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    if (loading) return <div style={{ textAlign: 'center', marginTop: '100px', fontWeight: '600' }}>Loading worker portal...</div>;

    return (
        <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
            
            {/* Header Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid #f1f3f4', paddingBottom: '20px' }}>
                <div>
                    <span style={{ fontSize: '0.85rem', color: '#c49a6c', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Professional Worker Portal</span>
                    <h2 style={{ margin: '5px 0 0 0', color: '#1e2a2f', fontSize: '1.8rem', fontWeight: '800' }}>Welcome, {worker?.full_name} 🛠️</h2>
                </div>
                <button onClick={handleLogout} style={{ padding: '10px 20px', background: '#fce8e6', color: '#c5221f', border: 'none', borderRadius: '30px', fontWeight: '600', cursor: 'pointer' }}>
                    Sign Out
                </button>
            </div>

            {/* Quick Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                <div style={{ background: '#fcfaf7', padding: '24px', borderRadius: '12px', border: '1px solid #e1d5c6' }}>
                    <h5 style={{ margin: '0 0 10px 0', color: '#7a6a58', textTransform: 'uppercase', fontSize: '0.8rem' }}>Profile Trust Score</h5>
                    <p style={{ margin: 0, fontSize: '1.4rem', fontWeight: '700', color: '#0b5b2f' }}>100% Certified Worker</p>
                </div>
                <div style={{ background: '#fcfaf7', padding: '24px', borderRadius: '12px', border: '1px solid #e1d5c6' }}>
                    <h5 style={{ margin: '0 0 10px 0', color: '#7a6a58', textTransform: 'uppercase', fontSize: '0.8rem' }}>Secure Chat Bookings</h5>
                    <p style={{ margin: 0, fontSize: '1.4rem', fontWeight: '700', color: '#1e2a2f' }}>0 Secure Orders</p>
                </div>
            </div>

            {/* Workers Privacy Shield Notification */}
            <div style={{ background: '#f4f6f8', borderRadius: '16px', padding: '30px', border: '1px solid #e1d5c6' }}>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'start' }}>
                    <div style={{ fontSize: '2rem' }}>🛡️</div>
                    <div>
                        <h4 style={{ margin: '0 0 8px 0', color: '#1e2a2f', fontWeight: '750' }}>Privacy Shield Protection Active</h4>
                        <p style={{ color: '#5f6368', margin: 0, fontSize: '0.95rem', lineHeight: '1.6' }}>
                            To protect your phone number from spam and unauthorized calls, your direct contact details are entirely hidden from the public search page. Clients can only contact or hire you through our secure in-app messaging routing system.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
            }
              
