import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';
import { z } from 'zod';
import biospacelogo from '@/assets/biospace-logo.png';

export default function Profile() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const profileSchema = z.object({
      name: z.string().trim().min(1, t('profile.nameRequired')).max(100, t('profile.nameTooLong')),
      email: z.string().trim().email(t('profile.invalidEmail')).max(255, t('profile.emailTooLong')),
      password: z.string().min(6, t('profile.passwordMinLength')).optional().or(z.literal('')),
    });

    try {
      const validatedData = profileSchema.parse({
        name,
        email,
        password: password || undefined,
      });

      const users = JSON.parse(localStorage.getItem('astro_users') || '[]');
      const userIndex = users.findIndex((u: any) => u.email === user?.email);

      if (userIndex !== -1) {
        users[userIndex] = {
          ...users[userIndex],
          name: validatedData.name,
          email: validatedData.email,
          password: validatedData.password || users[userIndex].password,
        };

        localStorage.setItem('astro_users', JSON.stringify(users));

        const updatedUser = {
          email: validatedData.email,
          name: validatedData.name,
        };
        localStorage.setItem('astro_user', JSON.stringify(updatedUser));

        toast({ title: t('profile.updateSuccess') });

        if (email !== user?.email || password) {
          toast({ 
            title: t('profile.loginAgain'), 
            description: t('profile.loginAgainDesc')
          });
          logout();
          navigate('/');
        } else {
          window.location.reload();
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: t('profile.validationError'),
          description: error.errors[0].message,
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <div className="min-h-screen space-bg py-12 px-6">
      {/* Header */}
      <header className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
        <img 
          src={biospacelogo} 
          alt="BioSpace Explorer Logo" 
          className="h-16 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate(user ? '/astro-selection' : '/')}
        />
      </header>

      {/* Back Button */}
      <div className="absolute top-20 left-6 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="hover:bg-primary/20"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </div>

      <div className="container mx-auto max-w-2xl pt-32">

        <Card className="glass-effect border-primary/20">
          <CardHeader>
            <CardTitle className="text-3xl glow-text">{t('profile.title')}</CardTitle>
            <CardDescription>
              {t('profile.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">{t('auth.name')}</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  maxLength={100}
                  className="glass-effect"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  maxLength={255}
                  className="glass-effect"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t('profile.newPassword')}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('profile.passwordPlaceholder')}
                  minLength={6}
                  className="glass-effect"
                />
                <p className="text-xs text-muted-foreground">
                  {t('profile.passwordHint')}
                </p>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                {t('profile.save')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
