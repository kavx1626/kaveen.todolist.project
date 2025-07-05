import React from 'react';
import { CheckCircle2, Clock, AlertCircle, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const StatsOverview = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const todoTasks = tasks.filter(task => task.status === 'todo').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    {
      title: 'Total Tasks',
      value: totalTasks,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-100 to-cyan-100',
      shadowColor: 'shadow-blue-200',
      hoverColor: 'hover:from-blue-200 hover:to-cyan-200',
    },
    {
      title: 'Completed',
      value: completedTasks,
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-gradient-to-br from-green-100 to-emerald-100',
      shadowColor: 'shadow-green-200',
      hoverColor: 'hover:from-green-200 hover:to-emerald-200',
    },
    {
      title: 'In Progress',
      value: inProgressTasks,
      icon: AlertCircle,
      color: 'text-orange-600',
      bgColor: 'bg-gradient-to-br from-orange-100 to-amber-100',
      shadowColor: 'shadow-orange-200',
      hoverColor: 'hover:from-orange-200 hover:to-amber-200',
    },
    {
      title: 'To Do',
      value: todoTasks,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-gradient-to-br from-yellow-100 to-orange-100',
      shadowColor: 'shadow-yellow-200',
      hoverColor: 'hover:from-yellow-200 hover:to-orange-200',
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card 
            key={index} 
            className={`group relative overflow-hidden border-0 bg-white/70 backdrop-blur-lg ${stat.shadowColor} shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 animate-fade-in cursor-pointer`}
            style={{
              animationDelay: `${index * 150}ms`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="absolute top-0 left-0 w-2 h-2 bg-white/30 rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>
            <div className="absolute bottom-0 right-0 w-1 h-1 bg-white/40 rounded-full animate-ping delay-300 opacity-0 group-hover:opacity-100"></div>
            
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-2 group-hover:text-gray-700 transition-colors duration-300">
                    {stat.title}
                  </p>
                  <div className="relative">
                    <p className="text-4xl font-bold text-gray-900 group-hover:scale-110 transition-transform duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-700 group-hover:to-gray-900 group-hover:bg-clip-text">
                      {stat.value}
                    </p>
                    <div className="absolute inset-0 text-4xl font-bold text-gray-900 opacity-20 transform translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300 pointer-events-none">
                      {stat.value}
                    </div>
                  </div>
                  {stat.title === 'Total Tasks' && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out group-hover:animate-pulse"
                          style={{ 
                            width: `${completionRate}%`,
                            transform: 'translateX(-100%)',
                            animation: 'slideIn 1.5s ease-out forwards'
                          }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                        {completionRate}%
                      </p>
                    </div>
                  )}
                </div>
                <div className={`w-16 h-16 ${stat.bgColor} ${stat.hoverColor} rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-lg group-hover:shadow-xl`}>
                  <stat.icon className={`h-8 w-8 ${stat.color} group-hover:scale-125 transition-all duration-300`} />
                  <div className={`absolute w-16 h-16 ${stat.bgColor} rounded-2xl opacity-0 group-hover:opacity-30 animate-ping transition-opacity duration-300`}></div>
                </div>
              </div>
            </CardContent>

            <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-lg transition-all duration-300"></div>
          </Card>
        ))}
      </div>
      
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default StatsOverview;
