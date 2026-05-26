'use client';
import { useState } from 'react';
import supabase from '../../utils/supabaseClient';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [userType, setUserType] = useState('client');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    user_type: userType
                }
            }
        });

        setLoading(false);
        if (error) {
            setMessage(`Error: ${error.message}`);
        } else {
            setMessage('Registration successful! Please check your email for the confirmation link.');
        }
    };

    return (
        <div style={{ maxWidth: '450px', margin: '60px auto', padding: '30px', background: '#fff', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '24px', color: '#1e2a2f', fontWeight: '800' }}>Create Premium Account</h2>
            
            <form onSubmit={handleRegister}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#7a6a58' }}>Join As</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {['client', 'worker', 'company'].map((role) => (
                            <button
                                key={role}
                                type="button"
                                onClick={() => setUserType(role)}
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '2px solid',
                                    borderColor: userType === role ? '#0b5b2f' : '#e1d5c6',
                                    backgroundColor: userType === role ? '#0b5b2f' : '#fff',
                                    color: userType === role ? '#fff' : '#1e2a2f',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    textTransform: 'capitalize',
                                    transition: '0.2s'
                                }}
                            >
                                {role}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Full Name / Company Name</label>
                    <input 
                        type="text" 
                        required 
                        value={fullName} 
                        onChange={(e) => setFullName(e.target.value)}
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e1d5c6' }}
                    />
                </div>

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
                    style={{ width: '100%', padding: '14px', background: '#c49a6c', color: 'white', border: 'none', borderRadius: '40px', fontWeight: '600', cursor: 'pointer', fontSize: '1rem' }}
                >
                    {loading ? 'Registering...' : 'Sign Up →'}
                </button>
            </form>

            {message && (
                <div style={{ marginTop: '20px', padding: '12px', borderRadius: '8px', textAlign: 'center', backgroundColor: message.startsWith('Error') ? '#ffeeee' : '#e6f4ea', color: message.startsWith('Error') ? '#d93025' : '#137333', fontWeight: '500' }}>
                    {message}
                </div>
            )}
        </div>
    );
}
