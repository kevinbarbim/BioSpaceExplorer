import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search, Trash2 } from 'lucide-react';
import { UserMenu } from '@/components/UserMenu';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSearchHistory } from '@/hooks/useSearchHistory';
import { format } from 'date-fns';
import { enUS, ptBR } from 'date-fns/locale';
import biospacelogo from '@/assets/biospace-logo.png';

export default function History() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { t, language } = useLanguage();
  const { history, clearHistory } = useSearchHistory(user?.email);

  const handleSearchClick = (astroId: string, query: string) => {
    navigate(`/research/${astroId}?q=${encodeURIComponent(query)}`);
  };

  const locale = language === 'pt' ? ptBR : enUS;

  return (
    <div className="min-h-screen space-bg">
      {/* Header */}
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
          className="hover:bg-primary/20"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </div>

      <div className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl md:text-5xl font-bold glow-text">
              {t('history.title')}
            </h1>
            {history.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearHistory}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {t('history.clear')}
              </Button>
            )}
          </div>
          
          <p className="text-muted-foreground mb-12">
            {t('history.subtitle')}
          </p>

          {history.length === 0 ? (
            <div className="glass-effect p-12 rounded-lg text-center">
              <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-xl font-semibold mb-2">{t('history.noHistory')}</h3>
              <p className="text-muted-foreground">{t('history.noHistoryDesc')}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSearchClick(item.astroId, item.query)}
                  className="glass-effect p-6 rounded-lg cursor-pointer hover:bg-primary/10 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Search className="h-4 w-4 text-primary shrink-0" />
                        <p className="font-medium text-lg truncate">{item.query}</p>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="px-2 py-1 bg-primary/20 rounded text-xs font-medium">
                          {item.planetName}
                        </span>
                        <span>
                          {t('history.searchedOn')} {format(item.timestamp, 'PPp', { locale })}
                        </span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSearchClick(item.astroId, item.query);
                      }}
                    >
                      {t('research.search')}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
