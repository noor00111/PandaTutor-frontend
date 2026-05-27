'use client';

import Link from 'next/link';
import { Users,BookOpen,Shield, ArrowRight, TrendingUp} from 'lucide-react';
import {Card,CardContent,CardHeader,CardTitle} from '@/src/components/ui/Card';
import { motion } from 'framer-motion';


export default function Overview({ stats }: {  stats: any}) {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}> 

              <Card className="bg-white/80 backdrop-blur-md border-slate-100 shadow-xl shadow-slate-200/40 rounded-3xl">
                <CardHeader className="border-b border-slate-100/50">
                  <CardTitle className="text-xl font-black text-slate-900 p-6">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link href="/admin/users">
                      <div className="group p-6 bg-linear-to-br from-slate-50 to-slate-100 rounded-3xl border border-slate-200 hover:border-brand-300 hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-brand-100 rounded-2xl flex items-center justify-center group-hover:bg-brand-200 transition-colors">
                            <Users className="w-6 h-6 text-brand-600" />
                          </div>
                          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2">Manage Users</h3>
                        <p className="text-slate-600 text-sm">View and manage all platform users</p>
                      </div>
                    </Link>

                    <Link href="/admin/bookings">
                      <div className="group p-6 bg-linear-to-br from-slate-50 to-slate-100 rounded-3xl border border-slate-200 hover:border-brand-300 hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                            <BookOpen className="w-6 h-6 text-emerald-600" />
                          </div>
                          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2">Monitor Bookings</h3>
                        <p className="text-slate-600 text-sm">Track all tutoring sessions</p>
                      </div>
                    </Link>

                    <Link href="/admin/categories">
                      <div className="group p-6 bg-linear-to-br from-slate-50 to-slate-100 rounded-3xl border border-slate-200 hover:border-brand-300 hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                            <Shield className="w-6 h-6 text-purple-600" />
                          </div>
                          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2">Manage Categories</h3>
                        <p className="text-slate-600 text-sm">Organize subject categories</p>
                      </div>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}>
                <Card className="bg-white/80 backdrop-blur-md border-slate-100 shadow-xl shadow-slate-200/40 rounded-3xl">
                  <CardHeader className="border-b border-slate-100/50">
                    <CardTitle className="text-xl font-black text-slate-900 px-8 pt-8">User Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-blue-50 rounded-2xl">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                            <Users className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">Students</p>
                            <p className="text-slate-600 text-sm">Active learners</p>
                          </div>
                        </div>
                        <span className="text-2xl font-black text-blue-600">{stats?.students || 0}</span>
                      </div>

                      <div className="flex justify-between items-center p-4 bg-purple-50 rounded-2xl">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                            <TrendingUp className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">Tutors</p>
                            <p className="text-slate-600 text-sm">Expert instructors</p>
                          </div>
                        </div>
                        <span className="text-2xl font-black text-purple-600">{stats?.tutors || 0}</span>
                      </div>

                      <div className="flex justify-between items-center p-4 bg-red-50 rounded-2xl">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                            <Shield className="w-5 h-5 text-red-600" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">Banned Users</p>
                            <p className="text-slate-600 text-sm">Suspended accounts</p>
                          </div>
                        </div>
                        <span className="text-2xl font-black text-red-600">{stats?.bannedUsers || 0}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}>
                  
                <Card className="bg-white/80 backdrop-blur-md border-slate-100 shadow-xl shadow-slate-200/40 rounded-3xl">
                  <CardHeader className="border-b border-slate-100/50">
                    <CardTitle className="text-xl font-black text-slate-900 px-8 pt-8">Booking Status</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-2xl">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mr-4">
                            <BookOpen className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">Confirmed</p>
                            <p className="text-slate-600 text-sm">Upcoming sessions</p>
                          </div>
                        </div>
                        <span className="text-2xl font-black text-emerald-600">{stats?.confirmedBookings || 0}</span>
                      </div>

                      <div className="flex justify-between items-center p-4 bg-blue-50 rounded-2xl">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">Completed</p>
                            <p className="text-slate-600 text-sm">Finished sessions</p>
                          </div>
                        </div>
                        <span className="text-2xl font-black text-blue-600">{stats?.completedBookings || 0}</span>
                      </div>

                      <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center mr-4">
                            <BookOpen className="w-5 h-5 text-slate-600" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">Total Bookings</p>
                            <p className="text-slate-600 text-sm">All time</p>
                          </div>
                        </div>
                        <span className="text-2xl font-black text-slate-900">{stats?.totalBookings || 0}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
      </div>
  );
}


