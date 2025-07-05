
import React from 'react';
import { Calendar, Users, Edit, Trash2, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-200 shadow-red-100';
      case 'medium': return 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-yellow-200 shadow-yellow-100';
      case 'low': return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200 shadow-green-100';
      default: return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200 shadow-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200 shadow-green-100';
      case 'in-progress': return 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border-orange-200 shadow-orange-100';
      case 'todo': return 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200 shadow-blue-100';
      default: return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200 shadow-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 animate-pulse" />;
      case 'in-progress': return <AlertTriangle className="h-4 w-4 animate-bounce" />;
      case 'todo': return <Clock className="h-4 w-4 animate-spin-slow" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = (dueDate, status) => {
    const today = new Date();
    const due = new Date(dueDate);
    return status !== 'completed' && due < today;
  };

  return (
    <Card className={`group relative overflow-hidden border-l-4 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] bg-white/80 backdrop-blur-sm ${
      isOverdue(task.dueDate, task.status) 
        ? 'border-l-red-500 bg-gradient-to-br from-red-50/90 to-pink-50/90 animate-pulse-subtle' 
        : 'border-l-blue-500 hover:border-l-purple-500'
    }`}>
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-pink-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Floating Animation Elements */}
      <div className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
      <div className="absolute bottom-2 left-2 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping delay-300"></div>

      <CardContent className="p-6 relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
              {task.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-3 group-hover:text-gray-700 transition-colors duration-300">
              {task.description}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge className={`${getPriorityColor(task.priority)} capitalize shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-110`}>
            {task.priority}
          </Badge>
          <Badge className={`${getStatusColor(task.status)} capitalize flex items-center gap-1 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-110`}>
            {getStatusIcon(task.status)}
            {task.status.replace('-', ' ')}
          </Badge>
          {isOverdue(task.dueDate, task.status) && (
            <Badge className="bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-200 animate-pulse shadow-sm hover:shadow-lg transition-all duration-300">
              Overdue
            </Badge>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
            <Calendar className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
            <span>Due: {formatDate(task.dueDate)}</span>
          </div>

          {task.sharedWith && task.sharedWith.length > 0 && (
            <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
              <Users className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
              <span className="mr-2">Shared with:</span>
              <div className="flex -space-x-1">
                {task.sharedWith.slice(0, 3).map((email, index) => (
                  <Avatar 
                    key={index} 
                    className="h-6 w-6 border-2 border-white hover:scale-125 transition-transform duration-300 hover:z-10 relative"
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`} />
                    <AvatarFallback className="text-xs">
                      {email.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {task.sharedWith.length > 3 && (
                  <div className="h-6 w-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full border-2 border-white flex items-center justify-center hover:scale-125 transition-transform duration-300">
                    <span className="text-xs text-gray-600">+{task.sharedWith.length - 3}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="px-6 py-4 bg-gray-50/80 backdrop-blur-sm flex justify-between items-center group-hover:bg-white/90 transition-all duration-300 relative z-10">
        <span className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
          Created {formatDate(task.createdAt)}
        </span>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onEdit(task)}
            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 hover:scale-110 transition-all duration-300 group/btn"
          >
            <Edit className="h-4 w-4 group-hover/btn:rotate-12 transition-transform duration-300" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onDelete(task.id)}
            className="text-red-600 hover:text-red-800 hover:bg-red-50 hover:scale-110 transition-all duration-300 group/btn"
          >
            <Trash2 className="h-4 w-4 group-hover/btn:animate-bounce transition-all duration-300" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
