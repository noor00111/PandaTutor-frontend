import { AccessDeniedProps, Role } from '@/src/types';
import { ShieldX } from 'lucide-react';



const MESSAGES: Record<Role, string> = {
  TUTOR: 'Access Denied — Tutor Role Required',
  ADMIN: 'Access Denied — Admin Role Required',
  STUDENT: 'Access Denied — Student Role Required',
};

export function AccessDenied({ role }: AccessDeniedProps) {
  return (
    <div className="p-20 flex flex-col items-center justify-center text-center text-slate-500 font-medium gap-3">
      <ShieldX className="w-10 h-10 text-slate-400" />
      <p>{MESSAGES[role]}</p>
    </div>
  );
}
