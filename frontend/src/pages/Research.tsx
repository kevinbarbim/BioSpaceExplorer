import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { ArrowLeft, Search, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { InteractivePlanet } from '@/components/InteractivePlanet';
import { UserMenu } from '@/components/UserMenu';
import { useAuth } from '@/contexts/AuthContext';
import biospacelogo from '@/assets/biospace-logo.png';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSearchHistory } from '@/hooks/useSearchHistory';
import { VoiceInputButton } from '@/components/VoiceInputButton';

interface ResearchPoint {
  position: [number, number, number];
  title: string;
  description: string;
}

// Research pins that appear after search on Earth - fixed positions
const getEarthResearchPins = (t: (key: string) => string): ResearchPoint[] => {
  return [
    {
      position: [0.8, -0.6, -1.6], // Movido para perto dos outros
      title: 'Impacto da Microgravidade em Células Humanas',
      description: 'São Paulo, Brasil'
    },
    {
      position: [-0.3, 1.2, -1.5], // Outro lado
      title: 'Adaptação Cardiovascular ao Espaço',
      description: 'Madrid, Espanha'
    },
    {
      position: [1.5, 1.0, -1.2], // Outro lado
      title: 'Radiação Cósmica e DNA',
      description: 'Washington DC, EUA'
    }
  ];
};

const getPlanetData = (t: (key: string) => string): Record<string, { name: string; color: string; image: string }> => ({
  earth: {
    name: t('astro.earth'),
    color: '#4A90E2',
    image: '/textures/earth.jpg'
  },
  moon: {
    name: t('astro.moon'),
    color: '#C4C4C4',
    image: '/textures/moon.jpg'
  },
  mars: {
    name: t('astro.mars'),
    color: '#E27B58',
    image: '/textures/mars.jpg'
  },
  all: {
    name: t('research.allDestinations'),
    color: '#8B5CF6',
    image: '/textures/earth.jpg'
  }
});

