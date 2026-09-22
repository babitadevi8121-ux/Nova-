export interface SuperAiToolItem {
  id: string;
  name: string;
  category: string;
  badge: string;
  tagline: string;
  website: string;
  pricingType: 'Free' | 'Freemium' | 'Paid' | 'Open Source' | 'Enterprise' | 'Pay-As-You-Go';
  actions: string[];
  defaultPrompt: string;
  sampleOutputTitle: string;
  sampleDetails: { label: string; value: string }[];
  accentColor: string;
  gradient: string;
  tags: string[];
}
