import { useState } from 'react';
import { useRouter } from 'next/router';
export default function AdminLogin() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  async function handleLogin(e) {
    e.preventDefault();
    const res = await fetch('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) });
    const data = await res.json();
    if (data.ok) router.push('/admin'); else setError(data.error || 'Login failed');
  }
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <form onSubmit={handleLogin} className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-96">
        <h2 className="text-2xl text-center mb-6 text-white font-bold">CyberIntel Admin Login</h2>
        <input type="text" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} className="w-full p-3 mb-4 bg-gray-800 text-white rounded-lg"/>
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-3 mb-4 bg-gray-800 text-white rounded-lg"/>
        {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
        <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 rounded-lg">Login</button>
      </form>
    </div>
  );
}
