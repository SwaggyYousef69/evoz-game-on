
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MessageCircle, CheckSquare, Zap, Trophy, X } from 'lucide-react';

type HowItWorksModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStartNow: () => void;
};

export function HowItWorksModal({ open, onOpenChange, onStartNow }: HowItWorksModalProps) {
  const steps = [
    {
      icon: MessageCircle,
      title: "Chat with AI",
      description: "Tell our AI about your startup idea - from a simple concept to detailed business plans",
      color: "from-gaming-purple to-purple-600"
    },
    {
      icon: CheckSquare,
      title: "Get Tasks Generated",
      description: "AI automatically breaks down your idea into actionable tasks and milestones",
      color: "from-gaming-cyan to-cyan-600"
    },
    {
      icon: Zap,
      title: "Complete & Submit",
      description: "Upload your work, submit completed tasks, and earn XP for every achievement",
      color: "from-gaming-gold to-yellow-500"
    },
    {
      icon: Trophy,
      title: "Level Up & Compete",
      description: "Watch your avatar evolve, climb leaderboards, and compete with friends",
      color: "from-gaming-green to-green-500"
    }
  ];

  const handleStartNow = () => {
    onOpenChange(false);
    onStartNow();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gaming-card max-w-4xl p-0 overflow-hidden">
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 z-10 hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </Button>

          <div className="bg-gradient-to-br from-gaming-purple/20 to-gaming-cyan/20 p-8 text-center">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gaming-purple to-gaming-cyan bg-clip-text text-transparent">
              How EVOZ Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transform your startup dreams into reality with our gamified productivity system
            </p>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-4 group">
                  <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:animate-pulse-gaming`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-gaming-purple to-gaming-cyan rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gaming-gold/20 to-gaming-green/20 backdrop-blur-sm border border-gaming-gold/30 rounded-full px-6 py-2 mb-6">
                <Zap className="w-4 h-4 text-gaming-gold" />
                <span className="text-sm font-medium">Start earning XP today!</span>
              </div>

              <Button 
                onClick={handleStartNow}
                className="btn-gaming px-8 py-6 text-lg"
              >
                <Trophy className="w-5 h-5 mr-2" />
                Start Your Journey Now
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
