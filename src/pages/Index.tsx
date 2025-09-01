import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Zap, Trophy, Users, MessageCircle, Rocket, Star, Play, CheckCircle, Award, Crown } from 'lucide-react';
import { ChatInterface } from '@/components/ChatInterface';
import { ProjectDashboard } from '@/components/ProjectDashboard';
import { Navigation } from '@/components/Navigation';
import { XPCounter } from '@/components/XPCounter';
import { Avatar } from '@/components/Avatar';
import { Leaderboard } from '@/components/Leaderboard';
import { AuthFlow } from '@/components/AuthFlow';
import { TeamDashboard } from '@/components/TeamDashboard';
import { HowItWorksModal } from '@/components/HowItWorksModal';

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'chat' | 'dashboard' | 'leaderboard' | 'avatar' | 'teams'>('landing');
  const [userXP, setUserXP] = useState(250);
  const [userLevel, setUserLevel] = useState(3);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);

  const handleStartProject = () => {
    if (!isAuthenticated) {
      setShowAuth(true);
      return;
    }
    setCurrentView('chat');
  };

  const handleTaskComplete = (xpGain: number) => {
    setUserXP(prev => {
      const newXP = prev + xpGain;
      const newLevel = Math.floor(newXP / 100) + 1;
      if (newLevel > userLevel) {
        setUserLevel(newLevel);
        setShowLevelUp(true);
      }
      return newXP;
    });
  };

  const handleAuthComplete = () => {
    setIsAuthenticated(true);
    setShowAuth(false);
    setCurrentView('chat');
  };

  const handleLogout = () => {
    // Clear all user state and localStorage
    setIsAuthenticated(false);
    setUserXP(0);
    setUserLevel(1);
    setShowLevelUp(false);
    setCurrentView('landing');
    
    // Clear localStorage
    localStorage.removeItem('theme');
    localStorage.removeItem('user-data');
    localStorage.removeItem('tasks');
    localStorage.removeItem('teams');
    
    console.log('User logged out, all state cleared');
  };

  const handleLevelUpComplete = () => {
    setShowLevelUp(false);
  };

  if (showAuth && !isAuthenticated) {
    return <AuthFlow onComplete={handleAuthComplete} onBack={() => setShowAuth(false)} />;
  }

  if (currentView !== 'landing' && isAuthenticated) {
    return (
      <div className="min-h-screen bg-background transition-colors duration-300">
        <Navigation 
          currentView={currentView} 
          onViewChange={setCurrentView} 
          onLogout={handleLogout}
        />
        
        <div className="flex">
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-6">
                <XPCounter xp={userXP} level={userLevel} />
              </div>
              
              {currentView === 'chat' && (
                <ChatInterface onTasksGenerated={() => setCurrentView('dashboard')} />
              )}
              
              {currentView === 'dashboard' && (
                <ProjectDashboard onTaskComplete={handleTaskComplete} />
              )}
              
              {currentView === 'avatar' && (
                <Avatar 
                  level={userLevel} 
                  xp={userXP} 
                  showLevelUp={showLevelUp}
                  onLevelUpComplete={handleLevelUpComplete}
                />
              )}
              
              {currentView === 'leaderboard' && (
                <Leaderboard />
              )}
              
              {currentView === 'teams' && (
                <TeamDashboard />
              )}
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20"></div>
        
        <div className="relative z-10 container mx-auto px-6 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 backdrop-blur-sm border border-purple-500/30 rounded-full px-6 py-2 mb-8">
              <Zap className="w-4 h-4 text-gaming-purple" />
              <span className="text-sm font-medium">Level Up Your Startup Game</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gaming-purple via-gaming-cyan to-gaming-purple bg-clip-text text-transparent mb-6">
              EVOZ
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Turn your startup dreams into reality with AI-powered guidance and gamified productivity that actually makes building fun.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                onClick={handleStartProject}
                className="btn-gaming px-8 py-6 text-lg"
              >
                <Rocket className="w-5 h-5 mr-2" />
                Start Your Journey
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => setShowHowItWorks(true)}
                className="px-8 py-6 text-lg border-purple-500/30 hover:border-purple-500/60 hover:bg-purple-500/10"
              >
                <Play className="w-5 h-5 mr-2" />
                How It Works
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why EVOZ is Different
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We combine AI mentorship with gaming elements to make startup building addictive in the best way possible.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="gaming-card p-8 text-center group hover:glow-purple">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse-gaming">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">AI Startup Mentor</h3>
            <p className="text-muted-foreground">
              Chat with our AI to transform vague ideas into concrete, actionable tasks that move your startup forward.
            </p>
          </Card>
          
          <Card className="gaming-card p-8 text-center group hover:glow-cyan">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse-gaming">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Gamified Progress</h3>
            <p className="text-muted-foreground">
              Earn XP, level up your avatar, and compete on leaderboards. Making progress has never been this addictive.
            </p>
          </Card>
          
          <Card className="gaming-card p-8 text-center group hover:glow-purple">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse-gaming">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Team Collaboration</h3>
            <p className="text-muted-foreground">
              Build with friends, share XP, and compete with other university teams in exclusive leagues.
            </p>
          </Card>
        </div>
      </div>

      {/* Stats Section with Egyptian flavor */}
      <div className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gaming-gold mb-2">1,247</div>
              <div className="text-muted-foreground">Active Builders</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gaming-cyan mb-2">50K+</div>
              <div className="text-muted-foreground">Tasks Completed</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gaming-purple mb-2">25</div>
              <div className="text-muted-foreground">Egyptian Universities</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gaming-green mb-2">89</div>
              <div className="text-muted-foreground">Launched Startups</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Level Up Your Startup?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of Egyptian entrepreneurs who are building the future, one XP at a time.
          </p>
          
          <Button 
            onClick={handleStartProject}
            className="btn-gaming px-12 py-6 text-xl"
          >
            <Star className="w-6 h-6 mr-2" />
            Start Building Now
          </Button>
        </div>
      </div>

      {/* How It Works Modal */}
      <HowItWorksModal 
        open={showHowItWorks} 
        onOpenChange={setShowHowItWorks}
        onStartNow={handleStartProject}
      />
    </div>
  );
};

export default Index;
