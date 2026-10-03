import { LawProposal, BudgetSector, DiplomaticDispute, TerritoryFlag } from '../types';

export const INITIAL_PROPOSALS: LawProposal[] = [
  {
    id: 'prop-2026-01',
    sessionNumber: 42,
    title: 'Plafonnement des marges agroalimentaires sur 50 produits de première nécessité',
    summary: 'Instauration d’un bouclier alimentaire limitant la marge brute des centrales d’achat à 12% sur les denrées vitales (lait, pâtes, fruits de saison, hygiène) et répercussion obligatoire des baisses de cours.',
    category: 'Pouvoir d\'achat',
    deadline: 'Samedi 20h00',
    daysRemaining: 2,
    image: '/src/assets/images/civic_tuto_explainer_1791001799993.jpg',
    author: 'Commission Mixte Citoyenne & Producteurs Locaux',
    estimatedCost: 'Neutre pour le budget de l\'État (régulation des marges privées)',
    keyPoints: [
      'Liste de 50 références alimentaires et d\'hygiène sanctuarisées.',
      'Transparence totale des marges distributeurs publiée chaque quinzaine en open-data.',
      'Contrôles inopinés de la DGCCRF avec amende automatique de 5% du chiffre d\'affaires en cas de fraude.',
      'Garantie d\'un prix plancher rémunérateur pour les agriculteurs français.'
    ],
    pros: [
      'Baisse immédiate estimée à 48 €/mois par panier familial.',
      'Fin de la "shrinkflation" et des marges abusives de la grande distribution.',
      'Protection des producteurs locaux par des contrats pluriannuels équitables.'
    ],
    cons: [
      'Risque de déréférencement de certaines marques par les centrales d\'achat.',
      'Complexité logistique de suivi pour les petits commerces de quartier.',
      'Certains économistes craignent un gel des investissements dans la filière.'
    ],
    tutorialDuration: '1 min 45 s',
    tutorialVideo: {
      title: 'Comprendre en 1m45 : Le Plafonnement des Marges',
      description: 'Pourquoi les prix en rayon augmentent alors que le cours du blé baisse ? Cette capsule décortique le circuit entre le producteur, la centrale d\'achat et votre ticket de caisse.',
      chapters: [
        { timestamp: '00:00', title: 'Le constat', text: 'En 3 ans, la marge nette des centrales a progressé de 28% sur les produits basiques.' },
        { timestamp: '00:35', title: 'Le mécanisme proposé', text: 'Un plafond de marge à 12% et l\'obligation légale d\'indexer les étiquettes sous 7 jours.' },
        { timestamp: '01:10', title: 'La protection paysanne', text: 'Interdiction formelle de négocier les denrées en-dessous du coût de revient agricole.' }
      ],
      infographicNote: 'Impact mesuré : -11,4% sur le panier moyen dès le premier trimestre d\'application.'
    },
    stats: {
      oui: 68,
      non: 24,
      besoinTuto: 8,
      totalVoters: 184520,
    }
  },
  {
    id: 'prop-2026-02',
    sessionNumber: 42,
    title: 'Obligation de 2 soignants par tranche de 8 patients hospitalisés en chirurgie et médecine',
    summary: 'Fixation d\'un ratio légal contraignant soignant/patient dans tous les hôpitaux publics et cliniques privées sous peine de fermeture de lits administratifs.',
    category: 'Santé',
    deadline: 'Dimanche 23h59',
    daysRemaining: 3,
    image: '/src/assets/images/hero_elysee_citizens_1791001765662.jpg',
    author: 'Collectif Inter-Hôpitaux & Assemblée Citoyenne Permanente',
    estimatedCost: '2,8 milliards d\'€/an (financé par la lutte contre la fraude fiscale)',
    keyPoints: [
      'Ratio contraignant de sécurité : 1 infirmier + 1 aide-soignant pour 8 patients max en hospitalisation complète.',
      'Prime d\'engagement et de pénibilité de 320 € nets/mois pour le personnel de garde.',
      'Droit d\'alerte sanitaire déclenché par les équipes médicales avec arbitrage citoyen sous 48h.'
    ],
    pros: [
      'Diminution démontrée de 14% de la mortalité post-opératoire et des infections nosocomiales.',
      'Arrêt de la fuite des soignants vers le secteur privé ou l\'intérim.',
      'Amélioration humaine de la prise en charge des personnes âgées et vulnérables.'
    ],
    cons: [
      'Nécessite le recrutement ou le rappel de 25 000 professionnels d\'ici 18 mois.',
      'Coût budgétaire élevé nécessitant des arbitrages fiscaux stricts.',
      'Risque de fermeture temporaire de certains services ruraux faute de personnel immédiat.'
    ],
    tutorialDuration: '2 min 10 s',
    tutorialVideo: {
      title: 'Comprendre en 2 min : Le Ratio Soignants/Lits',
      description: 'L\'expérience de la Californie et de l\'Australie montre que légiférer sur le nombre minimal de soignants sauve des vies et réduit les coûts de santé à long terme.',
      chapters: [
        { timestamp: '00:00', title: 'L\'état d\'épuisement', text: 'Actuellement, un infirmier de nuit s\'occupe parfois de 22 patients à la fois.' },
        { timestamp: '00:45', title: 'La norme de sécurité', text: 'Le ratio 2 soignants pour 8 lits garantit une surveillance vitale continue.' },
        { timestamp: '01:30', title: 'Le financement', text: 'Redéploiement des dépenses d\'intérim médical exorbitant vers des postes pérennes.' }
      ],
      infographicNote: 'Norme recommandée par l\'Organisation Mondiale de la Santé depuis 2021.'
    },
    stats: {
      oui: 82,
      non: 12,
      besoinTuto: 6,
      totalVoters: 212890,
    }
  },
  {
    id: 'prop-2026-03',
    sessionNumber: 42,
    title: 'Interdiction des jets privés sur les liaisons intérieures desservies en moins de 3h en TGV',
    summary: 'Interdiction de tout vol d’aviation d’affaires et de jet privé sur les trajets intérieurs français où une alternative ferroviaire directe existe en moins de 3 heures.',
    category: 'Écologie',
    deadline: 'Mardi 18h00',
    daysRemaining: 5,
    image: '/src/assets/images/tax_budget_breakdown_1791001777120.jpg',
    author: 'Convention Citoyenne pour le Climat & Mobilités Propres',
    estimatedCost: 'Gain fiscal net de 180 M€ via la taxe sur le kérosène restant',
    keyPoints: [
      'Interdiction stricte des vols d\'affaires point à point Paris-Lyon, Paris-Bordeaux, Paris-Nantes, etc.',
      'Dérogation exclusive pour les urgences médicales et les transferts d\'organes vitaux.',
      'Surtaxe carbone de 800% sur les décollages de jets pour les liaisons sans alternative directe.'
    ],
    pros: [
      'Économie de 350 000 tonnes d\'émissions de CO2 annuelles superflues.',
      'Justice sociale et exemplarité climatique : 1h de jet privé pollue plus qu\'un citoyen moyen en un an.',
      'Incitation directe des grands groupes à utiliser le rail et la visioconférence.'
    ],
    cons: [
      'Craintes sur l\'attractivité économique de certains sièges internationaux.',
      'Menace de délocalisation des aérodromes d\'affaires vers les pays limitrophes (Genève, Bruxelles).',
      'Impact sur 1 200 emplois de maintenance aéronautique spécialisée.'
    ],
    tutorialDuration: '1 min 30 s',
    tutorialVideo: {
      title: 'Comprendre en 1m30 : Aviation Privée vs Climat',
      description: 'Pourquoi cibler les jets privés ? Analyse des trajectoires carbones, de la faisabilité ferroviaire et des retombées pour la souveraineté écologique.',
      chapters: [
        { timestamp: '00:00', title: 'L\'empreinte démesurée', text: '1% des passagers aériens génèrent plus de la moitié des émissions de l\'aviation privée.' },
        { timestamp: '00:30', title: 'L\'alternative ferroviaire', text: '9 liaisons sur 10 visées ont une desserte en TGV centre-ville à centre-ville.' },
        { timestamp: '01:00', title: 'La justice de l\'effort', text: 'Faire participer les plus fortunés à l\'effort collectif de sobriété.' }
      ],
      infographicNote: '74% des vols privés en France parcourent des distances inférieures à 500 km.'
    },
    stats: {
      oui: 76,
      non: 19,
      besoinTuto: 5,
      totalVoters: 168400,
    }
  },
  {
    id: 'prop-2026-04',
    sessionNumber: 42,
    title: 'Suppression définitive des avantages à vie des anciens présidents et ministres',
    summary: 'Alignement du régime des anciens chefs de l’État et membres du gouvernement sur le régime général de retraite et fin des bureaux, chauffeurs et gardes du corps permanents après 5 ans.',
    category: 'Démocratie',
    deadline: 'Jeudi 20h00',
    daysRemaining: 7,
    image: '/src/assets/images/hero_elysee_citizens_1791001765662.jpg',
    author: 'Collectif Transparence Républicaine',
    estimatedCost: 'Économie annuelle directe de 14,2 millions d\'€',
    keyPoints: [
      'Maintien d\'une protection policière uniquement sur décision motivée et évaluée chaque année par la DGSI.',
      'Fin du bureau de fonction, du secrétariat permanent et de la voiture de fonction 5 ans après la fin du mandat.',
      'Versement d\'une pension calculée au prorata exact des annuités cotisées, sans cumul exorbitant.'
    ],
    pros: [
      'Rétablissement de l\'exemplarité démocratique et suppression des privilèges d\'un autre siècle.',
      'Économie budgétaire nette réallouée à l\'éducation civique dans les lycées.',
      'Rapprochement salutaire entre la classe politique et le quotidien des Français.'
    ],
    cons: [
      'Certains constitutionnalistes soutiennent que le statut international de la France requiert des moyens de représentation permanente.',
      'Risque que les anciens dirigeants se tournent plus vite vers le lobbying privé pour maintenir leur train de vie.'
    ],
    tutorialDuration: '1 min 50 s',
    tutorialVideo: {
      title: 'Comprendre en 1m50 : Les Privilèges Républicains',
      description: 'Que coûte réellement un ancien président ou premier ministre à la République ? Décryptage des décrets de 1985 et de la réalité des dépenses publiques.',
      chapters: [
        { timestamp: '00:00', title: 'Le coût actuel', text: 'Environ 2,5 millions d\'euros par an et par ancien chef d\'État pour secrétaires, bureaux et chauffeurs.' },
        { timestamp: '00:40', title: 'La réforme proposée', text: 'Limitation de ces moyens à 5 ans maximum après la passation de pouvoir.' },
        { timestamp: '01:15', title: 'La sécurité', text: 'La protection physique reste assurée uniquement si une menace réelle subsiste.' }
      ],
      infographicNote: 'La France est l\'un des pays européens accordant le plus d\'avantages matériels à ses anciens dirigeants.'
    },
    stats: {
      oui: 91,
      non: 6,
      besoinTuto: 3,
      totalVoters: 245100,
    }
  }
];

