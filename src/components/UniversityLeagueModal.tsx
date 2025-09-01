
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Trophy, Users, Sparkles } from 'lucide-react';

type UniversityLeagueModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onJoin: (university: string) => void;
};

export function UniversityLeagueModal({ open, onOpenChange, onJoin }: UniversityLeagueModalProps) {
  const [leagueCode, setLeagueCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [joined, setJoined] = useState(false);

  const topUniversities = [
    { name: 'Stanford University', code: 'STAN2024', members: 342, avgLevel: 8.2 },
    { name: 'MIT', code: 'MIT2024', members: 298, avgLevel: 9.1 },
    { name: 'Harvard University', code: 'HARV2024', members: 256, avgLevel: 7.8 },
    { name: 'UC Berkeley', code: 'UCB2024', members: 189, avgLevel: 7.5 },
    { name: 'Carnegie Mellon', code: 'CMU2024', members: 167, avgLevel: 8.9 },
  ];

  const handleJoinLeague = async () => {
    if (!leagueCode.trim()) return;
    
    setIsJoining(true);
    
    // Mock API call
    setTimeout(() => {
      setIsJoining(false);
      setJoined(true);
      
      setTimeout(() => {
        onJoin(leagueCode);
        setJoined(false);
        setLeagueCode('');
      }, 2000);
    }, 1000);
  };

  const handleQuickJoin = (code: string) => {
    setLeagueCode(code);
    handleJoinLeague();
  };

  if (joined) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="gaming-card max-w-md">
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-gradient-to-br from-gaming-gold to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-gaming">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gaming-gold">Welcome to the League!</h3>
            <p className="text-muted-foreground mb-6">
              You've successfully joined your university league. Get ready to compete with your classmates!
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gaming-green">
              <Trophy className="w-4 h-4" />
              <span>+50 XP Bonus for joining!</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gaming-card max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <GraduationCap className="w-6 h-6 text-gaming-gold" />
            Join University League
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <p className="text-muted-foreground">
              Compete with students from your university and climb the leaderboards together!
            </p>
          </div>

          {/* Manual Code Entry */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">University League Code</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter your university's league code"
                  value={leagueCode}
                  onChange={(e) => setLeagueCode(e.target.value.toUpperCase())}
                  className="flex-1"
                />
                <Button 
                  onClick={handleJoinLeague}
                  disabled={!leagueCode.trim() || isJoining}
                  className="btn-gaming"
                >
                  {isJoining ? 'Joining...' : 'Join League'}
                </Button>
              </div>
            </div>
          </div>

          {/* Popular Universities */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-gaming-gold" />
              Top University Leagues
            </h4>
            <div className="grid gap-3">
              {topUniversities.map((uni) => (
                <div
                  key={uni.code}
                  className="flex items-center justify-between p-3 rounded-lg border border-muted hover:border-gaming-purple/50 hover:bg-gaming-purple/5 transition-all cursor-pointer"
                  onClick={() => handleQuickJoin(uni.code)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-gaming-purple to-gaming-cyan rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">{uni.name}</div>
                      <div className="text-sm text-muted-foreground">Code: {uni.code}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-gaming-cyan" />
                      <span>{uni.members}</span>
                    </div>
                    <Badge className="bg-gaming-gold/20 text-gaming-gold">
                      Avg Lv {uni.avgLevel}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-gradient-to-r from-gaming-purple/10 to-gaming-cyan/10 rounded-lg p-4">
            <h4 className="font-semibold mb-3">League Benefits</h4>
            <div className="grid md:grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-gaming-gold" />
                <span>University rankings</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gaming-cyan" />
                <span>Find study partners</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gaming-purple" />
                <span>Exclusive challenges</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-gaming-green" />
                <span>Campus events</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
