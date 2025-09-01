
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, Clock, Zap, Target } from 'lucide-react';

type Task = {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'todo' | 'in-progress' | 'completed';
  xpReward: number;
  difficulty: 'easy' | 'medium' | 'hard';
};

type ProjectDashboardProps = {
  onTaskComplete: (xpGain: number) => void;
};

export function ProjectDashboard({ onTaskComplete }: ProjectDashboardProps) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Define Target Audience',
      description: 'Research and create detailed personas of your ideal customers',
      category: 'Market Research',
      status: 'todo',
      xpReward: 25,
      difficulty: 'easy'
    },
    {
      id: '2',
      title: 'Competitor Analysis',
      description: 'Analyze 5 direct competitors and identify market gaps',
      category: 'Market Research',
      status: 'todo',
      xpReward: 40,
      difficulty: 'medium'
    },
    {
      id: '3',
      title: 'Brand Name & Logo',
      description: 'Create brand identity including name, logo, and color scheme',
      category: 'Brand Identity',
      status: 'in-progress',
      xpReward: 35,
      difficulty: 'medium'
    },
    {
      id: '4',
      title: 'Business Model Canvas',
      description: 'Complete a comprehensive business model canvas',
      category: 'Strategy',
      status: 'todo',
      xpReward: 50,
      difficulty: 'hard'
    },
    {
      id: '5',
      title: 'Create Social Media Accounts',
      description: 'Set up Instagram, TikTok, and Twitter profiles',
      category: 'Marketing',
      status: 'completed',
      xpReward: 20,
      difficulty: 'easy'
    },
    {
      id: '6',
      title: 'Find Suppliers',
      description: 'Research and contact potential manufacturers',
      category: 'Operations',
      status: 'todo',
      xpReward: 45,
      difficulty: 'hard'
    }
  ]);

  const handleTaskStatusChange = (taskId: string, newStatus: Task['status']) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const updatedTask = { ...task, status: newStatus };
        
        // Award XP when task is completed
        if (newStatus === 'completed' && task.status !== 'completed') {
          onTaskComplete(task.xpReward);
          
          // Show XP gain animation
          const element = document.getElementById(`task-${taskId}`);
          if (element) {
            const xpGainElement = document.createElement('div');
            xpGainElement.textContent = `+${task.xpReward} XP`;
            xpGainElement.className = 'xp-gain absolute top-0 right-0 text-gaming-gold font-bold z-10';
            element.style.position = 'relative';
            element.appendChild(xpGainElement);
            
            setTimeout(() => {
              if (xpGainElement.parentNode) {
                xpGainElement.parentNode.removeChild(xpGainElement);
              }
            }, 1000);
          }
        }
        
        return updatedTask;
      }
      return task;
    }));
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-gaming-green" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-gaming-gold" />;
      default:
        return <Circle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-gaming-green/20 text-gaming-green border-gaming-green/30">Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-gaming-gold/20 text-gaming-gold border-gaming-gold/30">In Progress</Badge>;
      default:
        return <Badge variant="outline">To Do</Badge>;
    }
  };

  const getDifficultyColor = (difficulty: Task['difficulty']) => {
    switch (difficulty) {
      case 'easy':
        return 'text-gaming-green';
      case 'medium':
        return 'text-gaming-gold';
      case 'hard':
        return 'text-gaming-red';
    }
  };

  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const totalTasks = tasks.length;
  const completionPercentage = (completedTasks / totalTasks) * 100;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Your Startup Dashboard</h1>
        
        {/* Progress Overview */}
        <Card className="gaming-card p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Project Progress</h3>
              <p className="text-muted-foreground">Keep building to level up!</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gaming-purple">{completedTasks}/{totalTasks}</div>
              <div className="text-sm text-muted-foreground">Tasks Completed</div>
            </div>
          </div>
          
          <div className="w-full bg-muted rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-gaming-purple to-gaming-cyan h-3 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </Card>
      </div>

      {/* Task Categories */}
      <div className="space-y-6">
        {['Market Research', 'Brand Identity', 'Strategy', 'Marketing', 'Operations'].map(category => {
          const categoryTasks = tasks.filter(task => task.category === category);
          if (categoryTasks.length === 0) return null;

          return (
            <div key={category} className="space-y-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-gaming-purple" />
                <h2 className="text-xl font-semibold">{category}</h2>
                <Badge variant="outline" className="ml-auto">
                  {categoryTasks.filter(t => t.status === 'completed').length}/{categoryTasks.length}
                </Badge>
              </div>
              
              <div className="grid gap-4">
                {categoryTasks.map(task => (
                  <Card key={task.id} id={`task-${task.id}`} className="gaming-card p-6 hover:glow-purple transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3 flex-1">
                        <button
                          onClick={() => {
                            if (task.status === 'completed') {
                              handleTaskStatusChange(task.id, 'todo');
                            } else if (task.status === 'in-progress') {
                              handleTaskStatusChange(task.id, 'completed');
                            } else {
                              handleTaskStatusChange(task.id, 'in-progress');
                            }
                          }}
                          className="mt-1 hover:scale-110 transition-transform"
                        >
                          {getStatusIcon(task.status)}
                        </button>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className={`font-semibold ${task.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
                              {task.title}
                            </h3>
                            {getStatusBadge(task.status)}
                          </div>
                          <p className="text-muted-foreground text-sm mb-3">{task.description}</p>
                          
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Zap className="w-4 h-4 text-gaming-green" />
                              <span className="text-gaming-green font-medium">{task.xpReward} XP</span>
                            </div>
                            <div className={`capitalize ${getDifficultyColor(task.difficulty)}`}>
                              {task.difficulty}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {task.status !== 'completed' && (
                      <div className="flex gap-2">
                        {task.status === 'todo' && (
                          <Button 
                            size="sm" 
                            onClick={() => handleTaskStatusChange(task.id, 'in-progress')}
                            className="btn-gaming"
                          >
                            Start Task
                          </Button>
                        )}
                        {task.status === 'in-progress' && (
                          <Button 
                            size="sm" 
                            onClick={() => handleTaskStatusChange(task.id, 'completed')}
                            className="btn-gaming"
                          >
                            Mark Complete
                          </Button>
                        )}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
