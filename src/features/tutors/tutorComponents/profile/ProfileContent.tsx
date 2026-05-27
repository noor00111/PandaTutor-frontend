import { TutorProfileContentProps } from '@/src/types';
import { motion, AnimatePresence } from 'framer-motion';
import {Edit3, Save, X, DollarSign, BookOpen, CheckCircle2} from 'lucide-react';



export function ProfileContent(
  {isEditing, setIsEditing, tutorProfile, formData, setFormData, categories, selectedSubjects, toggleSubject, handleSubmit, handleCancel, isPending}: TutorProfileContentProps) {
  
    return (
    <div className="rounded-3xl overflow-hidden shadow-md max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center">
            <Edit3
              className="w-5 h-5 text-accent-400"/>
          </div>

          <h3 className="text-xl font-black">
            {isEditing ? 'Editing Profile' : 'Profile Details'}
          </h3>
        </div>

        {!isEditing && (
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-black shadow-md transition-all">
            <Edit3 className="w-4 h-4 text-accent-400" />
            Edit Profile
          </motion.button>
        )}
      </div>

      <div className="p-8">
        <AnimatePresence mode="wait">
          {isEditing ? (
            <motion.form
              key="edit"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="space-y-8">
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.2em] mb-3">
                  Bio
                </label>

                <textarea
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bio: e.target.value,
                    })
                  }
                  rows={5}
                  className="w-full border border-accent-400 rounded-2xl p-5 text-base resize-none outline-none"/>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.2em] mb-3">
                  Hourly Rate
                </label>

                <div className="relative">
                  <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-accent-500"/>
                  <input
                    type="number"
                    value={formData.hourlyRate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hourlyRate:
                          parseFloat(e.target.value) || 0,
                      })}
                    className="w-full pl-11 pr-5 py-4 rounded-2xl outline-none border border-accent-400"/>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.2em] mb-4">
                  Subjects
                </label>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 border border-accent-300 rounded-2xl p-4">
                  {categories?.map((cat) => {
                    const selected =
                      selectedSubjects.includes(cat.id);

                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => toggleSubject(cat.id)}
                        className="flex items-center gap-3 p-4 rounded-2xl text-left">
                        {selected ? (
                          <CheckCircle2 className="w-4 h-4 shrink-0 text-accent-500" />
                        ) : (
                          <BookOpen className="w-4 h-4 shrink-0" />
                        )}
                      <span className="font-bold text-sm">{cat.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button type="button"
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-7 py-3 rounded-full font-black text-sm border-2">
                  <X className="w-4 h-4" />
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isPending}
                  className="flex items-center gap-2 px-7 py-3 rounded-full font-black text-sm">
                  <Save className="w-4 h-4" />
                  {isPending ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3">
                  Bio
                </p>

                <p className="text-base leading-relaxed">
                  {tutorProfile?.bio || 'No bio added yet'}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3">
                  Hourly Rate
                </p>

                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-2text-3xl font-semibold">
                    <DollarSign className='text-accent-400'></DollarSign>
                    {tutorProfile?.hourlyRate ?? 0}
                  </span>

                  <span className="text-xs font-medium" >
                    /hr
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3">
                  Subjects
                </p>

                <div className="flex flex-wrap gap-3">
                  {tutorProfile?.subjects?.map((subject) => (
                    <span key={subject.id} className="flex items-center gap-2 px-2 py-2 rounded-full text-sm font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent-400" />
                      {subject.name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}