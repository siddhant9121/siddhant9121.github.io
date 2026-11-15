import {
  BarChart3,
  Building2,
  Calculator,
  FileSearch,
  FileText,
  Landmark,
  ShieldAlert,
  Table2,
  type LucideIcon,
} from 'lucide-react';

/* ---------- Expertise ---------- */

export type SkillStatus = 'applied' | 'learning';

export interface Expertise {
  title: string;
  description: string;
  status: SkillStatus;
  icon: LucideIcon;
}

export const expertise: Expertise[] = [
  {
    title: 'Financial Modelling',
    description: 'Linking the income statement, balance sheet and cash flow into one working model.',
    status: 'learning',
    icon: Table2,
  },
  {
    title: 'DCF Valuation',
    description: 'Forecasting free cash flow, estimating a discount rate and testing what drives the value.',
    status: 'learning',
    icon: Calculator,
  },
  {
    title: 'Equity Research',
    description: 'Forming a view on a company from its filings, its industry and its numbers.',
    status: 'learning',
    icon: FileSearch,
  },
  {
    title: 'Financial Statement Analysis',
    description: 'Reading margins, returns, leverage and cash conversion to see how a business really performs.',
    status: 'learning',
    icon: FileText,
  },
  {
    title: 'Corporate Finance',
    description: 'Capital structure, cost of capital and how companies decide where to invest.',
    status: 'learning',
    icon: Building2,
  },
  {
    title: 'Risk Analysis',
    description: 'Transaction monitoring for money laundering and market risk measured through asymmetric betas.',
    status: 'applied',
    icon: ShieldAlert,
  },
  {
    title: 'Financial Data Analytics',
    description: 'Python, SQL and machine learning applied to market prices and transaction data.',
    status: 'applied',
    icon: BarChart3,
  },
  {
    title: 'Capital Markets',
    description: 'How equities are priced and traded, studied alongside my asset pricing project.',
    status: 'learning',
    icon: Landmark,
  },
];

/* ---------- Projects ---------- */

export interface ProjectResult {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  index: string;
  name: string;
  category: string;
  period: string;
  overview: string;
  problem: string;
  methodology: string[];
  technologies: string[];
  /* Leave empty when there is nothing verified to report */
  results: ProjectResult[];
  resultsNote?: string;
  repo: string;
  /* true while the write-up still contains placeholders */
  pending?: boolean;
}

export const projects: Project[] = [
  {
    id: 'dualbeta',
    index: '01',
    name: 'DualBeta',
    category: 'Asset pricing research',
    period: 'April to June 2026',
    overview:
      'An implementation of the dichotomous asset pricing model (Zou, 2005), which estimates separate betas for rising and falling markets.',
    problem:
      'CAPM describes a stock’s sensitivity to the market with one beta. When a stock falls harder in down markets than it rises in up markets, that single number hides the asymmetry an investor most needs to see.',
    methodology: [
      'Estimated upper-market and lower-market betas for each stock and compared them with the single CAPM beta.',
      'Validated the estimates against synthetic data with known betas, then against real market data.',
      'Tested the difference in pricing error with a Wilcoxon signed-rank test across a 31-stock universe.',
      'Built a screening and backtesting engine that ranks stocks by beta asymmetry, served through FastAPI with a PySide6 desktop client.',
    ],
    technologies: ['Python', 'NumPy', 'SciPy', 'FastAPI', 'PySide6', 'yfinance'],
    results: [
      { value: '43.9%', label: 'lower pricing error than classical CAPM' },
      { value: 'p = 0.0059', label: 'Wilcoxon signed-rank test, 31 stocks' },
      { value: '0.71', label: 'Sharpe ratio, long-short backtest, 2021 to 2024' },
      { value: '11.7%', label: 'annualised return over the same backtest' },
    ],
    resultsNote: 'Backtest figures are historical and say nothing about future returns.',
    repo: 'https://github.com/siddhant9121/DualBeta',
  },
  {
    id: 'sentinelaml',
    index: '02',
    name: 'SentinelAML',
    category: 'Anti-money laundering transaction flagging',
    period: 'January to March 2026',
    overview:
      'A transaction monitoring system that flags suspected money laundering and terrorism financing and drafts the reports a compliance team would file.',
    problem:
      'Laundering makes up about 0.1% of transactions in the dataset. A model that simply maximises accuracy misses almost all of it, so the system has to be built around recall on a very rare class.',
    methodology: [
      'Worked on IBM’s synthetic dataset of more than five million transactions.',
      'Engineered features from FATF typologies: cross-currency detection, round-amount flagging and transaction velocity.',
      'Trained a random forest with SMOTE oversampling and an optimised decision threshold.',
      'Generated suspicious transaction reports graded high, medium or low, aligned to the FATF Recommendations and the PMLA 2002.',
      'Built a Plotly dashboard showing severity, flagged banks, payment-method risk and the transaction timeline.',
    ],
    technologies: ['Python', 'scikit-learn', 'pandas', 'SMOTE', 'Plotly'],
    results: [
      { value: '77%', label: 'recall at a 0.1% laundering rate' },
      { value: '5M+', label: 'transactions scored' },
      { value: '24,994', label: 'high-risk alerts surfaced' },
    ],
    resultsNote: 'Measured on synthetic data, not on live bank transactions.',
    repo: 'https://github.com/siddhant9121/SentinelAML',
  },
  {
    id: 'banking-docs',
    index: '03',
    name: 'Banking Document Processing',
    category: 'Document processing and information extraction',
    period: 'July 2026 to present',
    overview:
      'A system that reads banking and KYC documents and extracts the fields a reviewer would otherwise enter by hand.',
    problem:
      'Onboarding and compliance teams retype information from scanned documents. The work is slow and error-prone, and any model that replaces it has to be reproducible and open to correction.',
    methodology: [
      'OCR converts scanned pages into text.',
      'A classifier sorts each document by type.',
      'A BERT-based model extracts the named fields.',
      'Reviewer corrections feed back into training.',
      'Experiment tracking, model versioning, CI/CD and containerised deployment surround the pipeline.',
    ],
    technologies: ['Python', 'BERT', 'MLflow', 'DVC', 'Jenkins', 'GitHub Actions', 'FastAPI', 'Docker'],
    results: [],
    resultsNote: 'In development. Evaluation results will be added here once they are measured.',
    repo: 'https://github.com/siddhant9121/Banking-MLOPS',
  },
  {
    id: 'briefly',
    index: '04',
    name: 'Briefly',
    category: 'AI-powered browser extension',
    period: '[Add dates]',
    overview: '[Add a one or two sentence overview of what Briefly does.]',
    problem: '[Add the problem Briefly solves and who it is for.]',
    methodology: ['[Add how it works, one step per line.]'],
    technologies: ['[Add technologies]'],
    results: [],
    resultsNote: '[Add results or usage figures once you have them.]',
    repo: 'https://github.com/siddhant9121/Briefly',
    pending: true,
  },
];

