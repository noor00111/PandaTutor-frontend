import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Edit3, Save, X } from 'lucide-react';
import { StudentProfileEditFormProps } from '@/src/types';

export function ProfileEditForm({profile, isEditing, formData, isPending, setFormData, onEdit, onSubmit, onCancel}: StudentProfileEditFormProps) {
  return (
    <Card className="p-6 bg-accent-200/20 backdrop-blur-md border-slate-100 shadow-xl shadow-slate-200/40 rounded-3xl">
      <CardHeader className="border-b border-slate-100/50">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-black text-slate-900 flex items-center">
            <Edit3 className="w-5 h-5 mr-3 text-accent-400" />
            Edit Profile Information
          </CardTitle>
          {!isEditing && (
            <Button
              onClick={onEdit}
              className="rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold shadow-lg">
              <Edit3 className="w-4 h-4 mr-2" />
              Edit
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-8">
        {isEditing ? (
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-600 uppercase tracking-widest mb-2">
                  Full Name
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="rounded-2xl border-slate-200 focus:ring-brand-500 focus:border-brand-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 uppercase tracking-widest mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="rounded-2xl border-slate-200 focus:ring-brand-500 focus:border-brand-500"
                  required/>
              </div>
            </div>
            <div className="flex justify-end space-x-4 pt-4">
              <Button type="button" variant="outline" onClick={onCancel} className="rounded-full border-slate-200 hover:bg-slate-50 font-bold">
                <X className="w-4 h-4 mr-2" /> Cancel
              </Button>
              <Button type="submit" className="rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold shadow-lg" isLoading={isPending}>
                <Save className="w-4 h-4 mr-2" /> Save Changes
              </Button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
              <p className="text-lg font-semibold text-slate-900">{profile?.name}</p>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
              <p className="text-lg font-semibold text-slate-900">{profile?.email}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