export const INITIAL_BUDGET_SECTORS: BudgetSector[] = [
  {
    id: 'sante',
    name: 'Santé & Hôpital Public',
    iconName: 'HeartPulse',
    color: '#0284c7', // Sky blue
    currentGovPercent: 21,
    nationalCitizenPercent: 27,
    userPercent: 25,
    description: 'Hôpitaux, maternités de proximité, urgences, recherche médicale et prise en charge de la dépendance.',
    concreteImpacts: {
      threshold: 24,
      positive: 'Embauche de 18 000 soignants et réouverture de 45 centres d’urgences en zones rurales.',
      negative: 'Fermeture de lits d\'hospitalisation et délais d\'attente accrus aux urgences.'
    }
  },
  {
    id: 'education',
    name: 'Éducation & Jeunesse',
    iconName: 'GraduationCap',
    color: '#8b5cf6', // Violet
    currentGovPercent: 18,
    nationalCitizenPercent: 22,
    userPercent: 22,
    description: 'Écoles primaires, collèges, lycées, universités, rémunération des enseignants et cantines bio à 1€.',
    concreteImpacts: {
      threshold: 20,
      positive: 'Plafonnement à 18 élèves par classe et 100% des cantines approvisionnées en circuits courts.',
      negative: 'Regroupements de classes et non-remplacement des professeurs absents.'
    }
  },
  {
    id: 'ecologie',
    name: 'Écologie & Transition Énergétique',
    iconName: 'Leaf',
    color: '#10b981', // Emerald
    currentGovPercent: 11,
    nationalCitizenPercent: 18,
    userPercent: 18,
    description: 'Rénovation thermique des passoires énergétiques, trains régionaux, énergies renouvelables et agroécologie.',
    concreteImpacts: {
      threshold: 15,
      positive: 'Rénovation thermique complète de 250 000 logements et réouverture de 800 km de petites lignes ferroviaires.',
      negative: 'Retard sur les objectifs climatiques et hausse des factures d\'énergie des ménages modestes.'
    }
  },
  {
    id: 'securite',
    name: 'Sécurité & Justice',
    iconName: 'Shield',
    color: '#f59e0b', // Amber
    currentGovPercent: 14,
    nationalCitizenPercent: 15,
    userPercent: 15,
    description: 'Police de proximité, gendarmerie, magistrats, greffiers et modernisation des tribunaux.',
    concreteImpacts: {
      threshold: 14,
      positive: 'Réduction du délai moyen de jugement civil de 14 à 4 mois et patrouilles pédestres renforcées.',
      negative: 'Engorgement des cours de justice et manque de moyens matériels pour les enquêteurs.'
    }
  },
  {
    id: 'transports',
    name: 'Transports & Infrastructures',
    iconName: 'Train',
    color: '#06b6d4', // Cyan
    currentGovPercent: 12,
    nationalCitizenPercent: 10,
    userPercent: 10,
    description: 'Réseaux de transports du quotidien, ponts, autoroutes publiques dé-privatisées et pistes cyclables.',
    concreteImpacts: {
      threshold: 11,
      positive: 'Pass ferroviaire illimité à 29 €/mois pour les jeunes et réfection des routes départementales dégradées.',
      negative: 'Ralentissement des investissements dans les transports en commun périurbains.'
    }
  },
  {
    id: 'recherche',
    name: 'Recherche, Culture & Patrimoine',
    iconName: 'Sparkles',
    color: '#ec4899', // Pink
    currentGovPercent: 16,
    nationalCitizenPercent: 6,
    userPercent: 7,
    description: 'CNRS, laboratoires universitaires, musées, création artistique indépendante et patrimoine historique.',
    concreteImpacts: {
      threshold: 6,
      positive: 'Financement de 1 200 thèses scientifiques souveraines et accès gratuit aux monuments nationaux.',
      negative: 'Fuite des cerveaux vers les universités étrangères privées.'
    }
  },
  {
    id: 'institutions',
    name: 'Fonctionnement des Institutions & Élus',
    iconName: 'Building2',
    color: '#ef4444', // Red
    currentGovPercent: 8,
    nationalCitizenPercent: 2,
    userPercent: 3,
    description: 'Dépenses des ministères, assemblées, sénat, parcs automobiles officiels, réceptions et indemnités.',
    concreteImpacts: {
      threshold: 4,
      positive: 'Contrôle drastique des frais de bouche ministériels et suppression des véhicules avec chauffeur superflus.',
      negative: 'Maintien de frais d\'apparat élevés déconnectés des priorités des citoyens.'
    }
  }
];

