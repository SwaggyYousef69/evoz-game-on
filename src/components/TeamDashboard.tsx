
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, Plus, Crown, Star, Zap, Trophy, Copy, UserPlus } from 'lucide-react';
import { UniversityLeagueModal } from '@/components/UniversityLeagueModal';

type TeamMember = {
  id: string;
  name: string;
  level: number;
  xp: number;
  role: string;
  avatar: string;
  isOnline: boolean;
};

type Team = {
  id: string;
  name: string;
  members: TeamMember[];
  totalXP: number;
  inviteCode: string;
  university?: string;
};

export function TeamDashboard() {
  const [currentTeam, setCurrentTeam] = useState<Team | null>({
    id: '1',
    name: 'Stanford Innovators',
    inviteCode: 'STAN2024',
    university: 'Stanford University',
    totalXP: 1850,
    members: [
      { id: '1', name: 'Alex Chen', level: 8, xp: 750, role: 'Team Lead', avatar: '👨‍💻', isOnline: true },
      { id: '2', name: 'Sarah Kim', level: 6, xp: 550, role: 'Developer', avatar: '👩‍💼', isOnline: true },
      { id: '3', name: 'Mike Johnson', level: 5, xp: 450, role: 'Designer', avatar: '👨‍🎨', isOnline: false },
      { id: '4', name: 'Emma Davis', level: 3, xp: 250, role: 'Marketing', avatar: '👩‍🚀', isOnline: true },
    ]
  });

  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [showJoinTeam, setShowJoinTeam] = useState(false);
  const [showUniversityModal, setShowUniversityModal] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [joinCode, setJoinCode] = useState('');

  const handleCreateTeam = () => {
    if (!newTeamName.trim()) return;
    
    // Mock team creation
    const newTeam: Team = {
      id: Date.now().toString(),
      name: newTeamName,
      inviteCode: generateInviteCode(),
      totalXP: 0,
      members: [
        { id: 'me', name: 'You', level: 5, xp: 450, role: 'Team Lead', avatar: '👤', isOnline: true }
      ]
    };
    
    setCurrentTeam(newTeam);
    setShowCreateTeam(false);
    setNewTeamName('');
  };

  const handleJoinTeam = () => {
    if (!joinCode.trim()) return;
    
    // Mock team joining
    const mockTeam: Team = {
      id: '2',
      name: 'MIT Makers',
      inviteCode: joinCode,
      university: 'MIT',
      totalXP: 2340,
      members: [
        { id: '1', name: 'John Smith', level: 12, xp: 1200, role: 'Team Lead', avatar: '👨‍💻', isOnline: true },
        { id: '2', name: 'Lisa Wang', level: 9, xp: 890, role: 'CTO', avatar: '👩‍💻', isOnline: false },
        { id: 'me', name: 'You', level: 5, xp: 450, role: 'Member', avatar: '👤', isOnline: true },
      ]
    };
    
    setCurrentTeam(mockTeam);
    setShowJoinTeam(false);
    setJoinCode('');
  };

  const generateInviteCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const copyInviteCode = () => {
    if (currentTeam?.inviteCode) {
      navigator.clipboard.writeText(currentTeam.inviteCode);
    }
  };

  if (!currentTeam) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Team Up & Build Together</h1>
          <p className="text-muted-foreground">Join forces with other entrepreneurs to build amazing startups</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <Card className="gaming-card p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-gaming-purple to-gaming-cyan rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Plus className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Create a Team</h3>
            <p className="text-muted-foreground mb-6">Start your own startup team and invite friends to join your journey</p>
            
            <Dialog open={showCreateTeam} onOpenChange={setShowCreateTeam}>
              <DialogTrigger asChild>
                <Button className="btn-gaming w-full">Create Team</Button>
              </DialogTrigger>
              <DialogContent className="gaming-card">
                <DialogHeader>
                  <DialogTitle>Create Your Startup Team</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Team Name</label>
                    <Input
                      placeholder="Enter team name"
                      value={newTeamName}
                      onChange={(e) => setNewTeamName(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleCreateTeam} className="btn-gaming w-full">
                    Create Team
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </Card>

          <Card className="gaming-card p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-gaming-cyan to-gaming-green rounded-2xl flex items-center justify-center mx-auto mb-6">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Join a Team</h3>
            <p className="text-muted-foreground mb-6">Have an invite code? Join an existing team and start collaborating</p>
            
            <Dialog open={showJoinTeam} onOpenChange={setShowJoinTeam}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full border-gaming-cyan/30 hover:bg-gaming-cyan/10">
                  Join Team
                </Button>
              </DialogTrigger>
              <DialogContent className="gaming-card">
                <DialogHeader>
                  <DialogTitle>Join a Startup Team</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Team Invite Code</label>
                    <Input
                      placeholder="Enter invite code"
                      value={joinCode}
                      onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                    />
                  </div>
                  <Button onClick={handleJoinTeam} className="btn-gaming w-full">
                    Join Team
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Button
            onClick={() => setShowUniversityModal(true)}
            variant="outline"
            className="border-gaming-gold/30 hover:bg-gaming-gold/10"
          >
            🎓 Join University League
          </Button>
        </div>

        <UniversityLeagueModal 
          open={showUniversityModal} 
          onOpenChange={setShowUniversityModal}
          onJoin={() => setShowUniversityModal(false)}
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">{currentTeam.name}</h1>
          <div className="flex items-center gap-4">
            <Badge className="bg-gaming-purple/20 text-gaming-purple">
              {currentTeam.members.length} Members
            </Badge>
            {currentTeam.university && (
              <Badge className="bg-gaming-gold/20 text-gaming-gold">
                🎓 {currentTeam.university}
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            onClick={copyInviteCode}
            variant="outline"
            className="border-gaming-cyan/30 hover:bg-gaming-cyan/10"
          >
            <Copy className="w-4 h-4 mr-2" />
            {currentTeam.inviteCode}
          </Button>
          <Button
            onClick={() => setCurrentTeam(null)}
            variant="outline"
            className="text-red-400 border-red-400/30 hover:bg-red-400/10"
          >
            Leave Team
          </Button>
        </div>
      </div>

      {/* Team Stats */}
      <Card className="gaming-card p-6">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gaming-purple mb-2">{currentTeam.totalXP}</div>
            <div className="text-sm text-muted-foreground">Total Team XP</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gaming-gold mb-2">{currentTeam.members.length}</div>
            <div className="text-sm text-muted-foreground">Active Members</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gaming-green mb-2">
              {Math.round(currentTeam.totalXP / currentTeam.members.length)}
            </div>
            <div className="text-sm text-muted-foreground">Avg Level</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gaming-cyan mb-2">
              {currentTeam.members.filter(m => m.isOnline).length}
            </div>
            <div className="text-sm text-muted-foreground">Online Now</div>
          </div>
        </div>
      </Card>

      {/* Team Members */}
      <Card className="gaming-card p-6">
        <h3 className="text-xl font-semibold mb-6">Team Members</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          {currentTeam.members.map((member) => (
            <Card key={member.id} className="p-4 bg-gradient-to-r from-muted/50 to-transparent">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-gaming-purple to-gaming-cyan rounded-full flex items-center justify-center text-xl">
                    {member.avatar}
                  </div>
                  {member.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gaming-green rounded-full border-2 border-background"></div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{member.name}</span>
                    {member.role === 'Team Lead' && (
                      <Crown className="w-4 h-4 text-gaming-gold" />
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">{member.role}</div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-gaming-gold" />
                      <span>Level {member.level}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="w-3 h-3 text-gaming-green" />
                      <span>{member.xp} XP</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Team Leaderboard */}
      <Card className="gaming-card p-6">
        <h3 className="text-xl font-semibold mb-6">Team Leaderboard</h3>
        
        <div className="space-y-3">
          {currentTeam.members
            .sort((a, b) => b.xp - a.xp)
            .map((member, index) => (
              <div key={member.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  index === 0 ? 'bg-gaming-gold text-black' :
                  index === 1 ? 'bg-gray-400 text-black' :
                  index === 2 ? 'bg-amber-600 text-white' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {index + 1}
                </div>
                
                <div className="text-xl">{member.avatar}</div>
                
                <div className="flex-1">
                  <div className="font-semibold">{member.name}</div>
                  <div className="text-sm text-muted-foreground">{member.role}</div>
                </div>
                
                <div className="text-right">
                  <div className="font-bold text-gaming-green">{member.xp} XP</div>
                  <div className="text-sm text-muted-foreground">Level {member.level}</div>
                </div>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
}
