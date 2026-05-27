import { format } from 'date-fns';
import {ShieldAlert, CheckCircle2} from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { AdminUser } from '@/src/types';

interface UsersProps {
  users: AdminUser[];
  isLoading: boolean;
  onToggle: (variables: {id: string; isBanned: boolean;}) => void;
}

export default function UsersTable({users, isLoading, onToggle}: UsersProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-slate-100 text-slate-700 uppercase font-semibold text-xs border-b border-slate-200">
          <tr>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Role</th>
            <th className="px-6 py-4">Joined</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {users.map((u) => (
            <tr
              key={u.id}
              className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4">
                <div className="font-semibold text-slate-900">
                  {u.name}
                </div>

                <div className="text-slate-500 text-xs">
                  {u.email}
                </div>
              </td>

              <td className="px-6 py-4">
                <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                    u.role === 'ADMIN'
                      ? 'bg-purple-100 text-purple-700'
                      : u.role === 'TUTOR'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {u.role}
                </span>
              </td>

              <td className="px-6 py-4 text-slate-600">
                {format(new Date(u.createdAt), 'MMM d, yyyy')}
              </td>

              <td className="px-6 py-4">
                {u.isBanned ? (
                  <span className="flex items-center text-red-600 font-medium text-xs">
                    <ShieldAlert className="w-4 h-4 mr-1" />Banned
                  </span>
                ) : (
                  <span className="flex items-center text-emerald-600 font-medium text-xs">
                    <CheckCircle2 className="w-4 h-4 mr-1" />Active
                  </span>
                )}
              </td>

              <td className="px-6 py-4 text-right">
                {u.role !== 'ADMIN' && (
                  <Button onClick={() => onToggle({id: u.id, isBanned: !u.isBanned})}
                    variant={u.isBanned ? 'outline' : 'ghost'}
                    size="sm"
                    className={
                      u.isBanned ? 'text-emerald-600 border-emerald-200 bg-emerald-50 hover:bg-emerald-100'
                        : 'text-red-600 hover:bg-red-50 hover:text-red-700'}
                    isLoading={isLoading}>
                    {u.isBanned? 'Unban User': 'Ban User'}
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}