export type SaaSToolPricingModel = 'perUser' | 'flat'

export interface SaaSToolDefinition {
  id: string
  name: string
  pricingModel: SaaSToolPricingModel
  pricePerUser?: number
  flatMonthlyPrice?: number
  defaultSelected?: boolean
}

export interface SaaSToolCategory {
  id: string
  title: string
  tools: SaaSToolDefinition[]
}

export const saasToolCategories: SaaSToolCategory[] = [
  {
    id: 'office',
    title: 'Office & Zusammenarbeit',
    tools: [
      {
        id: 'm365',
        name: 'Microsoft 365 Business Standard',
        pricingModel: 'perUser',
        pricePerUser: 12,
        defaultSelected: true,
      },
      {
        id: 'gworkspace',
        name: 'Google Workspace Business Standard',
        pricingModel: 'perUser',
        pricePerUser: 15,
      },
      {
        id: 'notion',
        name: 'Notion Business',
        pricingModel: 'perUser',
        pricePerUser: 18,
      },
    ],
  },
  {
    id: 'communication',
    title: 'Kommunikation & Meetings',
    tools: [
      {
        id: 'slack-pro',
        name: 'Slack Pro',
        pricingModel: 'perUser',
        pricePerUser: 8,
        defaultSelected: true,
      },
      {
        id: 'slack-business',
        name: 'Slack Business+',
        pricingModel: 'perUser',
        pricePerUser: 16,
      },
      {
        id: 'zoom-pro',
        name: 'Zoom Pro',
        pricingModel: 'perUser',
        pricePerUser: 15,
      },
    ],
  },
  {
    id: 'pm',
    title: 'Projektmanagement',
    tools: [
      {
        id: 'jira',
        name: 'Jira Standard',
        pricingModel: 'perUser',
        pricePerUser: 9,
      },
      {
        id: 'asana',
        name: 'Asana (Starter/Advanced)',
        pricingModel: 'perUser',
        pricePerUser: 13,
      },
    ],
  },
  {
    id: 'crm',
    title: 'CRM & Sales',
    tools: [
      {
        id: 'salesforce',
        name: 'Salesforce Sales Cloud Professional',
        pricingModel: 'perUser',
        pricePerUser: 75,
      },
      {
        id: 'hubspot',
        name: 'HubSpot (Marketing/Sales Professional)',
        pricingModel: 'flat',
        flatMonthlyPrice: 80,
      },
    ],
  },
  {
    id: 'storage',
    title: 'Storage & Files',
    tools: [
      {
        id: 'dropbox',
        name: 'Dropbox Business Standard',
        pricingModel: 'perUser',
        pricePerUser: 15,
      },
      {
        id: 'box',
        name: 'Box Business',
        pricingModel: 'perUser',
        pricePerUser: 14,
      },
    ],
  },
  {
    id: 'devops',
    title: 'Entwicklung & DevOps',
    tools: [
      {
        id: 'github-enterprise',
        name: 'GitHub Enterprise',
        pricingModel: 'perUser',
        pricePerUser: 22,
      },
      {
        id: 'gitlab-premium',
        name: 'GitLab Premium',
        pricingModel: 'perUser',
        pricePerUser: 20,
      },
    ],
  },
]

export const flattenedSaasTools = saasToolCategories.flatMap(category => category.tools)
