'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

export default function HomePage() {
    const [settings, setSettings] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            // Fetch global configurations and content
            const { data: siteData } = await supabase
                .from('site_settings')
                .select('*')
                .eq('id', 1)
                .single();
            
            if (siteData) setSettings(siteData);

            // Fetch structural services categories
            const { data: categoryData } = await supabase
                .from('services_categories')
                .select('*');
            
            if (categoryData) setCategories(categoryData);
            
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) return <div style={{ textAlign: 'center', marginTop: '100px', fontWeight: '600' }}>Loading platform layout...</div>;

    return (
        <div style={{ fontFamily: 'sans-serif', color: '#1e2a2f', backgroundColor: '#fff', margin: 0, padding: 0 }}>
            
            {/* Hero Section & Core Services Categories */}
            <section style={{ padding: '60px 20px', textAlign: 'center', background: 'linear-gradient(135deg, #fcfaf7 0%, #e1d5c6 100%)' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '15px' }}>BELG SERVICES</h1>
                <p style={{ fontSize: '1.1rem', color: '#7a6a58', maxWidth: '600px', margin: '0 auto 40px auto' }}>
                    Your premium gateway to book top-tier certified logistics, maintenance, and household solutions.
                </p>

                {/* Dynamic Services Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', maxWidth: '1000px', margin: '0 auto' }}>
                    {categories.map((category) => (
                        <div key={category.id} style={{ background: '#fff', padding: '30px 20px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.04)', textAlign: 'center', border: '1px solid #f1f3f4' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{category.icon}</div>
                            <h3 style={{ fontSize: '1.1rem', margin: '0 0 10px 0', color: '#1e2a2f' }}>{category.name_en}</h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* About Us Content Block (Dynamically Fetched) */}
            <section style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '20px', color: '#0b5b2f' }}>About Our Platform</h2>
                <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: '#5f6368' }}>
                    {settings?.about_us_content}
                </p>
            </section>

            {/* Contact Us & Application Downloads */}
            <section style={{ padding: '50px 20px', background: '#1e2a2f', color: '#fff', textAlign: 'center' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    
                    <div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#c49a6c' }}>Connect With Us</h3>
                        <p style={{ margin: '5px 0' }}>Email: {settings?.contact_email}</p>
                        <p style={{ margin: '5px 0' }}>Phone: {settings?.contact_phone}</p>
                        <p style={{ margin: '5px 0' }}>Office: {settings?.office_address}</p>
                    </div>

                    {/* App Stores Distribution Badges Links */}
                    <div style={{ borderTop: '1px solid #2d3d45', paddingTop: '30px' }}>
                        <h4 style={{ marginBottom: '15px', color: '#e1d5c6' }}>Download Official Applications</h4>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                            <a href={settings?.app_store_url} target="_blank" rel="noreferrer" style={{ background: '#000', color: '#fff', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}>
                                App Store
                            </a>
                            <a href={settings?.google_play_url} target="_blank" rel="noreferrer" style={{ background: '#000', color: '#fff', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}>
                                Google Play
                            </a>
                        </div>
                    </div>

                </div>
            </section>

        </div>
    );
}
