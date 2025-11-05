import { useEffect, useState } from 'react';
export default function UsersPanel() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  async function fetchUsers() { const res = await fetch('/api/admin/list-users'); const data = await res.json(); setUsers(data.users || []); }
  async function createUser(e) { e.preventDefault(); const res = await fetch('/api/admin/create-user',{ method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(newUser)}); const data = await res.json(); setMessage(data.message || data.error); fetchUsers(); }
  async function deleteUser(username) { await fetch('/api/admin/delete-user',{ method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ username })}); fetchUsers(); }
  useEffect(()=>{ fetchUsers(); }, []);
  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-2xl font-bold mb-6">👥 Foydalanuvchi boshqaruvi</h1>
      <form onSubmit={createUser} className="mb-6 flex gap-4">
        <input type="text" placeholder="Yangi username" value={newUser.username} onChange={e=>setNewUser({...newUser, username: e.target.value})} className="p-3 rounded-lg bg-gray-800 text-white"/>
        <input type="password" placeholder="Parol" value={newUser.password} onChange={e=>setNewUser({...newUser, password: e.target.value})} className="p-3 rounded-lg bg-gray-800 text-white"/>
        <button type="submit" className="bg-cyan-600 px-4 py-2 rounded-lg">Qo‘shish</button>
      </form>
      {message && <p className="text-cyan-400 mb-4">{message}</p>
      }
      <table className="w-full bg-gray-900 rounded-lg overflow-hidden">
        <thead><tr className="bg-gray-800 text-left"><th className="p-3">Username</th><th className="p-3">Yaratilgan sana</th><th className="p-3">Amal</th></tr></thead>
        <tbody>{users.map((u,i)=>(<tr key={i} className="border-b border-gray-700"><td className="p-3">{u.username}</td><td className="p-3">{u.createdAt?new Date(u.createdAt).toLocaleString():'-'}</td><td className="p-3"><button onClick={()=>deleteUser(u.username)} className="text-red-400 hover:text-red-600">O‘chirish</button></td></tr>))}</tbody>
      </table>
    </div>
  );
}
