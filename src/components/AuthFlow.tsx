
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Mail, Lock, User, GraduationCap } from 'lucide-react';

type AuthFlowProps = {
  onComplete: () => void;
  onBack: () => void;
};

export function AuthFlow({ onComplete, onBack }: AuthFlowProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('signup');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    university: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication - in real app would call API
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-cyan-900/10"></div>
      
      <div className="relative z-10 w-full max-w-md">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="gaming-card p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gaming-purple to-gaming-cyan bg-clip-text text-transparent mb-2">
              {mode === 'login' ? 'Welcome Back!' : 'Join EVOZ'}
            </h1>
            <p className="text-muted-foreground">
              {mode === 'login' 
                ? 'Ready to level up your startup game?' 
                : 'Start your entrepreneurial journey today'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="university">University (Optional)</Label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="university"
                    type="text"
                    placeholder="Enter your university"
                    value={formData.university}
                    onChange={(e) => handleInputChange('university', e.target.value)}
                    className="pl-10"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Join your university league to compete with classmates!
                </p>
              </div>
            )}

            <Button type="submit" className="btn-gaming w-full">
              {mode === 'login' ? 'Login & Start Building' : 'Create Account & Start'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
              <Button
                variant="link"
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="ml-1 p-0 h-auto text-gaming-purple hover:text-gaming-cyan"
              >
                {mode === 'login' ? 'Sign up' : 'Login'}
              </Button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
