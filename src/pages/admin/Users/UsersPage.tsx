import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Badge } from '@/components/ui/Badge/Badge';
import { formatDate } from '@/utils/formatDate';

interface Member {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  avatar: string;
  registeredAt: string;
  bookingsCount: number;
}

const INITIAL_MEMBERS: Member[] = [
  {
    id: 'u-1',
    name: 'Alex Mercer',
    email: 'alex.mercer@cinematique.com',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
    registeredAt: '2025-01-15',
    bookingsCount: 24,
  },
  {
    id: 'u-2',
    name: 'Sarah Connor',
    email: 'sarah.connor@cyberdyne.io',
    role: 'USER',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    registeredAt: '2025-03-20',
    bookingsCount: 8,
  },
  {
    id: 'u-3',
    name: 'Bruce Wayne',
    email: 'bruce@wayne-enterprises.com',
    role: 'USER',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    registeredAt: '2025-04-10',
    bookingsCount: 42,
  },
  {
    id: 'u-4',
    name: 'Elena Rostova',
    email: 'elena.rostova@cinema.net',
    role: 'USER',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
    registeredAt: '2025-06-02',
    bookingsCount: 5,
  },
];

export const UsersPage: React.FC = () => {
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [search, setSearch] = useState('');

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
  );

  const toggleRole = (id: string) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, role: m.role === 'ADMIN' ? 'USER' : 'ADMIN' } : m
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-wide">
            User Accounts & Roles
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Manage customer accounts, system administrators, and booking counts
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="p-4 rounded-2xl bg-[#141417] border border-white/10 flex items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1c1c20] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-[#E50914]"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-2xl bg-[#141417] border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-[#18181c] text-gray-400 uppercase text-[10px] tracking-wider">
                <th className="py-3.5 px-4 font-semibold">User</th>
                <th className="py-3.5 px-4 font-semibold">Role</th>
                <th className="py-3.5 px-4 font-semibold">Bookings</th>
                <th className="py-3.5 px-4 font-semibold">Registered</th>
                <th className="py-3.5 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-8 h-8 rounded-full object-cover border border-white/10"
                      />
                      <div>
                        <h4 className="font-bold text-white text-sm">{member.name}</h4>
                        <p className="text-[11px] text-gray-400">{member.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <Badge
                      variant={member.role === 'ADMIN' ? 'primary' : 'secondary'}
                      size="sm"
                    >
                      {member.role}
                    </Badge>
                  </td>

                  <td className="py-3 px-4 font-semibold text-white">
                    {member.bookingsCount} tickets
                  </td>

                  <td className="py-3 px-4 text-gray-400">
                    {formatDate(member.registeredAt)}
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => toggleRole(member.id)}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
                    >
                      Toggle to {member.role === 'ADMIN' ? 'User' : 'Admin'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
