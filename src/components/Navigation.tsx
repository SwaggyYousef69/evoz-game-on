
import { Button } from '@/components/ui/button';
import { MessageSquare, BarChart3, User, Trophy, Users, LogOut } from 'lucide-react';

type NavigationProps = {
  currentView: string;
  onViewChange: (view: 'chat' | 'dashboard' | 'leaderboard' | 'avatar' | 'teams') => void;
  onLogout: () => void;
};

export function Navigation({ currentView, onViewChange, onLogout }: NavigationProps) {
  const navItems = [
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'avatar', label: 'Avatar', icon: User },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'teams', label: 'Teams', icon: Users },
  ];

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gaming-purple to-gaming-cyan bg-clip-text text-transparent">
              EVOZ
            </h1>
            
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentView === item.id ? 'default' : 'ghost'}
                    onClick={() => onViewChange(item.id as any)}
                    className={`flex items-center gap-2 ${
                      currentView === item.id 
                        ? 'btn-gaming' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
          </div>

          <Button
            variant="outline"
            onClick={onLogout}
            className="flex items-center gap-2 text-red-400 border-red-400/30 hover:bg-red-400/10 hover:border-red-400/60"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex overflow-x-auto pb-2 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={currentView === item.id ? 'default' : 'ghost'}
                onClick={() => onViewChange(item.id as any)}
                className={`flex items-center gap-2 whitespace-nowrap ${
                  currentView === item.id 
                    ? 'btn-gaming' 
                    : 'hover:bg-muted'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
