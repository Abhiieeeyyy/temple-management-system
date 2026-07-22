import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables (.env is in server/ folder, which is parent to server/config/)
dotenv.config({ path: path.join(__dirname, '../.env') })
console.log('✅ Environment variables loaded early in ESM')
