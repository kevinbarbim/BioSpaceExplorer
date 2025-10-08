import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Auth
    'auth.login': 'Login',
    'auth.signup': 'Sign Up',
    'auth.logout': 'Logout',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.name': 'Name',
    'auth.userType': 'User Type',
    'auth.inversionista': 'Investor',
    'auth.cientista': 'Scientist',
    'auth.arquiteto': 'Mission Architect',
    'auth.loginSuccess': 'Login successful!',
    'auth.logoutSuccess': 'Logout successful!',
    'auth.signupSuccess': 'Account created successfully!',
    'auth.invalidCredentials': 'Invalid credentials',
    'auth.emailExists': 'Email already registered',
    
    // Profile
    'profile.title': 'Edit Profile',
    'profile.description': 'Update your account information',
    'profile.newPassword': 'New Password',
    'profile.passwordPlaceholder': 'Leave blank to keep current',
    'profile.passwordHint': 'Minimum 6 characters. Leave blank if you don\'t want to change.',
    'profile.save': 'Save Changes',
    'profile.updateSuccess': 'Profile updated successfully!',
    'profile.loginAgain': 'Please login again',
    'profile.loginAgainDesc': 'Please login with your new credentials',
    'profile.validationError': 'Validation error',
    'profile.nameRequired': 'Name is required',
    'profile.nameTooLong': 'Name too long',
    'profile.invalidEmail': 'Invalid email',
    'profile.emailTooLong': 'Email too long',
    'profile.passwordMinLength': 'Password must be at least 6 characters',
    
    // UserMenu
    'menu.profile': 'Profile',
    'menu.history': 'Search History',
    'menu.language': 'Language',
    
    // Home
    'home.title': 'Explore Worlds',
    'home.subtitle': 'Discover incredible celestial destinations',
    'home.login': 'Login',
    'home.signup': 'Sign Up',
    
    // AstroSelection
    'astro.title': 'Explore NASA Space Biology',
    'astro.subtitle': 'Discover how life reacts in different worlds.',
    'astro.explorePublications': 'Explore publications',
    'astro.projectInfo': 'Project developed for NASA Space Apps Challenge 2025',
    'astro.viewAll': 'VIEW ALL',
    'astro.moon': 'Moon',
    'astro.mars': 'Mars',
    'astro.earth': 'Earth',
    
    // Research
    'research.title': 'Research',
    'research.description': 'Explore scientific discoveries',
    
    // Common
    'common.back': 'Back',
    'common.search': 'Search',
    'common.inDevelopment': 'In development',
    
    // Home Page
    'home.enter': 'Enter',
    'home.heroTitle': 'BIOSPACE EXPLORER',
    'home.heroSubtitle': 'Connecting Research, Organisms, and Missions with Intelligent Insights.',
    'home.whatWeDo': 'What we do?',
    'home.aiSynthesis': 'AI Synthesis: Convert NASA documents into actionable, summarized insights.',
    'home.graphDiscovery': 'Graph Discovery: Visually map hidden relationships between all space biology data.',
    'home.visualDashboards': 'Visual Dashboards: Provide quick, graphical analysis of scientific trends.',
    'home.forWhom': 'WHO IS IT FOR?',
    'home.missionPlanners': 'Mission Planners: Deliver critical biological risk data for Mars/Moon missions.',
    'home.missionPlannersDesc': 'Identify innovations',
    'home.scientists': 'SCIENTISTS:',
    'home.scientistsDesc': 'Explore unprecedented relationships',
    'home.missionArchitects': 'MISSION ARCHITECTS:',
    'home.missionArchitectsDesc': 'Plan with biological insights',
    
    // Auth Dialog
    'auth.forgotPassword': 'Forgot password? Click here',
    'auth.alreadyHaveAccount': 'Already have an account? Login',
    'auth.loginError': 'Error',
    'auth.invalidCredentialsMsg': 'Incorrect email or password',
    'auth.signupSuccessMsg': 'Now login to continue',
    'auth.emailExistsMsg': 'Email already registered',
    
    // Research
    'research.search': 'Search',
    'research.exploreResearch': 'Explore Research on',
    'research.discoverAdaptation': 'Discover how life adapts to',
    'research.differentEnvironments': 'different environments',
    'research.the': 'the',
    'research.searchPlaceholder': 'Search publications, genes, or conditions...',
    'research.searchPlaceholderOn': 'Search publications, genes, or conditions on',
    'research.featuredResearch': 'Featured Research',
    'research.microgravityEffects': 'Effects of Microgravity on Cells',
    'research.microgravityDesc': 'NASA • 2024 - Study on how microgravity affects cell behavior and biological processes.',
    'research.extremophiles': 'Adaptation of Extremophile Organisms',
    'research.extremophilesDesc': 'NASA • 2023 - Research on organisms that survive in extreme conditions similar to space.',
    'research.plantCultivation': 'Plant Cultivation in Space',
    'research.plantCultivationDesc': 'NASA • 2024 - Experiments with growing vegetables in a microgravity environment.',
    'research.allDestinations': 'All Destinations',
    'research.brazil': 'Brazil',
    'research.spain': 'Spain',
    'research.usa': 'USA',
    'research.aiSummary': 'AI-Generated Summary',
    'research.microgravitySummary': 'Research on microgravity effects reveals significant biological adaptations in various organisms. Studies show altered gene expression, cellular structure modifications, and unique metabolic responses when exposed to space environments. These findings have implications for long-duration space missions and potential applications in medicine.',
    'research.graphicalAnalysis': 'Graphical Analysis (AI Insights)',
    'research.publicationsCount': 'Publications by Topic',
    'research.impactScore': 'Publication Impact Score',
    'research.profitability': 'Research Profitability',
    'research.applicability': 'Research Applicability',
    'research.applicabilityRate': 'Field Applicability',
    'research.organismFocus': 'Organism Focus',
    'research.estimatedValue': 'Estimated Research Value',
    'research.microbes': 'Microbes',
    'research.cells': 'Cells',
    'research.plants': 'Plants',
    'research.microgravity': 'Microgravity',
    'research.boneLoss': 'Bone Loss',
    'research.boneCells': 'Bone Cells',
    'research.relatedArticles': 'Related Articles (NASA Publications)',
    'research.study': 'Study',
    'research.readArticle': 'Read Full Article',
    'research.categories.title': 'Categories',
    'research.categories.physical': 'Physical & Structural Forces',
    'research.categories.radiation': 'Radiation & Genetic Changes',
    'research.categories.omics': 'Omics, Microbiology & Systemic Health',
    'research.topics.mechanobiology': 'Mechanobiology in Partial Gravity (Moon and Mars)',
    'research.topics.gravitySignal': 'Gravity Signal Propagation Mechanisms in Plants',
    'research.topics.cardiovascular': 'Cardiovascular Vulnerability to Prolonged Microgravity',
    'research.topics.shearStress': 'Shear Stress Studies and Pathogen Virulence in Habitat',
    'research.topics.hzeRadiation': 'Biological Dose of Heavy Particles Radiation (HZE)',
    'research.topics.regolith': 'Dust Toxicity (Regolith) on Cellular Health',
    'research.topics.mechanicalStress': 'Mechanical Stress Effects on Food Crops',
    'research.topics.microRNA': 'Biological Protection Measures by MicroRNA Antagonists',
    'research.topics.epigenetic': 'Epigenetic Impact of GCR Radiation on DNA and Chromatin',
    'research.topics.collagenDamage': 'Collagen Damage and Mechanical Properties of Post-Radiation Tissues',
    'research.topics.oncogenesis': 'Long-Term Radiation Oncogenesis Risk in Key Organs',
    'research.topics.geneExpression': 'Gene Expression Variation in Response to Microgravity',
    'research.topics.multiStressors': 'Integration of Multiple Stress Variables (Multi-Stressors)',
    'research.topics.lipidMetabolic': 'Lipid and Metabolic Dysregulation (Liver/Muscle)',
    'research.topics.immuneResponse': 'Altered Immune Response and Infection Risk',
    'research.topics.microbiome': 'Habitat Microbiome and Antimicrobial Resistance',
    'research.topics.biomarkers': 'Biomarkers of Frailty and Accelerated Aging',
    'research.topics.extremophiles': 'Adaptation Biology of Extremophile Organisms (Tardigrades)',
    'research.topics.reversal': 'Protocols for Effects Reversal (Return to 1G)',
    'research.topics.lymphatic': 'Physiology Mapping and Lymphatic/Vascular Dysfunctions',
    
    // History
    'history.title': 'Search History',
    'history.subtitle': 'Click on any search to run it again',
    'history.noHistory': 'No search history yet',
    'history.noHistoryDesc': 'Your searches will appear here',
    'history.clear': 'Clear History',
    'history.searchedOn': 'Searched on',
    
    // NotFound
    'notfound.title': '404',
    'notfound.message': 'Oops! Page not found',
    'notfound.returnHome': 'Return to Home',
  },
  pt: {
    // Auth
    'auth.login': 'Entrar',
    'auth.signup': 'Cadastrar',
    'auth.logout': 'Sair',
    'auth.email': 'Email',
    'auth.password': 'Senha',
    'auth.name': 'Nome',
    'auth.userType': 'Tipo de Usuário',
    'auth.inversionista': 'Inversionista',
    'auth.cientista': 'Cientista',
    'auth.arquiteto': 'Arquiteto de Missão',
    'auth.loginSuccess': 'Login realizado com sucesso!',
    'auth.logoutSuccess': 'Logout realizado com sucesso!',
    'auth.signupSuccess': 'Conta criada com sucesso!',
    'auth.invalidCredentials': 'Credenciais inválidas',
    'auth.emailExists': 'Email já cadastrado',
    
    // Profile
    'profile.title': 'Editar Perfil',
    'profile.description': 'Atualize suas informações de conta',
    'profile.newPassword': 'Nova Senha',
    'profile.passwordPlaceholder': 'Deixe em branco para manter a atual',
    'profile.passwordHint': 'Mínimo de 6 caracteres. Deixe em branco se não quiser alterar.',
    'profile.save': 'Salvar Alterações',
    'profile.updateSuccess': 'Perfil atualizado com sucesso!',
    'profile.loginAgain': 'Faça login novamente',
    'profile.loginAgainDesc': 'Por favor, faça login com suas novas credenciais',
    'profile.validationError': 'Erro de validação',
    'profile.nameRequired': 'Nome é obrigatório',
    'profile.nameTooLong': 'Nome muito longo',
    'profile.invalidEmail': 'Email inválido',
    'profile.emailTooLong': 'Email muito longo',
    'profile.passwordMinLength': 'Senha deve ter no mínimo 6 caracteres',
    
    // UserMenu
    'menu.profile': 'Perfil',
    'menu.history': 'Histórico de Pesquisas',
    'menu.language': 'Idioma',
    
    // Home
    'home.title': 'Explore Mundos',
    'home.subtitle': 'Descubra destinos celestiais incríveis',
    'home.login': 'Entrar',
    'home.signup': 'Cadastrar',
    
    // AstroSelection
    'astro.title': 'Explore a Biologia Espacial da NASA',
    'astro.subtitle': 'Descubra como a vida reage em diferentes mundos.',
    'astro.explorePublications': 'Explorar publicações',
    'astro.projectInfo': 'Projeto desenvolvido para o NASA Space Apps Challenge 2025',
    'astro.viewAll': 'VER TUDO',
    'astro.moon': 'Lua',
    'astro.mars': 'Marte',
    'astro.earth': 'Terra',
    
    // Research
    'research.title': 'Pesquisa',
    'research.description': 'Explore descobertas científicas',
    
    // Common
    'common.back': 'Voltar',
    'common.search': 'Pesquisar',
    'common.inDevelopment': 'Em desenvolvimento',
    
    // Home Page
    'home.enter': 'Entrar',
    'home.heroTitle': 'BIOSPACE EXPLORER',
    'home.heroSubtitle': 'Conectando Pesquisas, Organismos e Missões com Insights Inteligentes.',
    'home.whatWeDo': 'O que fazemos?',
    'home.aiSynthesis': 'Síntese IA: Converter documentos da NASA em insights acionáveis e resumidos.',
    'home.graphDiscovery': 'Descoberta em Grafo: Mapear visualmente relações ocultas entre todos os dados de biologia espacial.',
    'home.visualDashboards': 'Painéis Visuais: Fornecer análise gráfica rápida de tendências científicas.',
    'home.forWhom': 'PARA QUEM SERVE?',
    'home.missionPlanners': 'Planejadores de Missão: Fornecer dados críticos de risco biológico para missões em Marte/Lua.',
    'home.missionPlannersDesc': 'Identifique inovações',
    'home.scientists': 'CIENTISTAS:',
    'home.scientistsDesc': 'Explore relações inéditas',
    'home.missionArchitects': 'ARQUITETOS DE MISSÃO:',
    'home.missionArchitectsDesc': 'Planeje com insights biológicas',
    
    // Auth Dialog
    'auth.forgotPassword': 'Esqueceu a senha? Clique aqui',
    'auth.alreadyHaveAccount': 'Já tem conta? Faça login',
    'auth.loginError': 'Erro',
    'auth.invalidCredentialsMsg': 'Email ou senha incorretos',
    'auth.signupSuccessMsg': 'Agora faça login para continuar',
    'auth.emailExistsMsg': 'Email já cadastrado',
    
    // Research
    'research.search': 'Pesquisar',
    'research.exploreResearch': 'Explore Pesquisas em',
    'research.discoverAdaptation': 'Descubra como a vida se adapta a',
    'research.differentEnvironments': 'diferentes ambientes',
    'research.the': '',
    'research.searchPlaceholder': 'Busque publicações, genes ou condições...',
    'research.searchPlaceholderOn': 'Busque publicações, genes ou condições em',
    'research.featuredResearch': 'Pesquisas em Destaque',
    'research.microgravityEffects': 'Efeitos da Microgravidade em Células',
    'research.microgravityDesc': 'NASA • 2024 - Estudo sobre como a microgravidade afeta o comportamento celular e processos biológicos.',
    'research.extremophiles': 'Adaptação de Organismos Extremófilos',
    'research.extremophilesDesc': 'NASA • 2023 - Pesquisa sobre organismos que sobrevivem em condições extremas similares ao espaço.',
    'research.plantCultivation': 'Cultivo de Plantas no Espaço',
    'research.plantCultivationDesc': 'NASA • 2024 - Experimentos com cultivo de vegetais em ambiente de microgravidade.',
    'research.allDestinations': 'Todos os Astros',
    'research.brazil': 'Brasil',
    'research.spain': 'Espanha',
    'research.usa': 'EUA',
    'research.aiSummary': 'Resumo Gerado por IA',
    'research.microgravitySummary': 'A pesquisa sobre efeitos da microgravidade revela adaptações biológicas significativas em vários organismos. Estudos mostram alterações na expressão gênica, modificações na estrutura celular e respostas metabólicas únicas quando expostos a ambientes espaciais. Essas descobertas têm implicações para missões espaciais de longa duração e potenciais aplicações na medicina.',
    'research.graphicalAnalysis': 'Análises Gráficas (Insights de IA)',
    'research.publicationsCount': 'Publicações por Tópico',
    'research.impactScore': 'Nível de Impacto da Publicação',
    'research.profitability': 'Rentabilidade da Pesquisa',
    'research.applicability': 'Aplicabilidade da Pesquisa',
    'research.applicabilityRate': 'Aplicabilidade do Campo',
    'research.organismFocus': 'Foco em Organismo',
    'research.estimatedValue': 'Valor Estimado da Pesquisa',
    'research.microbes': 'Micróbios',
    'research.cells': 'Células',
    'research.plants': 'Plantas',
    'research.microgravity': 'Microgravidade',
    'research.boneLoss': 'Perda Óssea',
    'research.boneCells': 'Células Ósseas',
    'research.relatedArticles': 'Artigos Relacionados (Publicações NASA)',
    'research.study': 'Estudo',
    'research.readArticle': 'Ler Artigo Completo',
    'research.categories.title': 'Categorias',
    'research.categories.physical': 'Forças Físicas e Estruturais',
    'research.categories.radiation': 'Radiação e Alterações Genéticas',
    'research.categories.omics': 'Omics, Microbiologia e Saúde Sistêmica',
    'research.topics.mechanobiology': 'Mecanobiologia em Gravidade Parcial (Lua e Marte)',
    'research.topics.gravitySignal': 'Mecanismos de Propagação do Sinal de Gravidade em Plantas',
    'research.topics.cardiovascular': 'Vulnerabilidade Cardiovascular à Microgravidade Prolongada',
    'research.topics.shearStress': 'Estudos de Shear Stress e Virulência de Patógenos em Habitat',
    'research.topics.hzeRadiation': 'Dose Biológica de Radiação de Partículas Pesadas (HZE)',
    'research.topics.regolith': 'Toxicidade do Pó (Regolito) na Saúde Celular',
    'research.topics.mechanicalStress': 'Efeitos do Estresse Mecânico em Cultivos de Alimentos',
    'research.topics.microRNA': 'Medidas de Proteção Biológica por Antagonistas de MicroRNA',
    'research.topics.epigenetic': 'Impacto Epigenético da Radiação GCR no DNA e Cromatina',
    'research.topics.collagenDamage': 'Dano Colágeno e Propriedades Mecânicas de Tecidos Pós-Radiação',
    'research.topics.oncogenesis': 'Risco de Oncogênese em Órgãos-Chave por Radiação de Longo Prazo',
    'research.topics.geneExpression': 'Variação da Expressão Gênica em Resposta à Microgravidade',
    'research.topics.multiStressors': 'Integração de Múltiplas Variáveis de Estresse (Multi-Stressors)',
    'research.topics.lipidMetabolic': 'Disregulação Lipídica e Metabólica (Fígado/Músculo)',
    'research.topics.immuneResponse': 'Resposta Imune Alterada e Risco de Infecção',
    'research.topics.microbiome': 'Microbioma do Habitat e Resistência a Antimicrobianos',
    'research.topics.biomarkers': 'Biomarcadores de Fragilidade e Envelhecimento Acelerado',
    'research.topics.extremophiles': 'Biologia da Adaptação de Organismos Extremofilos (Tardígrados)',
    'research.topics.reversal': 'Protocolos para Reversão de Efeitos (Retorno à 1G)',
    'research.topics.lymphatic': 'Mapeamento de Fisiologia e Disfunções Linfáticas/Vasculares',
    
    // History
    'history.title': 'Histórico de Pesquisas',
    'history.subtitle': 'Clique em qualquer pesquisa para executá-la novamente',
    'history.noHistory': 'Nenhum histórico de pesquisa ainda',
    'history.noHistoryDesc': 'Suas pesquisas aparecerão aqui',
    'history.clear': 'Limpar Histórico',
    'history.searchedOn': 'Pesquisado em',
    
    // NotFound
    'notfound.title': '404',
    'notfound.message': 'Ops! Página não encontrada',
    'notfound.returnHome': 'Voltar para Início',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('astro_language') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'pt')) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('astro_language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