export default function Research() {
  const { astroId = 'all' } = useParams();
  const [searchParams] = useSearchParams();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [researchPins, setResearchPins] = useState<ResearchPoint[]>([]);
  const planetData = getPlanetData(t);
  const planet = planetData[astroId] || planetData.all;
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { addSearch } = useSearchHistory(user?.email);

  useEffect(() => {
    const queryFromUrl = searchParams.get('q');
    if (queryFromUrl) {
      setSearchQuery(queryFromUrl);
      if (astroId === 'earth' || astroId === 'moon' || astroId === 'mars') {
        setShowResults(true);
        // Only show pins for Earth
        if (astroId === 'earth') {
          setResearchPins(getEarthResearchPins(t));
        }
      }
    }
  }, [searchParams, astroId, t]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      addSearch(searchQuery, astroId, planet.name);
      if (astroId === 'earth' || astroId === 'moon' || astroId === 'mars') {
        setShowResults(true);
        // Only show pins for Earth
        if (astroId === 'earth') {
          setResearchPins(getEarthResearchPins(t));
        }
      }
    }
  };

  const handleTopicClick = (topic: string) => {
    setSearchQuery(topic);
    if (astroId === 'earth' || astroId === 'moon' || astroId === 'mars') {
      setShowResults(true);
      // Only show pins for Earth
      if (astroId === 'earth') {
        setResearchPins(getEarthResearchPins(t));
      }
    }
    addSearch(topic, astroId, planet.name);
  };

  return (
    <div className="min-h-screen space-bg">
      {/* Header */}
      <header className="absolute top-6 left-6 right-6 flex justify-between items-center z-50">
        <div className="flex items-center gap-6">
          <img 
            src={biospacelogo} 
            alt="BioSpace Explorer Logo" 
            className="h-16 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate(isAuthenticated ? '/astro-selection' : '/')}
          />
          
          {/* Categories Dropdown */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="glass-effect bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  {t('research.categories.title')}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="z-50">
                  <div className="grid gap-3 p-6 w-[800px] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 border border-border">
                    <div className="grid grid-cols-3 gap-4">
                      {/* Category 1 */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm text-primary mb-3">
                          {t('research.categories.physical')}
                        </h4>
                        <div className="space-y-1">
                          <button
                            onClick={() => handleTopicClick(t('research.topics.mechanobiology'))}
                            className="block w-full text-left text-xs p-2 rounded hover:bg-primary/10 transition-colors"
                          >
                            {t('research.topics.mechanobiology')}
                          </button>
                          <button
                            onClick={() => handleTopicClick(t('research.topics.gravitySignal'))}
                            className="block w-full text-left text-xs p-2 rounded hover:bg-primary/10 transition-colors"
                          >
                            {t('research.topics.gravitySignal')}
                          </button>
                          <button
                            onClick={() => handleTopicClick(t('research.topics.cardiovascular'))}
                            className="block w-full text-left text-xs p-2 rounded hover:bg-primary/10 transition-colors"
                          >
                            {t('research.topics.cardiovascular')}
                          </button>
                          <button
                            onClick={() => handleTopicClick(t('research.topics.shearStress'))}
                            className="block w-full text-left text-xs p-2 rounded hover:bg-primary/10 transition-colors"
                          >
                            {t('research.topics.shearStress')}
                          </button>
                          <button
                            onClick={() => handleTopicClick(t('research.topics.hzeRadiation'))}
                            className="block w-full text-left text-xs p-2 rounded hover:bg-primary/10 transition-colors"
                          >
                            {t('research.topics.hzeRadiation')}
                          </button>
                          <button
                            onClick={() => handleTopicClick(t('research.topics.regolith'))}
                            className="block w-full text-left text-xs p-2 rounded hover:bg-primary/10 transition-colors"
                          >
                            {t('research.topics.regolith')}
                          </button>
                          <button
                            onClick={() => handleTopicClick(t('research.topics.mechanicalStress'))}
                            className="block w-full text-left text-xs p-2 rounded hover:bg-primary/10 transition-colors"
                          >
                            {t('research.topics.mechanicalStress')}
                          </button>
                        </div>
                      </div>

                      {/* Category 2 */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm text-primary mb-3">
                          {t('research.categories.radiation')}
                        </h4>
                        <div className="space-y-1">
                          <button
                            onClick={() => handleTopicClick(t('research.topics.microRNA'))}
                            className="block w-full text-left text-xs p-2 rounded hover:bg-primary/10 transition-colors"
                          >
                            {t('research.topics.microRNA')}
                          </button>
                          <button
                            onClick={() => handleTopicClick(t('research.topics.epigenetic'))}
                            className="block w-full text-left text-xs p-2 rounded hover:bg-primary/10 transition-colors"
                          >
                            {t('research.topics.epigenetic')}
                          </button>
                          <button
                            onClick={() => handleTopicClick(t('research.topics.collagenDamage'))}
                            className="block w-full text-left text-xs p-2 rounded hover:bg-primary/10 transition-colors"
                          >
                            {t('research.topics.collagenDamage')}
                          </button>
                          <button
                            onClick={() => handleTopicClick(t('research.topics.oncogenesis'))}
                            className="block w-full text-left text-xs p-2 rounded hover:bg-primary/10 transition-colors"
                          >
                            {t('research.topics.oncogenesis')}
                          </button>
                          <button
                            onClick={() => handleTopicClick(t('research.topics.geneExpression'))}
                            className="block w-full text-left text-xs p-2 rounded hover:bg-primary/10 transition-colors"
                          >
                            {t('research.topics.geneExpression')}
                          </button>
                          <button
                            onClick={() => handleTopicClick(t('research.topics.multiStressors'))}
                            className="block w-full text-left text-xs p-2 rounded hover:bg-primary/10 transition-colors"
                          >
                            {t('research.topics.multiStressors')}
                          </button>
                        </div>
                      </div>

                      {/* Category 3 */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm text-primary mb-3">
                          {t('research.categories.omics')}
                        </h4>
                        <div className="space-y-1">
                          <button
                            onClick={() => handleTopicClick(t('research.topics.lipidMetabolic'))}
                            className="block w-full text-left text-xs p-2 rounded hover:bg-primary/10 transition-colors"
                          >
                            {t('research.topics.lipidMetabolic')}
                          </button>
                          <button
                            onClick={() => handleTopicClick(t('research.topics.immuneResponse'))}
                            className="block w-full text-left text-xs p-2 rounded hover:bg-primary/10 transition-colors"
                          >
                            {t('research.topics.immuneResponse')}
                          </button>
                          <button
                            onClick={() => handleTopicClick(t('research.topics.microbiome'))}
                            className="block w-full text-left text-xs p-2 rounded hover:bg-primary/10 transition-colors"
                          >
                            {t('research.topics.microbiome')}
                          </button>
                          <button
                            onClick={() => handleTopicClick(t('research.topics.biomarkers'))}
                            className="block w-full text-left text-xs p-2 rounded hover:bg-primary/10 transition-colors"
                          >
                            {t('research.topics.biomarkers')}
                          </button>
                          <button
                            onClick={() => handleTopicClick(t('research.topics.extremophiles'))}
                            className="block w-full text-left text-xs p-2 rounded hover:bg-primary/10 transition-colors"
                          >
                            {t('research.topics.extremophiles')}
                          </button>
                          <button
                            onClick={() => handleTopicClick(t('research.topics.reversal'))}
                            className="block w-full text-left text-xs p-2 rounded hover:bg-primary/10 transition-colors"
                          >
                            {t('research.topics.reversal')}
                          </button>
                          <button
                            onClick={() => handleTopicClick(t('research.topics.lymphatic'))}
                            className="block w-full text-left text-xs p-2 rounded hover:bg-primary/10 transition-colors"
                          >
                            {t('research.topics.lymphatic')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
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

      <div className="container mx-auto px-6 pt-32">

      
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 glow-text">
          {t('research.exploreResearch')} {planet.name}
        </h1>
        <p className="text-center text-muted-foreground mb-12">
          {t('research.discoverAdaptation')} {planet.name === t('research.allDestinations') ? t('research.differentEnvironments') : planet.name}
        </p>

        {astroId === 'all' ? (
          /* Only Search Section for "all" */
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="glass-effect p-8 rounded-lg">
              <div className="flex gap-2">
                <Input
                  placeholder={t('research.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="glass-effect flex-1"
                />
                <VoiceInputButton onTranscript={(text) => setSearchQuery(text)} />
                <Button size="icon" className="bg-primary hover:bg-primary/90 shrink-0" onClick={handleSearch}>
                  <Search />
                </Button>
              </div>
            </div>

            <div className="glass-effect p-8 rounded-lg space-y-4">
              <h3 className="text-xl font-semibold">{t('research.featuredResearch')}</h3>
              <div className="space-y-3">
                <div className="p-4 glass-effect rounded cursor-pointer hover:bg-primary/10 transition-colors">
                  <p className="font-medium">{t('research.microgravityEffects')}</p>
                  <p className="text-sm text-muted-foreground">NASA • 2024</p>
                </div>
                <div className="p-4 glass-effect rounded cursor-pointer hover:bg-primary/10 transition-colors">
                  <p className="font-medium">{t('research.extremophiles')}</p>
                  <p className="text-sm text-muted-foreground">NASA • 2023</p>
                </div>
                <div className="p-4 glass-effect rounded cursor-pointer hover:bg-primary/10 transition-colors">
                  <p className="font-medium">{t('research.plantCultivation')}</p>
                  <p className="text-sm text-muted-foreground">NASA • 2024</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Planet Display + Search Section for specific planets */
          <>
            <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
              {/* Planet Display */}
              <div className="relative">
                <InteractivePlanet 
                  textureUrl={planet.image}
                  color={planet.color}
                  researchPoints={researchPins}
                />
              </div>

              {/* Search Section */}
              <div className="space-y-6">
                <div className="glass-effect p-8 rounded-lg">
                  <div className="flex gap-2">
                    <Input
                      placeholder={`${t('research.searchPlaceholderOn')} ${planet.name}...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                      className="glass-effect flex-1"
                    />
                    <VoiceInputButton onTranscript={(text) => setSearchQuery(text)} />
                    <Button size="icon" className="bg-primary hover:bg-primary/90 shrink-0" onClick={handleSearch}>
                      <Search />
                    </Button>
                  </div>
                </div>

                {showResults && (astroId === 'earth' || astroId === 'moon' || astroId === 'mars') && (
                  <>
                    <div className="glass-effect p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-3">{t('research.aiSummary')}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {t('research.microgravitySummary')}
                      </p>
                    </div>

                    {/* Charts Section */}
                    <div className="glass-effect p-8 rounded-lg">
                      <h3 className="text-2xl font-semibold mb-6">{t('research.graphicalAnalysis')}</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Publications Count */}
                        <div className="glass-effect p-4 rounded-lg">
                          <h4 className="text-sm font-medium mb-4 text-center">{t('research.publicationsCount')}</h4>
                          <div className="flex justify-center items-end gap-3 h-40">
                            <div className="flex flex-col items-center">
                              <div className="w-16 bg-primary/80 rounded-t" style={{ height: '60px' }}></div>
                              <span className="text-xs mt-2">{t('research.microgravity')}</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="w-16 bg-primary/60 rounded-t" style={{ height: '90px' }}></div>
                              <span className="text-xs mt-2">{t('research.boneLoss')}</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="w-16 bg-primary rounded-t" style={{ height: '120px' }}></div>
                              <span className="text-xs mt-2">{t('research.boneCells')}</span>
                            </div>
                          </div>
                        </div>

                        {/* Impact Score */}
                        <div className="glass-effect p-4 rounded-lg">
                          <h4 className="text-sm font-medium mb-4 text-center">{t('research.impactScore')}</h4>
                          <div className="flex justify-center items-center h-40">
                            <div className="relative w-32 h-32">
                              <svg className="w-full h-full transform -rotate-90">
                                <circle cx="64" cy="64" r="56" fill="none" stroke="hsl(var(--muted))" strokeWidth="12" />
                                <circle 
                                  cx="64" 
                                  cy="64" 
                                  r="56" 
                                  fill="none" 
                                  stroke="hsl(var(--primary))" 
                                  strokeWidth="12"
                                  strokeDasharray="351.86"
                                  strokeDashoffset="87.96"
                                  strokeLinecap="round"
                                />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-2xl font-bold">8.5</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Applicability */}
                        <div className="glass-effect p-4 rounded-lg">
                          <h4 className="text-sm font-medium mb-4 text-center">{t('research.applicability')}</h4>
                          <div className="flex justify-center items-center h-40">
                            <div className="text-center">
                              <div className="text-4xl font-bold text-primary mb-2">1,5%</div>
                              <div className="text-xs text-muted-foreground">{t('research.applicabilityRate')}</div>
                            </div>
                          </div>
                        </div>

                        {/* Organism Focus */}
                        <div className="glass-effect p-4 rounded-lg">
                          <h4 className="text-sm font-medium mb-4 text-center">{t('research.organismFocus')}</h4>
                          <div className="flex justify-center items-center h-40">
                            <div className="relative w-32 h-32">
                              <svg className="w-full h-full transform -rotate-90">
                                <circle cx="64" cy="64" r="56" fill="none" stroke="hsl(var(--primary))" strokeWidth="12" strokeDasharray="176 176" />
                                <circle cx="64" cy="64" r="56" fill="none" stroke="hsl(var(--secondary))" strokeWidth="12" strokeDasharray="88 264" strokeDashoffset="-176" />
                                <circle cx="64" cy="64" r="56" fill="none" stroke="hsl(var(--accent))" strokeWidth="12" strokeDasharray="88 264" strokeDashoffset="-264" />
                              </svg>
                              <div className="absolute inset-0 flex flex-col items-center justify-center text-xs">
                                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-primary"></div> {t('research.microgravity')}</div>
                                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-secondary"></div> {t('research.boneLoss')}</div>
                                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-accent"></div> {t('research.boneCells')}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Articles Section */}
            {showResults && (astroId === 'earth' || astroId === 'moon' || astroId === 'mars') && (
              <div className="glass-effect p-8 rounded-lg">
                <h3 className="text-2xl font-semibold mb-6">{t('research.relatedArticles')}</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="glass-effect rounded-lg overflow-hidden cursor-pointer hover:bg-primary/10 transition-colors">
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20"></div>
                      <div className="p-4 space-y-2">
                        <p className="font-medium text-sm line-clamp-2">
                          {t('research.microgravityEffects')} - {t('research.study')} {i}
                        </p>
                        <p className="text-xs text-muted-foreground">NASA • 2024</p>
                        <Button variant="outline" size="sm" className="w-full mt-2">
                          {t('research.readArticle')}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
