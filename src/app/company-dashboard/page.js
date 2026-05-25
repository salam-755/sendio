'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../utils/supabase';

export default function CompanyDashboard() {
    const router = useRouter();
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const fetchCompanyData = async () => {
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
                if (profile.user_type !== 'company') {
                    router.push('/login'); // Protection layer
                    return;
                }
                setCompany(profile);
            }
            setLoading(false);
        };
        fetchCompanyData();
    }, [router]);

    const toggleSponsorship = async () => {
        setUpdating(true);
        const newStatus = !company.show_in_marquee;

        const { error } = await supabase
            .from('profiles')
            .update({ show_in_marquee: newStatus })
            .eq('id', company.id);

        if (!error) {
            setCompany({ ...company, show_in_marquee: newStatus });
        }
        setUpdating(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    if (loading) return <div style={{ textAlign: 'center', marginTop: '100px', fontWeight: '600' }}>Loading corporate portal...</div>;

    return (
        <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
            
            {/* Header Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid #f1f3f4', paddingBottom: '20px' }}>
                <div>
                    <span style={{ fontSize: '0.85rem', color: '#0b5b2f', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Corporate Dashboard</span>
                    <h2 style={{ margin: '5px 0 0 0', color: '#1e2a2f', fontSize: '1.8rem', fontWeight: '800' }}>Welcome, {company?.full_name} 🏢</h2>
                </div>
                <button onClick={handleLogout} style={{ padding: '10px 20px', background: '#fce8e6', color: '#c5221f', border: 'none', borderRadius: '30px', fontWeight: '600', cursor: 'pointer' }}>
                    Sign Out
                </button>
            </div>

            {/* Quick Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                <div style={{ background: '#fcfaf7', padding: '24px', borderRadius: '12px', border: '1px solid #e1d5c6' }}>
                    <h5 style={{ margin: '0 0 10px 0', color: '#7a6a58', textTransform: 'uppercase', fontSize: '0.8rem' }}>Account Status</h5>
                    <p style={{ margin: 0, fontSize: '1.4rem', fontWeight: '700', color: '#0b5b2f' }}>Verified Premium</p>
                </div>
                <div style={{ background: '#fcfaf7', padding: '24px', borderRadius: '12px', border: '1px solid #e1d5c6' }}>
                    <h5 style={{ margin: '0 0 10px 0', color: '#7a6a58', textTransform: 'uppercase', fontSize: '0.8rem' }}>Active Job Leads</h5>
                    <p style={{ margin: 0, fontSize: '1.4rem', fontWeight: '700', color: '#1e2a2f' }}>0 Active</p>
                </div>
            </div>

            {/* Premium Advertisement Tool */}
            <div style={{ background: '#fff', border: '2px dashed #c49a6c', borderRadius: '16px', padding: '30px', textAlign: 'center', boxShadow: '0 4px 25px rgba(196,154,108,0.1)' }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#1e2a2f', fontWeight: '800' }}>Sponsored Visibility Boost</h3>
                <p style={{ color: '#5f6368', maxWidth: '600px', margin: '0 auto 24px auto', fontSize: '0.95rem', lineHeight: '1.5' }}>
                    Activating sponsorship places your company card at the absolute top of the advanced search engine with a premium golden badge highlight to double your customer calls.
                </p>

                <div style={{ marginBottom: '20px' }}>
                    <span style={{ fontSize: '0.9rem', padding: '6px 14px', borderRadius: '20px', fontWeight: '700', background: company?.show_in_marquee ? '#e6f4ea' : '#f1f3f4', color: company?.show_in_marquee ? '#137333' : '#5f6368' }}>
                        Current Status: {company?.show_in_marquee ? '🌟 Active on Top Marquee' : '⏸️ Standard Placement'}
                    </span>
                </div>

                <button 
                    onClick={toggleSponsorship}
                    disabled={updating}
                    style={{ padding: '14px 35px', background: company?.show_in_marquee ? '#1e2a2f' : '#c49a6c', color: '#fff', border: 'none', borderRadius: '40px', fontWeight: '600', cursor: 'pointer', fontSize: '1rem', transition: '0.3s' }}
                >
                    {updating ? 'Processing Custom Update...' : company?.show_in_marquee ? 'Pause Sponsored Premium' : 'Activate Premium Marquee Now →'}
                </button>
            </div>

        </div>
    );
      }
