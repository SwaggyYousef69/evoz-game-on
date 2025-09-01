
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, Zap, Trophy, Crown } from 'lucide-react';

type AvatarProps = {
  level: number;
  xp: number;
};

export function Avatar({ level, xp }: AvatarProps) {
  const getAvatarStyle = (level: number) => {
    if (level >= 10) return 'from-gaming-gold via-yellow-400 to-gaming-gold'; // Master
    if (level >= 7) return 'from-purple-500 via-gaming-purple to-cyan-500'; // Expert
    if (level >= 4) return 'from-gaming-cyan via-blue-400 to-gaming-cyan'; // Advanced
    return 'from-gaming-purple via-purple-400 to-gaming-purple'; // Beginner
  };

  const getAvatarTitle = (level: number) => {
    if (level >= 10) return 'Startup Master';
    if (level >= 7) return 'Business Expert';
    if (level >= 4) return 'Advanced Builder';
    return 'Startup Rookie';
  };

  const getAvatarIcon = (level: number) => {
    if (level >= 10) return Crown;
    if (level >= 7) return Trophy;
    if (level >= 4) return Star;
    return Zap;
  };

  const getNextLevelXP = () => level * 100;
  const getCurrentLevelXP = () => (level - 1) * 100;
  const progressInCurrentLevel = xp - getCurrentLevelXP();
  const progressPercentage = (progressInCurrentLevel / 100) * 100;

  const AvatarIcon = getAvatarIcon(level);

  const achievements = [
    { id: 1, name: 'First Steps', description: 'Complete your first task', unlocked: level >= 1, icon: Zap },
    { id: 2, name: 'Getting Started', description: 'Reach level 3', unlocked: level >= 3, icon: Star },
    { id: 3, name: 'Making Progress', description: 'Reach level 5', unlocked: level >= 5, icon: Trophy },
    { id: 4, name: 'Business Builder', description: 'Reach level 7', unlocked: level >= 7, icon: Crown },
    { id: 5, name: 'Startup Master', description: 'Reach level 10', unlocked: level >= 10, icon: Crown },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Avatar</h1>
        <p className="text-muted-foreground">Level up by completing tasks and building your startup</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Avatar Display */}
        <Card className="gaming-card p-8 text-center">
          <div className="relative mb-6">
            <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${getAvatarStyle(level)} flex items-center justify-center animate-pulse-gaming`}>
              <AvatarIcon className="w-16 h-16 text-white" />
            </div>
            
            {/* Level badge */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-gaming-gold text-black font-bold px-4 py-2">
                Level {level}
              </Badge>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold mb-2">{getAvatarTitle(level)}</h3>
          <p className="text-muted-foreground mb-6">Keep building to unlock new avatar styles!</p>
          
          {/* XP Progress */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Progress to Level {level + 1}</span>
              <span className="text-gaming-green">{progressInCurrentLevel}/100 XP</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <div className="text-sm text-muted-foreground">
              {100 - progressInCurrentLevel} XP until next level
            </div>
          </div>
        </Card>

        {/* Stats */}
        <Card className="gaming-card p-8">
          <h3 className="text-xl font-semibold mb-6">Stats</h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gaming-green/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-gaming-green" />
                </div>
                <div>
                  <div className="font-semibold">Total XP</div>
                  <div className="text-sm text-muted-foreground">Experience Points</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-gaming-green">{xp}</div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gaming-gold/20 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-gaming-gold" />
                </div>
                <div>
                  <div className="font-semibold">Current Level</div>
                  <div className="text-sm text-muted-foreground">Builder Rank</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-gaming-gold">{level}</div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gaming-purple/20 rounded-lg flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-gaming-purple" />
                </div>
                <div>
                  <div className="font-semibold">Tasks Completed</div>
                  <div className="text-sm text-muted-foreground">Productivity Score</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-gaming-purple">{Math.floor(xp / 25)}</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="gaming-card p-8">
        <h3 className="text-xl font-semibold mb-6">Achievements</h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => {
            const AchievementIcon = achievement.icon;
            return (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  achievement.unlocked
                    ? 'border-gaming-gold/50 bg-gaming-gold/10 glow-gold'
                    : 'border-muted bg-muted/20'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    achievement.unlocked 
                      ? 'bg-gaming-gold text-black' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <AchievementIcon className="w-4 h-4" />
                  </div>
                  <div className="font-semibold">{achievement.name}</div>
                </div>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
                {achievement.unlocked && (
                  <Badge className="mt-2 bg-gaming-gold/20 text-gaming-gold border-gaming-gold/30">
                    Unlocked!
                  </Badge>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
