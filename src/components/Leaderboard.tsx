
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Crown, Star, Medal, Users, Globe } from 'lucide-react';

type LeaderboardEntry = {
  id: string;
  name: string;
  level: number;
  xp: number;
  university?: string;
  avatar: string;
};

export function Leaderboard() {
  const [activeTab, setActiveTab] = useState('global');

  // Mock leaderboard data
  const globalLeaderboard: LeaderboardEntry[] = [
    { id: '1', name: 'Alex Chen', level: 12, xp: 1250, university: 'Stanford', avatar: '👨‍💻' },
    { id: '2', name: 'Sarah Johnson', level: 11, xp: 1180, university: 'MIT', avatar: '👩‍🚀' },
    { id: '3', name: 'Marcus Rivera', level: 10, xp: 1050, university: 'Berkeley', avatar: '👨‍🎓' },
    { id: '4', name: 'Emma Wilson', level: 9, xp: 920, university: 'Harvard', avatar: '👩‍💼' },
    { id: '5', name: 'David Kim', level: 8, xp: 850, university: 'Stanford', avatar: '👨‍🔬' },
    { id: '6', name: 'You', level: 3, xp: 250, university: 'Your University', avatar: '🚀' },
  ];

  const universityLeaderboard: LeaderboardEntry[] = [
    { id: '1', name: 'You', level: 3, xp: 250, avatar: '🚀' },
    { id: '2', name: 'Jessica Lee', level: 5, xp: 480, avatar: '👩‍🎨' },
    { id: '3', name: 'Ryan Park', level: 4, xp: 350, avatar: '👨‍💻' },
    { id: '4', name: 'Amy Foster', level: 2, xp: 180, avatar: '👩‍🔬' },
    { id: '5', name: 'Chris Taylor', level: 2, xp: 150, avatar: '👨‍🎓' },
  ];

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="w-5 h-5 text-gaming-gold" />;
      case 2:
        return <Trophy className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Medal className="w-5 h-5 text-amber-600" />;
      default:
        return <Star className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getRankBadge = (position: number) => {
    switch (position) {
      case 1:
        return <Badge className="bg-gaming-gold/20 text-gaming-gold border-gaming-gold/30">1st</Badge>;
      case 2:
        return <Badge className="bg-gray-400/20 text-gray-300 border-gray-400/30">2nd</Badge>;
      case 3:
        return <Badge className="bg-amber-600/20 text-amber-500 border-amber-600/30">3rd</Badge>;
      default:
        return <Badge variant="outline">#{position}</Badge>;
    }
  };

  const renderLeaderboard = (data: LeaderboardEntry[]) => (
    <div className="space-y-4">
      {data.map((entry, index) => {
        const position = index + 1;
        const isCurrentUser = entry.name === 'You';
        
        return (
          <Card 
            key={entry.id} 
            className={`gaming-card p-4 transition-all duration-300 ${
              isCurrentUser ? 'glow-purple border-gaming-purple/50' : 'hover:glow-cyan'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {getRankIcon(position)}
                  {getRankBadge(position)}
                </div>
                
                <div className="text-2xl">{entry.avatar}</div>
                
                <div>
                  <div className="font-semibold text-lg flex items-center gap-2">
                    {entry.name}
                    {isCurrentUser && (
                      <Badge className="bg-gaming-purple/20 text-gaming-purple border-gaming-purple/30">
                        You
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {entry.university && `${entry.university} • `}Level {entry.level}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-xl font-bold text-gaming-green">{entry.xp} XP</div>
                <div className="text-sm text-muted-foreground">Experience</div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Leaderboards</h1>
        <p className="text-muted-foreground">See how you stack up against other startup builders</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-card/50 border border-border/50">
          <TabsTrigger value="global" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Global
          </TabsTrigger>
          <TabsTrigger value="university" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Your University
          </TabsTrigger>
        </TabsList>

        <TabsContent value="global" className="space-y-6">
          <Card className="gaming-card p-6">
            <div className="flex items-center gap-2 mb-6">
              <Globe className="w-5 h-5 text-gaming-cyan" />
              <h2 className="text-xl font-semibold">Global Leaderboard</h2>
              <Badge variant="outline" className="ml-auto">Live Rankings</Badge>
            </div>
            {renderLeaderboard(globalLeaderboard)}
          </Card>
        </TabsContent>

        <TabsContent value="university" className="space-y-6">
          <Card className="gaming-card p-6">
            <div className="flex items-center gap-2 mb-6">
              <Users className="w-5 h-5 text-gaming-purple" />
              <h2 className="text-xl font-semibold">Your University League</h2>
              <Badge variant="outline" className="ml-auto">Your University</Badge>
            </div>
            {renderLeaderboard(universityLeaderboard)}
          </Card>
          
          <Card className="gaming-card p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Join a University League</h3>
            <p className="text-muted-foreground mb-4">
              Connect with fellow student entrepreneurs at your school
            </p>
            <Button className="btn-gaming">
              Enter University Code
            </Button>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <Card className="gaming-card p-6 text-center">
          <div className="w-12 h-12 bg-gaming-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Trophy className="w-6 h-6 text-gaming-gold" />
          </div>
          <div className="text-2xl font-bold mb-1">Global Rank</div>
          <div className="text-3xl font-bold text-gaming-gold">#6</div>
        </Card>
        
        <Card className="gaming-card p-6 text-center">
          <div className="w-12 h-12 bg-gaming-purple/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6 text-gaming-purple" />
          </div>
          <div className="text-2xl font-bold mb-1">University Rank</div>
          <div className="text-3xl font-bold text-gaming-purple">#1</div>
        </Card>
        
        <Card className="gaming-card p-6 text-center">
          <div className="w-12 h-12 bg-gaming-green/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Star className="w-6 h-6 text-gaming-green" />
          </div>
          <div className="text-2xl font-bold mb-1">Total XP</div>
          <div className="text-3xl font-bold text-gaming-green">250</div>
        </Card>
      </div>
    </div>
  );
}
