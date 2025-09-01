
import { Button } from '@/components/ui/button';
import { MessageCircle, LayoutDashboard, User, Trophy, Users, Zap } from 'lucide-react';

type NavigationProps = {
  currentView: string;
  onViewChange: (view: 'landing' | 'chat' | 'dashboard' | 'leaderboard' | 'avatar') => void;
};

export function Navigation({ currentView, onViewChange }: NavigationProps) {
  const navItems = [
    { id: 'chat', label: 'AI Chat', icon: MessageCircle },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'avatar', label: 'Avatar', icon: User },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
  ];

  return (
    <nav className="bg-card/50 backdrop-blur-sm border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-gaming-purple to-gaming-cyan rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gaming-purple to-gaming-cyan bg-clip-text text-transparent">
              EVOZ
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onViewChange(item.id as any)}
                  className={isActive ? "btn-gaming" : "hover:bg-purple-500/10"}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