/* ---------- Research and insights ---------- */

export interface Insight {
  category: string;
  title: string;
  description: string;
  /* Replace with a real date when the piece is published */
  date: string;
  readTime: string;
  status: 'draft' | 'published';
}

export const insights: Insight[] = [
  {
    category: 'Company valuation',
    title: 'What a valuation is really estimating',
    description:
      'A plain account of intrinsic value, why two careful analysts can disagree, and which assumptions carry the answer.',
    date: 'Publication date to be set',
    readTime: 'Est. 8 min read',
    status: 'draft',
  },
  {
    category: 'Understanding DCF models',
    title: 'Anatomy of a DCF: where the value comes from',
    description: 'Free cash flow, the discount rate and terminal value, and how much of the result each one decides.',
    date: 'Publication date to be set',
    readTime: 'Est. 10 min read',
    status: 'draft',
  },
  {
    category: 'Financial statement analysis',
    title: 'Reading the three statements as one story',
    description: 'How profit, the balance sheet and cash flow connect, and what it means when they disagree.',
    date: 'Publication date to be set',
    readTime: 'Est. 7 min read',
    status: 'draft',
  },
  {
    category: 'Capital markets',
    title: 'How markets put a price on risk',
    description: 'Beta, risk premia and what the asymmetric-beta evidence adds to the textbook picture.',
    date: 'Publication date to be set',
    readTime: 'Est. 9 min read',
    status: 'draft',
  },
  {
    category: 'Investment research',
    title: 'From data to a research view',
    description: 'A working process for turning filings and price data into a view that can be argued with.',
    date: 'Publication date to be set',
    readTime: 'Est. 6 min read',
    status: 'draft',
  },
];

/* ---------- Education and professional development ---------- */

export interface TimelineItem {
  period: string;
  title: string;
  organisation: string;
  note: string;
  status: 'completed' | 'in-progress';
}

/* To add a qualification, add one object to this list. */
export const timeline: TimelineItem[] = [
  {
    period: '2023 to 2027',
    title: 'B.Tech in Computer Engineering, major in AI and Data Science',
    organisation: 'Ramrao Adik Institute of Technology, D.Y. Patil Deemed University',
    note: 'Final year. Graduating June 2027. CGPA 7.59 / 10.',
    status: 'in-progress',
  },
  {
    period: 'Ongoing',
    title: 'CFA Level I',
    organisation: 'CFA Institute',
    note: 'Preparing by self-study. Exam not yet taken; targeting November 2027.',
    status: 'in-progress',
  },
  {
    period: 'Ongoing',
    title: 'Financial Modelling and DCF Valuation',
    organisation: 'Self-directed study',
    note: 'Currently learning three-statement modelling and discounted cash flow valuation.',
    status: 'in-progress',
  },
  {
    period: 'Ongoing',
    title: 'NISM Series XV: Research Analyst',
    organisation: 'National Institute of Securities Markets',
    note: 'Preparation in progress.',
    status: 'in-progress',
  },
  {
    period: 'June 2026',
    title: 'Goldman Sachs Risk Management Job Simulation',
    organisation: 'Forage',
    note: 'A virtual job simulation, not employment. Analysed client profiles and real estate investments to identify financial risks.',
    status: 'completed',
  },
  {
    period: 'Completed',
    title: 'Data Analysis with Python',
    organisation: 'IBM',
    note: 'Technical certification.',
    status: 'completed',
  },
  {
    period: 'Completed',
    title: 'Data Visualization with Python',
    organisation: 'IBM',
    note: 'Technical certification.',
    status: 'completed',
  },
];
