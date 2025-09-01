
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Zap, Star } from 'lucide-react';

type XPCounterProps = {
  xp: number;
  level: number;
};

export function XPCounter({ xp, level }: XPCounterProps) {
  const xpForCurrentLevel = (level - 1) * 100;
  const xpForNextLevel = level * 100;
  const progressInCurrentLevel = xp - xpForCurrentLevel;
  const progressPercentage = (progressInCurrentLevel / 100) * 100;

  return (
    <Card className="gaming-card p-6 max-w-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-gaming-gold to-yellow-500 rounded-full flex items-center justify-center animate-pulse-gaming">
            <Star className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gaming-gold">Level {level}</div>
            <div className="text-sm text-muted-foreground">Startup Builder</div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center gap-1 text-gaming-green">
            <Zap className="w-4 h-4" />
            <span className="font-semibold">{xp} XP</span>
          </div>
          <div className="text-xs text-muted-foreground">
            {100 - progressInCurrentLevel} XP to next level
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progress to Level {level + 1}</span>
          <span className="text-gaming-green">{progressInCurrentLevel}/100 XP</span>
        </div>
        <Progress 
          value={progressPercentage} 
          className="h-3 bg-muted"
        />
      </div>
    </Card>
  );
}
