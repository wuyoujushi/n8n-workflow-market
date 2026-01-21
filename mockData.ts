import { Workflow } from './types';

export const MOCK_WORKFLOWS: Workflow[] = [
  {
    id: '1',
    title: 'Shopify to Google Sheets Sync',
    slug: 'shopify-google-sheets-sync',
    description: 'Automatically add new Shopify orders to a Google Sheet row for easier accounting and tracking.',
    price: 15.00,
    currency: 'USD',
    author: {
      id: 'a1',
      name: 'AutomationPro',
      avatar: 'https://picsum.photos/id/1005/50/50',
      verified: true
    },
    tags: ['E-commerce', 'Reporting', 'Shopify', 'Google Sheets'],
    downloads: 1250,
    rating: 4.8,
    image: 'https://picsum.photos/id/1/600/400',
    nodes: [
      { name: 'Shopify', iconUrl: 'https://cdn.iconscout.com/icon/free/png-256/free-shopify-logo-icon-download-in-svg-png-gif-file-formats--shops-shopping-brands-and-logos-pack-icons-1583155.png?f=webp' },
      { name: 'Google Sheets', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Google_Sheets_logo_%282014-2020%29.svg/1498px-Google_Sheets_logo_%282014-2020%29.svg.png' }
    ],
    content: `
# Shopify to Google Sheets Sync

This workflow listens for new orders in Shopify and appends the details to a Google Sheet.

## Prerequisites
- Shopify API Key
- Google Cloud Service Account

## Setup
1. Import this workflow.
2. Configure the Shopify Trigger node with your credentials.
3. Map the order fields to your Google Sheet columns.

## Features
- Real-time sync
- Error handling with email notification
    `,
    createdAt: '2023-10-01T10:00:00Z'
  },
  {
    id: '2',
    title: 'Lead Enrichment with Clearbit',
    slug: 'lead-enrichment-clearbit',
    description: 'Enrich new CRM leads with social data using Clearbit and update HubSpot automatically.',
    price: 29.99,
    currency: 'USD',
    author: {
      id: 'a2',
      name: 'MarketingOps',
      avatar: 'https://picsum.photos/id/1027/50/50',
      verified: true
    },
    tags: ['Marketing', 'CRM', 'HubSpot', 'Clearbit'],
    downloads: 840,
    rating: 4.6,
    image: 'https://picsum.photos/id/20/600/400',
    nodes: [
      { name: 'HubSpot', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/HubSpot_Logo.svg/2560px-HubSpot_Logo.svg.png' },
      { name: 'Clearbit', iconUrl: 'https://logo.clearbit.com/clearbit.com' }
    ],
    content: `# Lead Enrichment
    
Get more data on your leads instantly.`,
    createdAt: '2023-11-15T14:30:00Z'
  },
  {
    id: '3',
    title: 'Weekly SEO Report Generator',
    slug: 'weekly-seo-report',
    description: 'Scrape SERP data, analyze with OpenAI, and email a PDF report to stakeholders.',
    price: 49.00,
    currency: 'USD',
    author: {
      id: 'a3',
      name: 'SEO_Wizard',
      avatar: 'https://picsum.photos/id/1011/50/50',
      verified: false
    },
    tags: ['SEO', 'Reporting', 'OpenAI', 'Email'],
    downloads: 320,
    rating: 4.9,
    image: 'https://picsum.photos/id/60/600/400',
    nodes: [
      { name: 'Cron', iconUrl: 'https://cdn-icons-png.flaticon.com/512/992/992700.png' },
      { name: 'OpenAI', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1024px-OpenAI_Logo.svg.png' },
      { name: 'Gmail', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/2560px-Gmail_icon_%282020%29.svg.png' }
    ],
    content: `# SEO Reporter
    
    Automate your client reporting with this advanced workflow.`,
    createdAt: '2023-12-01T09:00:00Z'
  },
  {
    id: '4',
    title: 'Telegram Bot for Crypto Alerts',
    slug: 'crypto-telegram-bot',
    description: 'Monitor Binance for price movements and send instant alerts to a Telegram channel.',
    price: 5.00,
    currency: 'USD',
    author: {
      id: 'a4',
      name: 'CryptoKing',
      avatar: 'https://picsum.photos/id/1025/50/50',
      verified: false
    },
    tags: ['Crypto', 'Telegram', 'Bot', 'Finance'],
    downloads: 5000,
    rating: 4.5,
    image: 'https://picsum.photos/id/103/600/400',
    nodes: [
      { name: 'Binance', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Binance_logo.svg' },
      { name: 'Telegram', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png' }
    ],
    content: `# Crypto Bot
    
    Never miss a pump again.`,
    createdAt: '2024-01-10T11:20:00Z'
  },
  {
    id: '5',
    title: 'Slack Onboarding Bot',
    slug: 'slack-onboarding-bot',
    description: 'Send a sequence of onboarding messages to new Slack users over their first week.',
    price: 10.00,
    currency: 'USD',
    author: {
      id: 'a1',
      name: 'AutomationPro',
      avatar: 'https://picsum.photos/id/1005/50/50',
      verified: true
    },
    tags: ['HR', 'Slack', 'Onboarding'],
    downloads: 210,
    rating: 4.2,
    image: 'https://picsum.photos/id/180/600/400',
    nodes: [
      { name: 'Slack', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png' }
    ],
    content: `# Slack Onboarding
    
    Welcome new team members with style.`,
    createdAt: '2024-02-05T16:45:00Z'
  },
  {
    id: '6',
    title: 'Notion to Jira Sync',
    slug: 'notion-jira-sync',
    description: 'Two-way sync between Notion databases and Jira projects.',
    price: 35.00,
    currency: 'USD',
    author: {
      id: 'a5',
      name: 'ProductOps',
      avatar: 'https://picsum.photos/id/1074/50/50',
      verified: true
    },
    tags: ['Productivity', 'Notion', 'Jira', 'Agile'],
    downloads: 600,
    rating: 4.7,
    image: 'https://picsum.photos/id/201/600/400',
    nodes: [
      { name: 'Notion', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png' },
      { name: 'Jira', iconUrl: 'https://cdn.icon-icons.com/icons2/2699/PNG/512/atlassian_jira_logo_icon_170511.png' }
    ],
    content: `# Notion Jira Sync
    
    Keep your product managers and developers on the same page.`,
    createdAt: '2024-02-20T10:00:00Z'
  }
];