export const INITIAL_DISPUTES: DiplomaticDispute[] = [
  {
    id: 'disp-01',
    title: 'Guerre de la Coquille St-Jacques & Quotas en Manche',
    stakes: 'Accès des chalutiers français et britanniques aux gisements de la baie de Seine et période de repos biologique.',
    fighterA: {
      id: 'macron',
      name: 'Emmanuel « Le Monarque » M.',
      title: 'Président de la République',
      country: 'France',
      flag: '🇫🇷',
      specialMove: '« En Même Temps » Synaptique (paralyse l’adversaire par une tirade de 42 minutes)',
      quote: '« Qu\'ils viennent me chercher... mais dans les règles du droit maritime européen ! »',
      stats: {
        rhetorique: 92,
        tenacite: 84,
        sangFroid: 78,
        coupBasDiplomatique: 86,
        popularite: 41
      }
    },
    fighterB: {
      id: 'starmer',
      name: 'Sir Keir « Le Procureur » S.',
      title: 'Premier Ministre',
      country: 'Royaume-Uni',
      flag: '🇬🇧',
      specialMove: 'Plaidoirie en Perruque Poudrée (procédurier implacable et flegme britannique)',
      quote: '« We have had enough of your coquilles, let our fishermen harvest peacefully ! »',
      stats: {
        rhetorique: 88,
        tenacite: 89,
        sangFroid: 95,
        coupBasDiplomatique: 70,
        popularite: 52
      }
    },
    status: 'EN_COURS',
    scheduledDate: 'En direct dans l\'Octogone diplomatique',
    disputeDescription: 'Plutôt que d\'envoyer des frégates militaires menacer des marins-pêcheurs au large de Guernesey, les deux dirigeants montent sur le ring diplomatique pour trancher les quotas de coquilles saint-jacques sans une goutte de sang !',
    peacefulConsequence: 'Le vainqueur obtient l\'exclusivité de pêche sur la zone disputée pour la saison 2026-2027 et le perdant doit offrir un banquet de fruits de mer aux marins du camp adverse.',
    rounds: [
      {
        roundNumber: 1,
        roundName: 'Joute Rhétorique & Traités Historiques',
        actionA: 'Emmanuel M. cite le Traité d\'Amiens de 1802 en latin et enchaîne sur la souveraineté biologique du mollusque normand.',
        actionB: 'Sir Keir brandit un dossier de jurisprudence maritime de 1 200 pages sans cligner des yeux.',
        commentary: 'Emmanuel M. prend l’avantage verbal, mais Keir S. encaisse les punchlines avec un flegme insolent !',
        winner: 'A'
      },
      {
        roundNumber: 2,
        roundName: 'Test de Dégustation à l’Aveugle',
        actionA: 'Test gustatif : Reconnaitre une vraie coquille normande poêlée au beurre salé face à du surgelé industriel.',
        actionB: 'Keir S. confond le corail avec du cheddar râpé et grimace.',
        commentary: 'Faute technique culinaire pour le dirigeant britannique ! La foule citoyenne hurle de rire.',
        winner: 'A'
      },
      {
        roundNumber: 3,
        roundName: 'Bras de Fer Diplomatique d’Endurance',
        actionA: 'Emmanuel M. retrousse ses manches de chemise blanche amidonnée et cherche le regard de la caméra.',
        actionB: 'Keir S. use d’un grip juridique impérial et refuse de céder d’un millimètre.',
        commentary: 'Tension maximale sur le ring ! Aucun des deux ne veut céder un centimètre de Manche.',
        winner: 'DRAW'
      },
      {
        roundNumber: 4,
        roundName: 'Arbitrage Populaire Direct des Citoyens',
        actionA: 'Plaidoyer final de 30 secondes pour le respect des réserves marines françaises.',
        actionB: 'Plaidoyer final pour l\'entente cordiale et le partage des eaux territoriales.',
        commentary: 'Le peuple vote en direct sur Democra\'App pour désigner le vainqueur moral du litige !',
        winner: 'A'
      }
    ],
    citizenScoreA: 64,
    citizenScoreB: 36
  },
  {
    id: 'disp-02',
    title: 'Le Litige Éternel du Sommet du Mont-Blanc',
    stakes: 'Délimitation exacte de la frontière alpine au sommet entre la France et l\'Italie (carte de 1860 vs décret sarde).',
    fighterA: {
      id: 'macron',
      name: 'Emmanuel « Le Monarque » M.',
      title: 'Président de la République',
      country: 'France',
      flag: '🇫🇷',
      specialMove: 'Dépôt de gerbe d\'altitude et tirade philosophique sur les cimes',
      quote: '« Le toit de l\'Europe est une idée française autant qu\'un massif alpin ! »',
      stats: {
        rhetorique: 92,
        tenacite: 84,
        sangFroid: 78,
        coupBasDiplomatique: 86,
        popularite: 41
      }
    },
    fighterB: {
      id: 'meloni',
      name: 'Giorgia « La Lupa » M.',
      title: 'Présidente du Conseil',
      country: 'Italie',
      flag: '🇮🇹',
      specialMove: 'Gestuelle Napolitaine Ultrasonique (déconcerte par un torrent d\'éloquence passionnée)',
      quote: '« Monte Bianco appartiene a tutti e due, o forse un po’ di più a noi ! »',
      stats: {
        rhetorique: 94,
        tenacite: 96,
        sangFroid: 62,
        coupBasDiplomatique: 84,
        popularite: 58
      }
    },
    status: 'A_VENIR',
    scheduledDate: 'Samedi prochain 21h00',
    disputeDescription: 'Les cartes IGN françaises placent le sommet en France, les cartes militaires italiennes coupent la calotte en deux. Résolution pacifique directe : combat d\'alpinisme verbal dans l\'Octogone diplomatique !',
    peacefulConsequence: 'Le pays vainqueur héberge le refuge d\'altitude pour 3 ans et choisit le nom officiel sur Google Maps.',
    rounds: [
      {
        roundNumber: 1,
        roundName: 'Épreuve Cartographique au Compas',
        actionA: 'Sortie du traité d\'annexion de la Savoie de 1860.',
        actionB: 'Sortie de la convention de délimitation de 1796 signée par Bonaparte.',
        commentary: 'L\'arbitre indépendant suisse valide les pièces sous les sifflets amicaux.',
        winner: 'B'
      },
      {
        roundNumber: 2,
        roundName: 'Duel de Fondue Savoyarde vs Polenta Valdôtaine',
        actionA: 'Préparation minute avec du Beaufort d\'alpage affiné 18 mois.',
        actionB: 'Polenta fumante au beurre noisette et fontina d\'Aoste.',
        commentary: 'Égalité parfaite sur le plan gustatif, le jury d\'arbitrage est en extase.',
        winner: 'DRAW'
      },
      {
        roundNumber: 3,
        roundName: 'Clash Oratoire à 4 809 mètres d\'altitude',
        actionA: 'Discours sur la grandeur européenne de Chamonix.',
        actionB: 'Discours fougueux sur les pionniers de Courmayeur.',
        commentary: 'Giorgia M. enflamme la salle avec ses intonations percutantes !',
        winner: 'B'
      },
      {
        roundNumber: 4,
        roundName: 'Vote Souverain des Peuples',
        actionA: 'Appel aux internautes francophones.',
        actionB: 'Mobilisation des tifosi alpins.',
        commentary: 'Suspense total sur les serveurs de Democra\'App.',
        winner: 'DRAW'
      }
    ],
    citizenScoreA: 51,
    citizenScoreB: 49
  },
  {
    id: 'disp-03',
    title: 'La Bataille Mondiale de la Baguette & de l\'AOC vs Fast-Food',
    stakes: 'Taxe sur les produits ultra-transformés et protection du label boulangerie artisanale à l\'OMC.',
    fighterA: {
      id: 'macron',
      name: 'Emmanuel « Le Monarque » M.',
      title: 'Président de la République',
      country: 'France',
      flag: '🇫🇷',
      specialMove: 'Dégainage de Baguette Tradition croustillante à la boutonnière',
      quote: '« La croûte dorée ne se négocie pas avec les multinationales du burger mou ! »',
      stats: {
        rhetorique: 92,
        tenacite: 84,
        sangFroid: 78,
        coupBasDiplomatique: 86,
        popularite: 41
      }
    },
    fighterB: {
      id: 'trump',
      name: 'Donald « The Dealmaker » T.',
      title: 'Candidat & Représentant Business',
      country: 'États-Unis',
      flag: '🇺🇸',
      specialMove: 'Post en ALL CAPS à 3h du matin & Menace de Droits de Douane de 200%',
      quote: '« Nobody makes bread like America, but France has good cheese, I make the best deals ! »',
      stats: {
        rhetorique: 79,
        tenacite: 98,
        sangFroid: 45,
        coupBasDiplomatique: 99,
        popularite: 49
      }
    },
    status: 'A_VENIR',
    scheduledDate: 'Match Triennal Spécial',
    disputeDescription: 'Duel d\'influence culturelle et commerciale. Les citoyens votent pour décider si la France impose une taxe de 30% sur les burgers de fast-food américains au profit de nos artisans boulangers.',
    peacefulConsequence: 'Instauration d\'un fonds de soutien aux apprentis boulangers financé par les géants du soda.',
    rounds: [
      {
        roundNumber: 1,
        roundName: 'Débat Nutritionnel Sans Édulcorant',
        actionA: 'Présentation de levain naturel bio centenaire.',
        actionB: 'Distribution de casquettes rouges et de nuggets croustillants.',
        commentary: 'Le contraste de style est saisissant sur le ring !',
        winner: 'A'
      },
      {
        roundNumber: 2,
        roundName: 'Négociation Douanière Éclair',
        actionA: 'Défense du modèle social et gastronomique européen.',
        actionB: 'Menace de taxer le champagne et les sacs de luxe à 150%.',
        commentary: 'Donald T. tente le coup de pression classique en conférence de presse.',
        winner: 'B'
      },
      {
        roundNumber: 3,
        roundName: 'Vote Express Populaire International',
        actionA: 'Ralliement des gourmets de la planète entière.',
        actionB: 'Ralliement des actionnaires de Wall Street.',
        commentary: 'La gastronomie l\'emporte dans le cœur des citoyens votants !',
        winner: 'A'
      }
    ],
    citizenScoreA: 72,
    citizenScoreB: 28
  }
];

