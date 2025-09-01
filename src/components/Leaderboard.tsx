
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Crown, Medal, Star, Users, GraduationCap } from 'lucide-react';

type LeaderboardUser = {
  id: string;
  name: string;
  level: number;
  xp: number;
  avatar: string;
  university?: string;
  team?: string;
};

export function Leaderboard() {
  const [globalLeaders] = useState<LeaderboardUser[]>([
    { id: '1', name: 'Ahmed Hassan', level: 25, xp: 2500, avatar: '👑', university: 'Cairo University', team: 'Pyramids Hustlers' },
    { id: '2', name: 'Sara Mohamed', level: 22, xp: 2200, avatar: '🚀', university: 'Ain Shams University', team: 'Nile Innovators' },
    { id: '3', name: 'Omar Khaled', level: 20, xp: 2000, avatar: '⚡', university: 'American University in Cairo', team: 'Cairo Tech Squad' },
    { id: '4', name: 'Layla Farouk', level: 19, xp: 1900, avatar: '💎', university: 'Alexandria University', team: 'Alex Builders' },
    { id: '5', name: 'Youssef Ali', level: 18, xp: 1800, avatar: '🎯', university: 'Cairo University', team: 'Sphinx Creators' },
    { id: '6', name: 'Nour Mahmoud', level: 17, xp: 1700, avatar: '🌟', university: 'Mansoura University', team: 'Delta Innovators' },
    { id: '7', name: 'Karim Mostafa', level: 16, xp: 1600, avatar: '🔥', university: 'Helwan University', team: 'Memphis Makers' },
    { id: '8', name: 'Mariam Elsayed', level: 15, xp: 1500, avatar: '💫', university: 'Zagazig University', team: 'Eastern Eagles' },
    { id: '9', name: 'Hassan Ibrahim', level: 14, xp: 1400, avatar: '🚀', university: 'Beni-Suef University', team: 'Upper Egypt United' },
    { id: '10', name: 'Fatma Adel', level: 13, xp: 1300, avatar: '✨', university: 'Tanta University', team: 'Gharbiya Giants' }
  ]);

  const [universityLeaders] = useState<{ university: string; totalXP: number; members: number; topPlayer: string }[]>([
    { university: 'Cairo University', totalXP: 8500, members: 45, topPlayer: 'Ahmed Hassan' },
    { university: 'American University in Cairo', totalXP: 7200, members: 32, topPlayer: 'Omar Khaled' },
    { university: 'Ain Shams University', totalXP: 6800, members: 38, topPlayer: 'Sara Mohamed' },
    { university: 'Alexandria University', totalXP: 5900, members: 28, topPlayer: 'Layla Farouk' },
    { university: 'Mansoura University', totalXP: 4500, members: 22, topPlayer: 'Nour Mahmoud' },
    { university: 'Helwan University', totalXP: 3800, members: 19, topPlayer: 'Karim Mostafa' },
    { university: 'Zagazig University', totalXP: 3200, members: 16, topPlayer: 'Mariam Elsayed' },
    { university: 'Beni-Suef University', totalXP: 2800, members: 14, topPlayer: 'Hassan Ibrahim' }
  ]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Trophy className="w-6 h-6 text-amber-600" />;
      default:
        return <div className="w-6 h-6 flex items-center justify-center text-sm font-bold text-muted-foreground">#{rank}</div>;
    }
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return <Badge className="bg-yellow-500/20 text-yellow-600 border-yellow-500/30">👑 Champion</Badge>;
      case 2:
        return <Badge className="bg-gray-400/20 text-gray-600 border-gray-400/30">🥈 Runner-up</Badge>;
      case 3:
        return <Badge className="bg-amber-600/20 text-amber-600 border-amber-600/30">🥉 Third Place</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gaming-purple to-gaming-gold bg-clip-text text-transparent">
          Egyptian Startup Champions
        </h1>
        <p className="text-xl text-muted-foreground">
          See who's leading the startup revolution in Egypt
        </p>
      </div>

      <Tabs defaultValue="global" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 gaming-card">
          <TabsTrigger value="global" className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Global Rankings
          </TabsTrigger>
          <TabsTrigger value="university" className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            University Leagues
          </TabsTrigger>
        </TabsList>

        <TabsContent value="global" className="space-y-6">
          {/* Top 3 Podium */}
          <Card className="gaming-card p-8">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {globalLeaders.slice(0, 3).map((user, index) => (
                <div key={user.id} className={`text-center ${index === 0 ? 'md:order-2' : index === 1 ? 'md:order-1' : 'md:order-3'}`}>
                  <div className={`relative mx-auto mb-4 ${
                    index === 0 ? 'w-24 h-24' : 'w-20 h-20 mt-4'
                  }`}>
                    <div className={`w-full h-full bg-gradient-to-br rounded-full flex items-center justify-center text-2xl ${
                      index === 0 ? 'from-yellow-400 to-yellow-600 animate-pulse-gaming' :
                      index === 1 ? 'from-gray-300 to-gray-500' :
                      'from-amber-400 to-amber-600'
                    }`}>
                      {user.avatar}
                    </div>
                    <div className="absolute -top-2 -right-2">
                      {getRankIcon(index + 1)}
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-1">{user.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{user.university}</p>
                  {getRankBadge(index + 1)}
                  
                  <div className="mt-4 space-y-1">
                    <div className="flex items-center justify-center gap-1 text-gaming-gold">
                      <Star className="w-4 h-4" />
                      <span className="font-bold">Level {user.level}</span>
                    </div>
                    <div className="text-2xl font-bold text-gaming-purple">{user.xp} XP</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Full Leaderboard */}
          <Card className="gaming-card p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-gaming-gold" />
              Full Rankings
            </h3>
            
            <div className="space-y-3">
              {globalLeaders.map((user, index) => (
                <div key={user.id} className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-center w-10">
                    {getRankIcon(index + 1)}
                  </div>
                  
                  <div className="w-12 h-12 bg-gradient-to-br from-gaming-purple to-gaming-cyan rounded-full flex items-center justify-center text-xl">
                    {user.avatar}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-lg">{user.name}</span>
                      {index < 3 && getRankBadge(index + 1)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>🎓 {user.university}</span>
                      <span>👥 {user.team}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-gaming-gold mb-1">
                      <Star className="w-4 h-4" />
                      <span className="font-bold">Level {user.level}</span>
                    </div>
                    <div className="text-xl font-bold text-gaming-purple">{user.xp} XP</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="university" className="space-y-6">
          <Card className="gaming-card p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-gaming-gold" />
              Egyptian University Rankings
            </h3>
            
            <div className="space-y-4">
              {universityLeaders.map((uni, index) => (
                <Card key={uni.university} className="p-4 bg-gradient-to-r from-muted/50 to-transparent">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                      index === 0 ? 'bg-gaming-gold text-black' :
                      index === 1 ? 'bg-gray-400 text-black' :
                      index === 2 ? 'bg-amber-600 text-white' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {index + 1}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-lg">{uni.university}</h4>
                        {index === 0 && <Crown className="w-5 h-5 text-gaming-gold" />}
                      </div>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{uni.members} active builders</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          <span>Top: {uni.topPlayer}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gaming-purple">{uni.totalXP}</div>
                      <div className="text-sm text-muted-foreground">Total XP</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
