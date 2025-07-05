
import React from 'react';
import { Database, Server, Layers, Globe, Smartphone, Monitor, Cpu, Code, Palette, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ArchitectureDiagram = () => {
  const layers = [
    {
      name: 'Frontend Layer',
      icon: Monitor,
      color: 'from-blue-500 to-cyan-500',
      components: [
        { name: 'React Components', tech: 'React 18', icon: Code },
        { name: 'UI Library', tech: 'shadcn/ui', icon: Palette },
        { name: 'Styling', tech: 'Tailwind CSS', icon: Palette },
        { name: 'Icons', tech: 'Lucide React', icon: Zap }
      ]
    },
    {
      name: 'Build & Development',
      icon: Cpu,
      color: 'from-green-500 to-emerald-500',
      components: [
        { name: 'Build Tool', tech: 'Vite', icon: Zap },
        { name: 'Type Safety', tech: 'TypeScript', icon: Code },
        { name: 'Routing', tech: 'React Router', icon: Globe },
        { name: 'State Management', tech: 'React Query', icon: Database }
      ]
    },
    {
      name: 'Data Layer',
      icon: Database,
      color: 'from-purple-500 to-pink-500',
      components: [
        { name: 'Local State', tech: 'React useState', icon: Database },
        { name: 'Form Handling', tech: 'React Hook Form', icon: Code },
        { name: 'Data Fetching', tech: 'TanStack Query', icon: Server },
        { name: 'Validation', tech: 'Zod Schema', icon: Layers }
      ]
    }
  ];

  const features = [
    'Task Management Dashboard',
    'Statistics Overview',
    'Task Creation & Editing',
    'Search & Filtering',
    'Responsive Design',
    'Animated Interactions'
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          TaskFlow Architecture
        </h1>
        <p className="text-gray-600 text-lg">Modern React Task Management Application</p>
      </div>

      {/* Architecture Layers */}
      <div className="space-y-6">
        {layers.map((layer, index) => (
          <Card key={index} className="overflow-hidden border-0 shadow-xl">
            <CardHeader className={`bg-gradient-to-r ${layer.color} text-white`}>
              <CardTitle className="flex items-center gap-3 text-xl">
                <layer.icon className="h-6 w-6" />
                {layer.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {layer.components.map((component, compIndex) => (
                  <div 
                    key={compIndex}
                    className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200 border border-gray-200"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <component.icon className="h-4 w-4 text-gray-600" />
                      <h4 className="font-semibold text-sm text-gray-800">{component.name}</h4>
                    </div>
                    <p className="text-xs text-gray-600">{component.tech}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Project Structure */}
      <Card className="shadow-xl">
        <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
          <CardTitle className="flex items-center gap-3">
            <Layers className="h-6 w-6" />
            Project Structure
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-gray-800">Core Components</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span className="font-mono">src/pages/Index.tsx</span>
                  <span className="text-gray-600">Main Dashboard</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span className="font-mono">src/components/Header.tsx</span>
                  <span className="text-gray-600">Navigation</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span className="font-mono">src/components/StatsOverview.tsx</span>
                  <span className="text-gray-600">Statistics</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span className="font-mono">src/components/TaskCard.tsx</span>
                  <span className="text-gray-600">Task Display</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span className="font-mono">src/components/TaskForm.tsx</span>
                  <span className="text-gray-600">Task Management</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-gray-800">Key Features</h4>
              <div className="space-y-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technology Stack */}
      <Card className="shadow-xl">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <CardTitle className="flex items-center gap-3">
            <Server className="h-6 w-6" />
            Technology Stack
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'React', version: '18.3.1', color: 'bg-blue-100 text-blue-800' },
              { name: 'TypeScript', version: 'Latest', color: 'bg-blue-100 text-blue-800' },
              { name: 'Vite', version: 'Latest', color: 'bg-purple-100 text-purple-800' },
              { name: 'Tailwind CSS', version: 'Latest', color: 'bg-cyan-100 text-cyan-800' },
              { name: 'shadcn/ui', version: 'Latest', color: 'bg-gray-100 text-gray-800' },
              { name: 'Lucide React', version: '0.462.0', color: 'bg-green-100 text-green-800' },
              { name: 'React Router', version: '6.26.2', color: 'bg-red-100 text-red-800' },
              { name: 'TanStack Query', version: '5.56.2', color: 'bg-yellow-100 text-yellow-800' }
            ].map((tech, index) => (
              <div key={index} className="text-center p-3 rounded-lg border border-gray-200">
                <div className={`inline-block px-2 py-1 rounded text-xs font-semibold mb-1 ${tech.color}`}>
                  {tech.name}
                </div>
                <p className="text-xs text-gray-600">{tech.version}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArchitectureDiagram;