export const INITIAL_TERRITORIES: TerritoryFlag[] = [
  {
    id: 'ter-01',
    name: 'Île des Faisans (Bidassoa)',
    zone: 'Frontière Franco-Espagnole',
    currentHolder: 'France',
    holderFlag: '🇫🇷',
    contenders: ['France 🇫🇷', 'Espagne 🇪🇸'],
    triennialMatchYear: 2026,
    symbolicStake: 'Garde alternée tous les 6 mois, remise en jeu par tournoi de pelote basque diplomatique.'
  },
  {
    id: 'ter-02',
    name: 'Banc de Guernesey & Plateaux Coquilliers',
    zone: 'Manche Occidentale',
    currentHolder: 'France',
    holderFlag: '🇫🇷',
    contenders: ['France 🇫🇷', 'Royaume-Uni 🇬🇧'],
    triennialMatchYear: 2027,
    symbolicStake: 'Droit exclusif de pêche artisanale à la drague et étiquetage AOP.'
  },
  {
    id: 'ter-03',
    name: 'Dôme du Goûter / Arête du Mont-Blanc',
    zone: 'Massif Alpin',
    currentHolder: 'Condominium Pacifique',
    holderFlag: '🕊️',
    contenders: ['France 🇫🇷', 'Italie 🇮🇹'],
    triennialMatchYear: 2026,
    symbolicStake: 'Gestion écologique partagée et surveillance des glaciers par un comité citoyen bilingue.'
  },
  {
    id: 'ter-04',
    name: 'Île Clipperton & Zone Économique Exclusive',
    zone: 'Océan Pacifique',
    currentHolder: 'France',
    holderFlag: '🇫🇷',
    contenders: ['France 🇫🇷', 'Mexique 🇲🇽'],
    triennialMatchYear: 2028,
    symbolicStake: 'Sanctuaire marin mondial préservé de toute exploitation pétrolière ou minière.'
  }
];
