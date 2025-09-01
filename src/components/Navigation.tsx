
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, LayoutDashboard, Trophy, User, Users, LogOut } from 'lucide-react';

type NavigationProps = {
  currentView: 'chat' | 'dashboard' | 'leaderboard' | 'avatar' | 'teams';
  onViewChange: (view: 'chat' | 'dashboard' | 'leaderboard' | 'avatar' | 'teams') => void;
};

export function Navigation({ currentView, onViewChange }: NavigationProps) {
  const navItems = [
    { id: 'chat', label: 'AI Chat', icon: MessageCircle },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'teams', label: 'Teams', icon: Users },
    { id: 'avatar', label: 'Avatar', icon: User },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
  ] as const;

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gaming-purple to-gaming-cyan bg-clip-text text-transparent">
              EVOZ
            </h1>
            
            {/* Navigation Items */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? 'default' : 'ghost'}
                    onClick={() => onViewChange(item.id)}
                    className={`relative ${
                      isActive 
                        ? 'bg-gaming-purple text-white' 
                        : 'hover:bg-gaming-purple/10 hover:text-gaming-purple'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                    {item.id === 'teams' && (
                      <Badge className="ml-2 bg-gaming-gold/20 text-gaming-gold text-xs px-1">
                        New
                      </Badge>
                    )}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-border">
          <div className="flex items-center justify-around py-2">
            {navItems.slice(0, 4).map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewChange(item.id)}
                  className={`flex flex-col items-center gap-1 h-auto py-2 ${
                    isActive 
                      ? 'text-gaming-purple' 
                      : 'text-muted-foreground hover:text-gaming-purple'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs">{item.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
