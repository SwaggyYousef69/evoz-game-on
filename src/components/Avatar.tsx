
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Star, Zap, Trophy, Crown, Coffee, Headphones, Laptop, Sparkles } from 'lucide-react';

type AvatarProps = {
  level: number;
  xp: number;
};

export function Avatar({ level, xp }: AvatarProps) {
  const getAvatarEvolution = (level: number) => {
    if (level >= 40) return { 
      title: 'Startup Legend', 
      style: 'from-yellow-400 via-yellow-300 to-yellow-400',
      icon: Crown,
      description: 'The ultimate entrepreneur - a legend in the startup world',
      accessories: ['holographic-display', 'luxury-suit', 'diamond-watch']
    };
    if (level >= 30) return { 
      title: 'Venture Capitalist', 
      style: 'from-purple-400 via-pink-400 to-purple-400',
      icon: Crown,
      description: 'Now funding the next generation of startups',
      accessories: ['executive-suit', 'smart-glasses', 'golden-pen']
    };
    if (level >= 20) return { 
      title: 'CEO & Founder', 
      style: 'from-gaming-gold via-yellow-400 to-gaming-gold',
      icon: Trophy,
      description: 'Leading a successful company to new heights',
      accessories: ['business-suit', 'smart-watch', 'briefcase']
    };
    if (level >= 10) return { 
      title: 'Startup Founder', 
      style: 'from-gaming-purple via-purple-400 to-gaming-purple',
      icon: Star,
      description: 'Ready to launch and scale your business',
      accessories: ['blazer', 'laptop', 'coffee-cup']
    };
    if (level >= 5) return { 
      title: 'Startup Hustler', 
      style: 'from-gaming-cyan via-blue-400 to-gaming-cyan',
      icon: Zap,
      description: 'Grinding hard to make your dreams reality',
      accessories: ['hoodie', 'headphones', 'energy-drink']
    };
    return { 
      title: 'Student Builder', 
      style: 'from-gaming-green via-green-400 to-gaming-green',
      icon: Sparkles,
      description: 'Just starting your entrepreneurial journey',
      accessories: ['casual-tee', 'backpack', 'notebook']
    };
  };

  const getNextLevelXP = () => level * 100;
  const getCurrentLevelXP = () => (level - 1) * 100;
  const progressInCurrentLevel = xp - getCurrentLevelXP();
  const progressPercentage = (progressInCurrentLevel / 100) * 100;

  const evolution = getAvatarEvolution(level);
  const AvatarIcon = evolution.icon;

  const achievements = [
    { id: 1, name: 'First Steps', description: 'Complete your first task', unlocked: level >= 1, icon: Zap },
    { id: 2, name: 'Getting Serious', description: 'Reach level 5', unlocked: level >= 5, icon: Star },
    { id: 3, name: 'Startup Hustler', description: 'Reach level 10', unlocked: level >= 10, icon: Trophy },
    { id: 4, name: 'Business Leader', description: 'Reach level 20', unlocked: level >= 20, icon: Crown },
    { id: 5, name: 'Industry Legend', description: 'Reach level 40', unlocked: level >= 40, icon: Crown },
  ];

  const customizationOptions = [
    { name: 'Outfits', items: ['Hoodie', 'Blazer', 'Business Suit', 'Casual Tee'] },
    { name: 'Accessories', items: ['Backpack', 'Headphones', 'Smart Watch', 'Laptop'] },
    { name: 'Effects', items: ['Glow', 'Sparkles', 'Energy Aura', 'Success Glow'] }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Avatar Evolution</h1>
        <p className="text-muted-foreground">Level up to unlock new looks and startup roles</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Avatar Display */}
        <Card className="gaming-card p-8 text-center lg:col-span-2">
          <div className="relative mb-6">
            <div className={`w-40 h-40 mx-auto rounded-full bg-gradient-to-br ${evolution.style} flex items-center justify-center animate-pulse-gaming relative overflow-hidden`}>
              <AvatarIcon className="w-20 h-20 text-white" />
              
              {/* Level-based visual effects */}
              {level >= 20 && (
                <div className="absolute inset-0 rounded-full border-4 border-gaming-gold animate-spin-slow opacity-60"></div>
              )}
              {level >= 10 && (
                <div className="absolute -top-2 -right-2">
                  <Coffee className="w-8 h-8 text-gaming-gold" />
                </div>
              )}
              {level >= 5 && (
                <div className="absolute -bottom-2 -left-2">
                  <Headphones className="w-8 h-8 text-gaming-cyan" />
                </div>
              )}
            </div>
            
            {/* Level badge */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-gaming-gold text-black font-bold px-4 py-2">
                Level {level}
              </Badge>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold mb-2">{evolution.title}</h3>
          <p className="text-muted-foreground mb-6">{evolution.description}</p>
          
          {/* XP Progress */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span>Progress to Level {level + 1}</span>
              <span className="text-gaming-green">{progressInCurrentLevel}/100 XP</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <div className="text-sm text-muted-foreground">
              {100 - progressInCurrentLevel} XP until evolution
            </div>
          </div>

          {/* Evolution Preview */}
          {level < 40 && (
            <Card className="p-4 bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border-dashed">
              <h4 className="font-semibold mb-2">Next Evolution Preview</h4>
              <p className="text-sm text-muted-foreground">
                {getAvatarEvolution(Math.min(level + 10, 40)).title} - {getAvatarEvolution(Math.min(level + 10, 40)).description}
              </p>
            </Card>
          )}
        </Card>

        {/* Customization Panel */}
        <Card className="gaming-card p-6">
          <h3 className="text-xl font-semibold mb-6">Customize Avatar</h3>
          
          {customizationOptions.map((category) => (
            <div key={category.name} className="mb-6">
              <h4 className="font-semibold mb-3 text-gaming-purple">{category.name}</h4>
              <div className="grid grid-cols-2 gap-2">
                {category.items.map((item) => (
                  <Button
                    key={item}
                    variant="outline"
                    size="sm"
                    className="text-xs hover:bg-gaming-purple/20 hover:border-gaming-purple/50"
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* Stats */}
      <Card className="gaming-card p-8">
        <h3 className="text-xl font-semibold mb-6">Avatar Stats</h3>
        
        <div className="grid md:grid-cols-3 gap-6">
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

      {/* Achievements */}
      <Card className="gaming-card p-8">
        <h3 className="text-xl font-semibold mb-6">Evolution Milestones</h3>
        
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
