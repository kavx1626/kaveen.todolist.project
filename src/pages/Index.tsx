
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Task Dashboard</h1>
          <p className="text-gray-600">Manage your tasks and collaborate with your team</p>
        </div>

        <StatsOverview tasks={tasks} />

        {/* Controls Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[140px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterPriority} onValueChange={setFilterPriority}>
                  <SelectTrigger className="w-[140px]">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={() => {
                setEditingTask(null);
                setShowTaskForm(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              New Task
            </Button>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            <Badge 
              variant={filterStatus === 'all' ? "default" : "secondary"}
              className="cursor-pointer hover:bg-blue-100 transition-colors"
              onClick={() => setFilterStatus('all')}
            >
              All Tasks ({tasks.length})
            </Badge>
            <Badge 
              variant={filterStatus === 'todo' ? "default" : "secondary"}
              className="cursor-pointer hover:bg-yellow-100 transition-colors"
              onClick={() => setFilterStatus('todo')}
            >
              <Clock className="h-3 w-3 mr-1" />
              To Do ({tasks.filter(t => t.status === 'todo').length})
            </Badge>
            <Badge 
              variant={filterStatus === 'in-progress' ? "default" : "secondary"}
              className="cursor-pointer hover:bg-orange-100 transition-colors"
              onClick={() => setFilterStatus('in-progress')}
            >
              <AlertCircle className="h-3 w-3 mr-1" />
              In Progress ({tasks.filter(t => t.status === 'in-progress').length})
            </Badge>
            <Badge 
              variant={filterStatus === 'completed' ? "default" : "secondary"}
              className="cursor-pointer hover:bg-green-100 transition-colors"
              onClick={() => setFilterStatus('completed')}
            >
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Completed ({tasks.filter(t => t.status === 'completed').length})
            </Badge>
          </div>
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No tasks found</h3>
            <p className="text-gray-500">
              {searchTerm || filterStatus !== 'all' || filterPriority !== 'all'
                ? 'Try adjusting your filters to see more tasks.'
                : 'Create your first task to get started!'}
            </p>
          </div>
        )}

        {/* Task Form Modal */}
        {showTaskForm && (
          <TaskForm
            task={editingTask}
            onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
            onCancel={() => {
              setShowTaskForm(false);
              setEditingTask(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
