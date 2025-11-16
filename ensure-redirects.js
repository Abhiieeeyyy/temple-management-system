import { copyFileSync, existsSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Ensure _redirects file is in dist folder
const publicRedirects = join(__dirname, 'public', '_redirects')
const distRedirects = join(__dirname, 'dist', '_redirects')

if (existsSync(publicRedirects)) {
  try {
    copyFileSync(publicRedirects, distRedirects)
    console.log('✅ _redirects file copied to dist folder')
  } catch (error) {
    console.error('❌ Error copying _redirects file:', error.message)
    process.exit(1)
  }
} else {
  console.warn('⚠️  _redirects file not found in public folder')
}

