'use client';
import { useState, useEffect } from 'react';
import supabase from '../../utils/supabaseClient';

export default function AdvancedSearchPage() {
    const [providers, setProviders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProviders = async () => {
            setLoading(true);

            let query = supabase
                .from('profiles')
                .select('*')
                .eq('is_profile_complete', true)
                .in('user_type', ['worker', 'company']);

            const { data, error } = await query;

            if (!error && data) {
                const sorted = data.sort(
                    (a, b) => (b.show_in_marquee ? 1 : 0) - (a.show_in_marquee ? 1 : 0)
                );
                setProviders(sorted);
            }

            setLoading(false);
        };

        fetchProviders();
    }, []);

    const filteredProviders = providers.filter((p) => {
        const matchesSearch =
            p.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (p.bio && p.bio.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesRole = roleFilter === 'all' ? true : p.user_type === roleFilter;

        return matchesSearch && matchesRole;
    });

    return (
        <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h2 style={{ fontSize: '2rem', color: '#1e2a2f', fontWeight: '800' }}>Find Premium Verified Services</h2>
                <p style={{ color: '#7a6a58' }}>Connect with certified companies and independent professional workers</p>
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
                <input
                    type="text"
                    placeholder="Search by name, skills, or services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        flex: 2,
                        minWidth: '280px',
                        padding: '14px',
                        borderRadius: '30px',
                        border: '1px solid #e1d5c6',
                        fontSize: '1rem'
                    }}
                />

                <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    style={{
                        flex: 1,
                        minWidth: '160px',
                        padding: '14px',
                        borderRadius: '30px',
                        border: '1px solid #e1d5c6',
                        fontSize: '1rem',
                        background: '#fff'
                    }}
                >
                    <option value="all">All Providers</option>
                    <option value="company">Verified Companies 🏢</option>
                    <option value="worker">Professional Workers 🛠️</option>
                </select>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', margin: '50px 0', fontWeight: '600', color: '#7a6a58' }}>
                    Loading verified providers...
                </div>
            ) : (
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                        gap: '25px'
                    }}
                >
                    {filteredProviders.map((provider) => (
                        <div
                            key={provider.id}
                            style={{
                                background: '#fff',
                                borderRadius: '16px',
                                padding: '24px',
                                boxShadow: provider.show_in_marquee
                                    ? '0 0 0 2px #c49a6c, 0 8px 30px rgba(196,154,108,0.15)'
                                    : '0 4px 20px rgba(0,0,0,0.05)',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            {provider.show_in_marquee && (
                                <span
                                    style={{
                                        position: 'absolute',
                                        top: '15px',
                                        right: '15px',
                                        background: '#c49a6c',
                                        color: '#fff',
                                        padding: '4px 10px',
                                        borderRadius: '20px',
                                        fontSize: '0.75rem',
                                        fontWeight: '700
