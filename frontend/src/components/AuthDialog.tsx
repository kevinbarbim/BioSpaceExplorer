import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialMode?: 'login' | 'signup';
}

export const AuthDialog = ({ open, onOpenChange, initialMode = 'login' }: AuthDialogProps) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { login, signup } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'login') {
      const success = await login(email, password);
      if (success) {
        toast({ title: t('auth.loginSuccess') });
        onOpenChange(false);
        navigate('/astro-selection');
      } else {
        toast({ title: t('auth.loginError'), description: t('auth.invalidCredentialsMsg'), variant: 'destructive' });
      }
    } else {
      const success = await signup(email, password, name);
      if (success) {
        toast({ title: t('auth.signupSuccess'), description: t('auth.signupSuccessMsg') });
        setMode('login');
        setPassword('');
      } else {
        toast({ title: t('auth.loginError'), description: t('auth.emailExistsMsg'), variant: 'destructive' });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-effect border-primary/20 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center glow-text">
            {mode === 'login' ? t('auth.login').toUpperCase() : t('auth.signup').toUpperCase()}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {mode === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="name">{t('auth.name')}</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="glass-effect"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">{t('auth.email')}</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="glass-effect"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t('auth.password')}</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="glass-effect"
            />
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-xl py-6">
            {mode === 'login' ? t('auth.login').toUpperCase() : t('auth.signup').toUpperCase()}
          </Button>
          <div className="text-center space-y-2">
            {mode === 'login' ? (
              <>
                <button
                  type="button"
                  onClick={() => toast({ title: t('common.inDevelopment') })}
                  className="text-sm text-primary hover:underline block mx-auto"
                >
                  {t('auth.forgotPassword')}
                </button>
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="text-sm text-primary hover:underline block mx-auto glow-text"
                >
                  {t('auth.signup').toUpperCase()}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-sm text-primary hover:underline block mx-auto"
              >
                {t('auth.alreadyHaveAccount')}
              </button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
