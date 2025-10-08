import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { UserMenu } from '@/components/UserMenu';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import biospacelogo from '@/assets/biospace-logo.png';

export default function AstroSelection() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();

  const astros = [
    {
      id: 'earth',
      name: t('astro.earth'),
      description: t('Research from Earth'),
      image: 'https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg'
    },
    {
      id: 'moon',
      name: t('astro.moon'),
      description: t('Research from Moon'),
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg'
    },
    {
      id: 'mars',
      name: t('astro.mars'),
      description: t('Research from Mars'),
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg'
    }
  ];

  return (
    <div className="min-h-screen space-bg py-20 px-6">
      <header className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
        <img 
          src={biospacelogo} 
          alt="BioSpace Explorer Logo" 
          className="h-16 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate(isAuthenticated ? '/astro-selection' : '/')}
        />
        <UserMenu />
      </header>
      
      {/* Back Button */}
      <div className="absolute top-20 left-6 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="glass-effect hover:bg-primary/20"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </div>

      <div className="container mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-4 glow-text">
          {t('astro.title')}
        </h1>
        <p className="text-xl text-center text-muted-foreground mb-20">
          {t('astro.subtitle')}
        </p>

        <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto mb-16">
          {astros.map((astro) => (
            <div
              key={astro.id}
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => navigate(`/research/${astro.id}`)}
            >
              <div className="relative w-64 h-64 mb-6 hover:scale-110 transition-transform duration-500">
                <img
                  src={astro.image}
                  alt={astro.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-4">{astro.name}</h2>
                <p className="text-muted-foreground mb-6 max-w-xs mx-auto">{astro.description}</p>
                <Button 
                  variant="outline" 
                  className="glass-effect border-primary/40 hover:bg-primary/20 px-8"
                >
                  {t('astro.explorePublications')}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mb-8">
          <Button
            onClick={() => navigate('/research/all')}
            variant="outline"
            size="lg"
            className="glass-effect border-primary/50 hover:bg-primary/20 text-lg px-16 py-6 rounded-full"
          >
            {t('astro.viewAll')}
          </Button>
        </div>

        <p className="text-center text-muted-foreground text-sm">
          {t('astro.projectInfo')}
        </p>
      </div>
    </div>
  );
}
