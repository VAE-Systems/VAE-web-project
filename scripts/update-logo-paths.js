/**
 * Update external logo URLs to local paths in techStackData.ts
 * Run with: node scripts/update-logo-paths.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const TECH_STACK_FILE = path.join(__dirname, '../src/data/techStackData.ts')

// Mapping: external URL → local path
const URL_REPLACEMENTS = [
  // jsDelivr CDN
  {
    from: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
    to: '/logos/tech/pytorch.svg',
  },
  {
    from: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
    to: '/logos/tech/tensorflow.svg',
  },
  {
    from: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
    to: '/logos/tech/fastapi.svg',
  },
  {
    from: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
    to: '/logos/tech/django.svg',
  },
  {
    from: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
    to: '/logos/tech/flask.svg',
  },
  {
    from: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    to: '/logos/tech/nodejs.svg',
  },
  {
    from: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    to: '/logos/tech/express.svg',
  },
  {
    from: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg',
    to: '/logos/tech/nestjs.svg',
  },
  {
    from: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    to: '/logos/tech/postgresql.svg',
  },
  {
    from: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    to: '/logos/tech/mysql.svg',
  },
  {
    from: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mariadb/mariadb-original.svg',
    to: '/logos/tech/mariadb.svg',
  },
  {
    from: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    to: '/logos/tech/mongodb.svg',
  },
  {
    from: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
    to: '/logos/tech/redis.svg',
  },
  {
    from: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg',
    to: '/logos/tech/elasticsearch.svg',
  },
  {
    from: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    to: '/logos/tech/react.svg',
  },
  {
    from: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    to: '/logos/tech/vuejs.svg',
  },
  {
    from: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    to: '/logos/tech/typescript.svg',
  },
  {
    from: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    to: '/logos/tech/javascript.svg',
  },
  {
    from: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
    to: '/logos/tech/tailwindcss.svg',
  },
  {
    from: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    to: '/logos/tech/nextjs.svg',
  },
  {
    from: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    to: '/logos/tech/docker.svg',
  },
  {
    from: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
    to: '/logos/tech/kubernetes.svg',
  },
  {
    from: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',
    to: '/logos/tech/supabase.svg',
  },
  {
    from: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/strapi/strapi-original.svg',
    to: '/logos/tech/strapi.svg',
  },
  {
    from: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    to: '/logos/tech/git.svg',
  },
  {
    from: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    to: '/logos/tech/github.svg',
  },
  {
    from: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg',
    to: '/logos/tech/gitlab.svg',
  },
  {
    from: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg',
    to: '/logos/tech/npm-original-wordmark.svg',
  },
  {
    from: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    to: '/logos/tech/python.svg',
  },

  // Wikimedia Commons
  {
    from: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Meta_logo.png',
    to: '/logos/tech/meta-logo.png',
  },
  {
    from: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Alibaba_Group.svg',
    to: '/logos/tech/alibaba.svg',
  },
  {
    from: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Technology_Innovation_Institute_logo.svg',
    to: '/logos/tech/tii-logo.svg',
  },
  {
    from: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg',
    to: '/logos/tech/openai.svg',
  },

  // GitHub Avatars
  {
    from: 'https://avatars.githubusercontent.com/u/122008134?s=200&v=4',
    to: '/logos/tech/mistralai-avatar.png',
  },
  {
    from: 'https://avatars.githubusercontent.com/u/73049886?s=200&v=4',
    to: '/logos/tech/cohere-avatar.png',
  },
  {
    from: 'https://avatars.githubusercontent.com/u/3142110?s=200&v=4',
    to: '/logos/tech/salesforce-avatar.png',
  },
  {
    from: 'https://avatars.githubusercontent.com/u/83617624?s=200&v=4',
    to: '/logos/tech/ai21-avatar.png',
  },
  {
    from: 'https://avatars.githubusercontent.com/u/147562750?s=200&v=4',
    to: '/logos/tech/gemini-avatar.png',
  },
  {
    from: 'https://avatars.githubusercontent.com/u/143956012?s=200&v=4',
    to: '/logos/tech/claude-avatar.png',
  },
  {
    from: 'https://avatars.githubusercontent.com/u/120746576?s=200&v=4',
    to: '/logos/tech/palm-avatar.png',
  },
  {
    from: 'https://avatars.githubusercontent.com/u/102850713?s=200&v=4',
    to: '/logos/tech/sentence-avatar.png',
  },
  {
    from: 'https://avatars.githubusercontent.com/u/39879120?s=200&v=4',
    to: '/logos/tech/instructor-avatar.png',
  },
  {
    from: 'https://avatars.githubusercontent.com/u/140960555?s=200&v=4',
    to: '/logos/tech/qwen-avatar.png',
  },
  {
    from: 'https://avatars.githubusercontent.com/u/5708770?s=200&v=4',
    to: '/logos/tech/nomic-avatar.png',
  },
  {
    from: 'https://avatars.githubusercontent.com/u/121681234?s=200&v=4',
    to: '/logos/tech/embedchain-avatar.png',
  },

  // SeekLogo
  {
    from: 'https://seeklogo.com/images/M/microsoft-logo-4BA5F9A8E7-seeklogo.com.png',
    to: '/logos/tech/microsoft-seeklogo.png',
  },
]

function updateLogoPaths() {
  console.log('🔄 Updating logo paths in techStackData.ts...\n')

  let content = fs.readFileSync(TECH_STACK_FILE, 'utf8')
  let replacements = 0

  for (const { from, to } of URL_REPLACEMENTS) {
    const regex = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')
    const matches = (content.match(regex) || []).length

    if (matches > 0) {
      content = content.replace(regex, to)
      console.log(`✅ Replaced ${matches}x: ${from.split('/').pop()} → ${to}`)
      replacements += matches
    }
  }

  fs.writeFileSync(TECH_STACK_FILE, content, 'utf8')

  console.log(`\n✨ Done! ${replacements} logo URLs updated to local paths.`)
}

updateLogoPaths()
