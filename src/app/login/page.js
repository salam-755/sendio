'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../utils/supabase';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (authError) {
            setLoading(false);
            setMessage(`Error: ${authError.message}`);
            return;
        }

        const userId = authData.user.id;
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('user_type, is_profile_complete')
            .eq('id', userId)
            .single();

        setLoading(false);

        if (profileError || !profile) {
            setMessage('Error fetching user profile configuration.');
            return;
        }

        if (!profile.is_profile_complete) {
            router.push('/setup-profile');
        } else {
            if (profile.user_type === 'company') {
                router.push('/company-dashboard');
            } else if (profile.user_type === 'worker') {
                router.push('/worker-dashboard');
            } else {
                router.push('/client-dashboard');
            }
        }
    };

    return (
        <div style={{ maxWidth: '450px', margin: '80px auto', padding: '30px', background: '#fff', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '24px', color: '#1e2a2f', fontWeight: '800' }}>Welcome Back</h2>
            
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Email Address</label>
                    <input 
                        type="email" 
                        required 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e1d5c6' }}
                    />
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Password</label>
                    <input 
                        type="password" 
                        required 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e1d5c6' }}
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    style={{ width: '100%', padding: '14px', background: '#0b5b2f', color: 'white', border: 'none', borderRadius: '40px', fontWeight: '600', cursor: 'pointer', fontSize: '1rem' }}
                >
                    {loading ? 'Authenticating...' : 'Sign In →'}
                </button>
            </form>

            {message && (
                <div style={{ marginTop: '20px', padding: '12px', borderRadius: '8px', textAlign: 'center', backgroundColor: '#ffeeee', color: '#d93025', fontWeight: '500' }}>
                    {message}
                </div>
            )}
        </div>
    );
  }
  
