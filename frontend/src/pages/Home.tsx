import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AuthDialog } from '@/components/AuthDialog';
import { Home, Microscope, Lightbulb, Rocket } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import biospacelogo from '@/assets/biospace-logo.png';

export default function HomePage() {
  const { t } = useLanguage();
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleLogin = () => {
    setAuthMode('login');
    setAuthOpen(true);
  };

  const handleSignup = () => {
    setAuthMode('signup');
    setAuthOpen(true);
  };

  return (
    <div className="min-h-screen space-bg">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <img 
          src={biospacelogo} 
          alt="BioSpace Explorer Logo" 
          className="h-20 cursor-pointer"
        />
        <Button onClick={handleLogin} variant="outline" className="glass-effect border-primary/40 hover:bg-primary/20">
          {t('home.enter')}
        </Button>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 glow-text">
          {t('home.heroTitle')}
        </h1>
        <p className="text-2xl mb-8 text-muted-foreground">
          {t('home.heroSubtitle')}
        </p>
        <Button 
          onClick={handleSignup}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-xl px-12 py-6 rounded-full shadow-lg shadow-primary/50"
        >
          {t('common.search')}
        </Button>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="glass-effect p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Home className="text-primary" />
              {t('home.whatWeDo')}
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>{t('home.aiSynthesis')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>{t('home.graphDiscovery')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>{t('home.visualDashboards')}</span>
              </li>
            </ul>
          </div>

          <div className="glass-effect p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">{t('home.forWhom')}</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="text-secondary mt-1" size={24} />
                <div>
                  <p className="font-semibold">{t('home.missionPlanners')}</p>
                  <p className="text-sm text-muted-foreground">{t('home.missionPlannersDesc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Microscope className="text-secondary mt-1" size={24} />
                <div>
                  <p className="font-semibold">{t('home.scientists')}</p>
                  <p className="text-sm text-muted-foreground">{t('home.scientistsDesc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Rocket className="text-secondary mt-1" size={24} />
                <div>
                  <p className="font-semibold">{t('home.missionArchitects')}</p>
                  <p className="text-sm text-muted-foreground">{t('home.missionArchitectsDesc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} initialMode={authMode} />
    </div>
  );
}
