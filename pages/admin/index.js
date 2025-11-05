import Link from 'next/link';
export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-6">CyberIntel Admin Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/users" className="bg-gray-900 p-6 rounded-2xl shadow hover:bg-gray-800 transition">
          <h2 className="text-xl font-semibold">👥 Foydalanuvchilarni boshqarish</h2>
          <p className="text-gray-400 text-sm mt-2">Foydalanuvchi yaratish, parolni yangilash yoki o‘chirish</p>
        </Link>
        <Link href="/" className="bg-gray-900 p-6 rounded-2xl shadow hover:bg-gray-800 transition">
          <h2 className="text-xl font-semibold">🔎 Bosh sahifa</h2>
          <p className="text-gray-400 text-sm mt-2">Platformaga qaytish</p>
        </Link>
      </div>
    </div>
  );
}
