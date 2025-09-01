import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, Circle, Clock, Zap, Target, Upload, MessageCircle, X, Send, RotateCcw } from 'lucide-react';
import { TaskSubmissionModal } from '@/components/TaskSubmissionModal';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Define Target Audience for Egyptian Market',
      description: 'Research and create detailed personas of your ideal Egyptian customers',
      category: 'Market Research',
      status: 'todo',
      xpReward: 25,
      difficulty: 'easy'
    },
    {
      id: '2',
      title: 'Analyze Cairo E-commerce Competitors',
      description: 'Study 5 direct competitors in the Egyptian market and identify gaps',
      category: 'Market Research',
      status: 'todo',
      xpReward: 40,
      difficulty: 'medium'
    },
    {
      id: '3',
      title: 'Create Arabic Brand Identity',
      description: 'Design brand identity including Arabic name, logo, and cultural elements',
      category: 'Brand Identity',
      status: 'in-progress',
      xpReward: 35,
      difficulty: 'medium'
    },
    {
      id: '4',
      title: 'Egyptian Business Model Canvas',
      description: 'Complete business model canvas adapted for the Egyptian market',
      category: 'Strategy',
      status: 'todo',
      xpReward: 50,
      difficulty: 'hard'
    },
    {
      id: '5',
      title: 'Setup Egyptian Social Media',
      description: 'Create Facebook, Instagram, and TikTok profiles for Egyptian audience',
      category: 'Marketing',
      status: 'completed',
      xpReward: 20,
      difficulty: 'easy'
    },
    {
      id: '6',
      title: 'Find Local Egyptian Suppliers',
      description: 'Research and contact potential manufacturers in Egypt',
      category: 'Operations',
      status: 'todo',
      xpReward: 45,
      difficulty: 'hard'
    }
  ]);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [showRedoConfirm, setShowRedoConfirm] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: '1', text: 'مرحبا! هل تحتاج مساعدة في أي من المهام؟', sender: 'ai', timestamp: Date.now() - 300000 },
    { id: '2', text: 'I can help you break down complex tasks for the Egyptian market!', sender: 'ai', timestamp: Date.now() - 240000 }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleTaskStatusChange = (taskId: string, newStatus: Task['status']) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const updatedTask = { ...task, status: newStatus };
        
        if (newStatus === 'completed' && task.status !== 'completed') {
          onTaskComplete(task.xpReward);
          
          // Show XP gain animation
          const element = document.getElementById(`task-${taskId}`);
          if (element) {
            const xpGainElement = document.createElement('div');
            xpGainElement.textContent = `+${task.xpReward} XP`;
            xpGainElement.className = 'xp-gain absolute top-0 right-0 text-gaming-gold font-bold z-10 animate-bounce';
            xpGainElement.style.animation = 'bounce 0.5s ease-in-out';
            element.style.position = 'relative';
            element.appendChild(xpGainElement);
            
            setTimeout(() => {
              if (xpGainElement.parentNode) {
                xpGainElement.parentNode.removeChild(xpGainElement);
              }
            }, 2000);
          }

          toast({
            title: "Task Completed! 🎉",
            description: `You earned ${task.xpReward} XP for completing "${task.title}"`,
          });
        }
        
        return updatedTask;
      }
      return task;
    }));
  };

  const handleTaskSubmission = (taskId: string, submission: any) => {
    handleTaskStatusChange(taskId, 'completed');
    setShowSubmissionModal(false);
    setSelectedTask(null);
  };

  const handleRedoTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      handleTaskStatusChange(taskId, 'in-progress');
      setShowRedoConfirm(null);
      toast({
        title: "Task Reset",
        description: `"${task.title}" is now ready for resubmission`,
      });
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const userMessage = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user' as const,
      timestamp: Date.now()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // Mock AI response with Egyptian context
    setTimeout(() => {
      const responses = [
        "Great question! For the Egyptian market, I'd recommend focusing on mobile-first solutions since smartphone usage is very high.",
        "Consider local payment methods like Fawry and Vodafone Cash for Egyptian customers.",
        "Remember to localize your content in Arabic and consider cultural preferences.",
        "The Egyptian market loves social proof - customer testimonials work really well here!"
      ];
      
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'ai' as const,
        timestamp: Date.now()
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
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
    <div className="max-w-6xl mx-auto relative">
      {/* Chat Sidebar Toggle */}
      <Button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-6 right-6 z-40 btn-gaming rounded-full w-14 h-14 p-0"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>

      {/* Chat Sidebar */}
      {chatOpen && (
        <div className="fixed inset-y-0 right-0 w-80 bg-background border-l border-border z-50 flex flex-col animate-slide-in-right">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold">AI Assistant</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setChatOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-gaming-purple text-white'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Textarea
                placeholder="Ask about your tasks..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                className="min-h-0 resize-none"
                rows={1}
              />
              <Button onClick={handleSendMessage} size="sm" className="btn-gaming">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

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
                              return; // Don't allow status change via icon for completed tasks
                            } else if (task.status === 'in-progress') {
                              setSelectedTask(task);
                              setShowSubmissionModal(true);
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
                          onClick={() => {
                            setSelectedTask(task);
                            setShowSubmissionModal(true);
                          }}
                          className="btn-gaming"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Submit Work
                        </Button>
                      )}
                      {task.status === 'completed' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setShowRedoConfirm(task.id)}
                          className="border-gaming-gold/30 text-gaming-gold hover:bg-gaming-gold/10"
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Redo Task
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Task Submission Modal */}
      {selectedTask && (
        <TaskSubmissionModal
          open={showSubmissionModal}
          onOpenChange={setShowSubmissionModal}
          task={selectedTask}
          onSubmit={handleTaskSubmission}
        />
      )}

      {/* Redo Confirmation Dialog */}
      <Dialog open={!!showRedoConfirm} onOpenChange={() => setShowRedoConfirm(null)}>
        <DialogContent className="gaming-card">
          <DialogHeader>
            <DialogTitle>Redo Task?</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Are you sure you want to redo this task? Your previous submission will be cleared and you can submit new work.
            </p>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowRedoConfirm(null)}>
                Cancel
              </Button>
              <Button 
                onClick={() => showRedoConfirm && handleRedoTask(showRedoConfirm)}
                className="btn-gaming"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Redo Task
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
