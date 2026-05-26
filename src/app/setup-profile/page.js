'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../../utils/supabaseClient';

export default function SetupProfilePage() {
    const router = useRouter();
    const [userType, setUserType] = useState(null);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    const [phoneNumber, setPhoneNumber] = useState('');
    const [bio, setBio] = useState('');
    const [whatsappLink, setWhatsappLink] = useState('');
    const [facebookLink, setFacebookLink] = useState('');
    const [linkedinLink, setLinkedinLink] = useState('');

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/login');
                return;
            }

            setUserId(user.id);

            const { data: profile } = await supabase
                .from('profiles')
                .select('user_type, is_profile_complete')
                .eq('id', user.id)
                .single();

            if (profile) {
                if (profile.is_profile_complete) {
                    router.push(profile.user_type === 'company' ? '/company-dashboard' : '/worker-dashboard');
                    return;
                }
                setUserType(profile.user_type);
            }

            setLoading(false);
        };

        checkUser();
    }, [router]);

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');

        const updateData = {
            phone_number: phoneNumber,
            bio: bio,
            is_profile_complete: true
        };

        if (userType === 'company') {
            updateData.whatsapp_link = whatsappLink ? `https://wa.me/${whatsappLink}` : null;
            updateData.facebook_link = facebookLink || null;
            updateData.linkedin_link = linkedinLink || null;
        }

        const { error } = await supabase
            .from('profiles')
            .update(updateData)
            .eq('id', userId);

        setSaving(false);

        if (error) {
            setMessage(`Error: ${error.message}`);
        } else {
            router.push(userType === 'company' ? '/company-dashboard' : '/worker-dashboard');
        }
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', marginTop: '100px', fontWeight: '600' }}>
                Loading profile configurations...
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '550px', margin: '50px auto', padding: '30px', background: '#fff', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '10px', color: '#1e2a2f', fontWeight: '800' }}>
                Complete Your Profile
            </h2>

            <p style={{ textAlign: 'center', color: '#7a6a58', marginBottom: '30px', fontWeight: '500' }}>
                Setup your professional details as a{' '}
                <span style={{ color: '#0b5b2f', fontWeight: '700', textTransform: 'uppercase' }}>
                    {userType}
                </span>
            </p>

            <form onSubmit={handleSaveProfile}>
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>
                        Contact Phone Number
                    </label>
                    <input
                        type="tel"
                        required
                        placeholder="+964..."
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e1d5c6' }}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>
                        Bio / Overview
                    </label>
                    <textarea
                        required
                        rows="4"
                        placeholder="Tell clients about your skills, experience, or company background..."
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e1d5c6', resize: 'none' }}
                    />
                </div>

                {userType === 'company' && (
                    <div style={{ background: '#fcfaf7', padding: '20px', borderRadius: '12px', marginBottom: '24px', border: '1px dashed #e1d5c6' }}>
                        <h4 style={{ margin: '0 0 14px 0', color: '#0b5b2f' }}>Public Social Media Links</h4>

                        <div style={{ marginBottom: '12px' }}>
                            <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.9rem', fontWeight: '500' }}>
                                WhatsApp Number (Format: 9647XXXXXXXX)
                            </label>
                            <input
                                type="text"
                                placeholder="9647XXXXXXXX"
                                value={whatsappLink}
                                onChange={(e) => setWhatsappLink(e.target.value)}
                                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #e1d5c6' }}
                            />
                        </div>

                        <div style={{ marginBottom: '12px' }}>
                            <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.9rem', fontWeight: '500' }}>
                                Facebook Profile URL
                            </label>
                            <input
                                type="url"
                                placeholder="https://facebook.com/your-page"
                                value={facebookLink}
                                onChange={(e) => setFacebookLink(e.target.value)}
                                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #e1d5c6' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.9rem', fontWeight: '500' }}>
                                LinkedIn Company URL
                            </label>
                            <input
                                type="url"
                                placeholder="https://linkedin.com/company/your-page"
                                value={linkedinLink}
                                onChange={(e) => setLinkedinLink(e.target.value)}
                                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #e1d5c6' }}
                            />
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={saving}
                    style={{ width: '100%', padding: '14px', background: '#c49a6c', color: 'white', border: 'none', borderRadius: '40px', fontWeight: '600', cursor: 'pointer', fontSize: '1rem' }}
                >
                    {saving ? 'Saving Configurations...' : 'Save & Proceed →'}
                </button>
            </form>

            {message && (
                <div
                    style={{
                        marginTop: '20px',
                        padding: '12px',
                        borderRadius: '8px',
                        textAlign: 'center',
                        backgroundColor: '#ffeeee',
                        color: '#d93025',
                        fontWeight: '500'
                    }}
                >
                    {message}
                </div>
            )}
        </div>
    );
                            }
