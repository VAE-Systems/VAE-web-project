/**
 * Download external logos and save them locally
 * Run with: node scripts/download-logos.js
 */

import fs from 'fs'
import http from 'http'
import https from 'https'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const LOGOS_DIR = path.join(__dirname, '../public/logos/tech')

// Ensure directory exists
if (!fs.existsSync(LOGOS_DIR)) {
  fs.mkdirSync(LOGOS_DIR, { recursive: true })
  console.log(`✅ Created directory: ${LOGOS_DIR}`)
}

// All external logo URLs from techStackData.ts
const LOGOS = [
  // jsDelivr CDN (devicons)
  { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg', name: 'pytorch.svg' },
  {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
    name: 'tensorflow.svg',
  },
  { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg', name: 'fastapi.svg' },
  { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg', name: 'django.svg' },
  { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg', name: 'flask.svg' },
  { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', name: 'nodejs.svg' },
  { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', name: 'express.svg' },
  { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg', name: 'nestjs.svg' },
  {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    name: 'postgresql.svg',
  },
  { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', name: 'mysql.svg' },
  { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mariadb/mariadb-original.svg', name: 'mariadb.svg' },
  { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', name: 'mongodb.svg' },
  { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', name: 'redis.svg' },
  {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg',
    name: 'elasticsearch.svg',
  },
  { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', name: 'react.svg' },
  { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg', name: 'vuejs.svg' },
  {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    name: 'typescript.svg',
  },
  {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    name: 'javascript.svg',
  },
  {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
    name: 'tailwindcss.svg',
  },
  { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', name: 'nextjs.svg' },
  { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', name: 'docker.svg' },
  {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
    name: 'kubernetes.svg',
  },
  { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg', name: 'supabase.svg' },
  { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/strapi/strapi-original.svg', name: 'strapi.svg' },
  { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', name: 'git.svg' },
  { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', name: 'github.svg' },
  { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg', name: 'gitlab.svg' },
  {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg',
    name: 'npm-original-wordmark.svg',
  },
  { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', name: 'python.svg' },

  // Wikimedia Commons
  { url: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Meta_logo.png', name: 'meta-logo.png' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Alibaba_Group.svg', name: 'alibaba.svg' },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Technology_Innovation_Institute_logo.svg',
    name: 'tii-logo.svg',
  },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg', name: 'openai.svg' },

  // GitHub Avatars
  { url: 'https://avatars.githubusercontent.com/u/122008134?s=200&v=4', name: 'mistralai-avatar.png' },
  { url: 'https://avatars.githubusercontent.com/u/73049886?s=200&v=4', name: 'cohere-avatar.png' },
  { url: 'https://avatars.githubusercontent.com/u/3142110?s=200&v=4', name: 'salesforce-avatar.png' },
  { url: 'https://avatars.githubusercontent.com/u/83617624?s=200&v=4', name: 'ai21-avatar.png' },
  { url: 'https://avatars.githubusercontent.com/u/147562750?s=200&v=4', name: 'gemini-avatar.png' },
  { url: 'https://avatars.githubusercontent.com/u/143956012?s=200&v=4', name: 'claude-avatar.png' },
  { url: 'https://avatars.githubusercontent.com/u/120746576?s=200&v=4', name: 'palm-avatar.png' },
  { url: 'https://avatars.githubusercontent.com/u/102850713?s=200&v=4', name: 'sentence-avatar.png' },
  { url: 'https://avatars.githubusercontent.com/u/39879120?s=200&v=4', name: 'instructor-avatar.png' },
  { url: 'https://avatars.githubusercontent.com/u/140960555?s=200&v=4', name: 'qwen-avatar.png' },
  { url: 'https://avatars.githubusercontent.com/u/5708770?s=200&v=4', name: 'nomic-avatar.png' },
  { url: 'https://avatars.githubusercontent.com/u/121681234?s=200&v=4', name: 'embedchain-avatar.png' },

  // SeekLogo
  {
    url: 'https://seeklogo.com/images/M/microsoft-logo-4BA5F9A8E7-seeklogo.com.png',
    name: 'microsoft-seeklogo.png',
  },
]

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    const file = fs.createWriteStream(dest)

    protocol
      .get(url, response => {
        if (response.statusCode === 200) {
          response.pipe(file)
          file.on('finish', () => {
            file.close()
            resolve()
          })
        } else if (response.statusCode === 301 || response.statusCode === 302) {
          // Handle redirects
          file.close()
          fs.unlinkSync(dest)
          downloadFile(response.headers.location, dest).then(resolve).catch(reject)
        } else {
          file.close()
          fs.unlinkSync(dest)
          reject(new Error(`Failed to download ${url}: ${response.statusCode}`))
        }
      })
      .on('error', err => {
        file.close()
        fs.unlinkSync(dest)
        reject(err)
      })
  })
}

async function downloadAllLogos() {
  console.log(`🚀 Starting download of ${LOGOS.length} logos...\n`)

  let success = 0
  let failed = 0

  for (const logo of LOGOS) {
    const dest = path.join(LOGOS_DIR, logo.name)

    // Skip if already exists
    if (fs.existsSync(dest)) {
      console.log(`⏭️  Skipped (exists): ${logo.name}`)
      success++
      continue
    }

    try {
      await downloadFile(logo.url, dest)
      console.log(`✅ Downloaded: ${logo.name}`)
      success++
    } catch (error) {
      console.error(`❌ Failed: ${logo.name} - ${error.message}`)
      failed++
    }
  }

  console.log(`\n📊 Summary: ${success} successful, ${failed} failed`)
  console.log(`📁 Logos saved to: ${LOGOS_DIR}`)
}

downloadAllLogos()
