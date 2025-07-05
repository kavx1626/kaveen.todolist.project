
import React from 'react';
import { Calendar, Users, Edit, Trash2, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'todo': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in-progress': return <AlertTriangle className="h-4 w-4" />;
      case 'todo': return <Clock className="h-4 w-4" />;
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
    <Card className={`border-l-4 hover:shadow-lg transition-all duration-200 ${
      isOverdue(task.dueDate, task.status) ? 'border-l-red-500 bg-red-50' : 'border-l-blue-500'
    }`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{task.title}</h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-3">{task.description}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge className={`${getPriorityColor(task.priority)} capitalize`}>
            {task.priority}
          </Badge>
          <Badge className={`${getStatusColor(task.status)} capitalize flex items-center gap-1`}>
            {getStatusIcon(task.status)}
            {task.status.replace('-', ' ')}
          </Badge>
          {isOverdue(task.dueDate, task.status) && (
            <Badge className="bg-red-100 text-red-800 border-red-200">
              Overdue
            </Badge>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Due: {formatDate(task.dueDate)}</span>
          </div>

          {task.sharedWith && task.sharedWith.length > 0 && (
            <div className="flex items-center text-sm text-gray-600">
              <Users className="h-4 w-4 mr-2" />
              <span className="mr-2">Shared with:</span>
              <div className="flex -space-x-1">
                {task.sharedWith.slice(0, 3).map((email, index) => (
                  <Avatar key={index} className="h-6 w-6 border-2 border-white">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`} />
                    <AvatarFallback className="text-xs">
                      {email.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {task.sharedWith.length > 3 && (
                  <div className="h-6 w-6 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-xs text-gray-600">+{task.sharedWith.length - 3}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="px-6 py-4 bg-gray-50 flex justify-between items-center">
        <span className="text-xs text-gray-500">
          Created {formatDate(task.createdAt)}
        </span>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onEdit(task)}
            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onDelete(task.id)}
            className="text-red-600 hover:text-red-800 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
