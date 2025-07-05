
import React, { useState } from 'react';
import { Plus, Filter, Search, Calendar, CheckCircle2, Clock, AlertCircle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import TaskCard from '@/components/TaskCard';
import TaskForm from '@/components/TaskForm';
import Header from '@/components/Header';
import StatsOverview from '@/components/StatsOverview';

const Index = () => {
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Complete project documentation',
      description: 'Write comprehensive documentation for the new feature',
      priority: 'high',
      status: 'in-progress',
      dueDate: '2024-07-08',
      sharedWith: ['john@example.com'],
      createdAt: '2024-07-05',
    },
    {
      id: '2',
      title: 'Review pull requests',
      description: 'Review and approve pending pull requests from team members',
      priority: 'medium',
      status: 'todo',
      dueDate: '2024-07-06',
      sharedWith: [],
      createdAt: '2024-07-04',
    },
    {
      id: '3',
      title: 'Update database schema',
      description: 'Implement new database schema changes for user management',
      priority: 'high',
      status: 'todo',
      dueDate: '2024-07-07',
      sharedWith: ['admin@example.com'],
      createdAt: '2024-07-03',
    },
  ]);

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  const handleCreateTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    setTasks([newTask, ...tasks]);
    setShowTaskForm(false);
  };

  const handleUpdateTask = (taskData) => {
    setTasks(tasks.map(task => 
      task.id === editingTask.id ? { ...taskData, id: editingTask.id } : task
    ));
    setEditingTask(null);
    setShowTaskForm(false);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-yellow-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        <div className="animate-fade-in">
          <Header />
        </div>
        
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="mb-8 text-center animate-fade-in delay-200">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 animate-pulse">
              Task Dashboard
            </h1>
            <p className="text-gray-600 text-lg">Manage your tasks with style and collaborate seamlessly</p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full animate-pulse"></div>
          </div>

          <div className="animate-fade-in delay-300">
            <StatsOverview tasks={tasks} />
          </div>

          {/* Controls Section with Glass Effect */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-6 mb-8 border border-white/20 animate-fade-in delay-400 hover:shadow-3xl transition-all duration-500">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md group">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 group-focus-within:text-blue-500 transition-colors duration-300" />
                  <Input
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-0 bg-white/50 backdrop-blur-sm focus:bg-white/80 transition-all duration-300 focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
                
                <div className="flex gap-2">
                  <div className="group">
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-[140px] border-0 bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-300">
                        <Filter className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/90 backdrop-blur-lg">
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="todo">To Do</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="group">
                    <Select value={filterPriority} onValueChange={setFilterPriority}>
                      <SelectTrigger className="w-[140px] border-0 bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-300">
                        <AlertCircle className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/90 backdrop-blur-lg">
                        <SelectItem value="all">All Priority</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => {
                  setEditingTask(null);
                  setShowTaskForm(true);
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 transform"
              >
                <Plus className="h-4 w-4 animate-pulse" />
                New Task
              </Button>
            </div>

            {/* Quick Filters with Hover Animations */}
            <div className="flex flex-wrap gap-2">
              <Badge 
                variant={filterStatus === 'all' ? "default" : "secondary"}
                className="cursor-pointer hover:scale-110 transition-all duration-300 hover:shadow-lg animate-bounce-subtle"
                onClick={() => setFilterStatus('all')}
              >
                All Tasks ({tasks.length})
              </Badge>
              <Badge 
                variant={filterStatus === 'todo' ? "default" : "secondary"}
                className="cursor-pointer hover:scale-110 transition-all duration-300 hover:shadow-lg animate-bounce-subtle delay-100"
                onClick={() => setFilterStatus('todo')}
              >
                <Clock className="h-3 w-3 mr-1 animate-spin-slow" />
                To Do ({tasks.filter(t => t.status === 'todo').length})
              </Badge>
              <Badge 
                variant={filterStatus === 'in-progress' ? "default" : "secondary"}
                className="cursor-pointer hover:scale-110 transition-all duration-300 hover:shadow-lg animate-bounce-subtle delay-200"
                onClick={() => setFilterStatus('in-progress')}
              >
                <AlertCircle className="h-3 w-3 mr-1 animate-pulse" />
                In Progress ({tasks.filter(t => t.status === 'in-progress').length})
              </Badge>
              <Badge 
                variant={filterStatus === 'completed' ? "default" : "secondary"}
                className="cursor-pointer hover:scale-110 transition-all duration-300 hover:shadow-lg animate-bounce-subtle delay-300"
                onClick={() => setFilterStatus('completed')}
              >
                <CheckCircle2 className="h-3 w-3 mr-1 animate-spin-slow" />
                Completed ({tasks.filter(t => t.status === 'completed').length})
              </Badge>
            </div>
          </div>

          {/* Tasks Grid with Staggered Animation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredTasks.map((task, index) => (
              <div 
                key={task.id} 
                className="animate-fade-in hover:scale-105 transition-all duration-300"
                style={{
                  animationDelay: `${500 + index * 100}ms`
                }}
              >
                <TaskCard
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                />
              </div>
            ))}
          </div>

          {/* Empty State with Creative Animation */}
          {filteredTasks.length === 0 && (
            <div className="text-center py-12 animate-fade-in delay-600">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center animate-bounce-slow">
                <CheckCircle2 className="h-16 w-16 text-blue-400 animate-pulse" />
              </div>
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent mb-3">
                No tasks found
              </h3>
              <p className="text-gray-500 text-lg">
                {searchTerm || filterStatus !== 'all' || filterPriority !== 'all'
                  ? 'Try adjusting your filters to see more tasks.'
                  : 'Create your first task to get started!'}
              </p>
              <div className="mt-6">
                <Button
                  onClick={() => {
                    setEditingTask(null);
                    setShowTaskForm(true);
                  }}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Create Your First Task
                </Button>
              </div>
            </div>
          )}

          {/* Task Form Modal with Animation */}
          {showTaskForm && (
            <div className="animate-fade-in">
              <TaskForm
                task={editingTask}
                onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                onCancel={() => {
                  setShowTaskForm(false);
                  setEditingTask(null);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
