
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, Image, Link, Zap, CheckCircle } from 'lucide-react';

type Task = {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  difficulty: 'easy' | 'medium' | 'hard';
};

type TaskSubmissionModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task;
  onSubmit: (taskId: string, submission: any) => void;
};

export function TaskSubmissionModal({ open, onOpenChange, task, onSubmit }: TaskSubmissionModalProps) {
  const [submissionText, setSubmissionText] = useState('');
  const [submissionType, setSubmissionType] = useState<'text' | 'file' | 'link'>('text');
  const [fileUrl, setFileUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!submissionText.trim() && submissionType === 'text') return;
    
    setIsSubmitting(true);
    
    // Mock submission process
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      
      setTimeout(() => {
        onSubmit(task.id, {
          type: submissionType,
          content: submissionText,
          file: fileUrl,
          timestamp: Date.now()
        });
        
        // Reset form
        setSubmissionText('');
        setFileUrl('');
        setSubmitted(false);
        setSubmissionType('text');
      }, 1500);
    }, 1000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Mock file upload - in real app would upload to cloud storage
      setFileUrl(`https://example.com/uploads/${file.name}`);
      setSubmissionText(`Uploaded: ${file.name}`);
    }
  };

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="gaming-card max-w-md">
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-gradient-to-br from-gaming-green to-green-400 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-gaming">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gaming-green">Task Completed!</h3>
            <p className="text-muted-foreground mb-6">
              Great work! Your submission has been recorded and you've earned XP.
            </p>
            <div className="flex items-center justify-center gap-2 text-lg font-bold text-gaming-gold">
              <Zap className="w-5 h-5" />
              <span>+{task.xpReward} XP</span>
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
          <DialogTitle className="text-xl">Submit Your Work</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Task Info */}
          <div className="p-4 bg-gradient-to-r from-gaming-purple/10 to-gaming-cyan/10 rounded-lg">
            <h3 className="font-semibold mb-2">{task.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
            <div className="flex items-center gap-2">
              <Badge className="bg-gaming-green/20 text-gaming-green">
                <Zap className="w-3 h-3 mr-1" />
                {task.xpReward} XP
              </Badge>
              <Badge variant="outline">
                {task.difficulty}
              </Badge>
            </div>
          </div>

          {/* Submission Type Selector */}
          <div>
            <label className="text-sm font-medium mb-3 block">Submission Type</label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={submissionType === 'text' ? 'default' : 'outline'}
                onClick={() => setSubmissionType('text')}
                className="flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Text
              </Button>
              <Button
                variant={submissionType === 'file' ? 'default' : 'outline'}
                onClick={() => setSubmissionType('file')}
                className="flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                File
              </Button>
              <Button
                variant={submissionType === 'link' ? 'default' : 'outline'}
                onClick={() => setSubmissionType('link')}
                className="flex items-center gap-2"
              >
                <Link className="w-4 h-4" />
                Link
              </Button>
            </div>
          </div>

          {/* Submission Content */}
          <div className="space-y-4">
            {submissionType === 'text' && (
              <div>
                <label className="text-sm font-medium mb-2 block">Describe your work</label>
                <Textarea
                  placeholder="Explain what you accomplished, key insights, or results from completing this task..."
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
              </div>
            )}

            {submissionType === 'file' && (
              <div>
                <label className="text-sm font-medium mb-2 block">Upload your work</label>
                <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload screenshots, documents, or other files showing your completed work
                  </p>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept="image/*,.pdf,.doc,.docx,.txt"
                  />
                  <Button
                    onClick={() => document.getElementById('file-upload')?.click()}
                    variant="outline"
                  >
                    Choose File
                  </Button>
                  {fileUrl && (
                    <p className="text-sm text-gaming-green mt-2">✓ File uploaded successfully</p>
                  )}
                </div>
                <Textarea
                  placeholder="Add any additional notes about your submission..."
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  rows={3}
                  className="mt-4 resize-none"
                />
              </div>
            )}

            {submissionType === 'link' && (
              <div>
                <label className="text-sm font-medium mb-2 block">Share your work</label>
                <input
                  type="url"
                  placeholder="https://example.com/your-work"
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  className="w-full p-3 border border-input rounded-md bg-background"
                />
                <Textarea
                  placeholder="Explain what the link contains and how it demonstrates task completion..."
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  rows={4}
                  className="mt-4 resize-none"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={
                isSubmitting || 
                (submissionType === 'text' && !submissionText.trim()) ||
                (submissionType === 'link' && (!fileUrl.trim() || !submissionText.trim()))
              }
              className="btn-gaming"
            >
              {isSubmitting ? 'Submitting...' : 'Submit & Complete Task'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
