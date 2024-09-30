import * as dotenv from 'dotenv'
import * as line from '@line/bot-sdk'
import { isHoliday } from './holidayUtils'
import * as Types from '@line/bot-sdk/lib/types'

dotenv.config()

// LINE API設定
const lineConfig: line.ClientConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || '',
}

// メッセージを送信
const broadcastMessage = async (date: Date) => {
  const today = date.toLocaleDateString('ja-JP', {
    day: 'numeric',
    weekday: 'short',
  })
  try {
    const messages: Types.Message[] = [
      {
        type: 'text',
        text: `${today}\n🏫登校のリアクションお願いします🙏\n車\n🚗⇒🏫`,
      },
      { type: 'text', text: '歩き\n🏃⇒🏫' },
      { type: 'text', text: '🏠下校のリアクションお願いします🙏\n車\n🚗⇒🏠' },
      { type: 'text', text: '歩き\n🏃⇒🏠' },
      { type: 'text', text: '歩き(途中)\n🏃⇒🏭⇒🚙' },
    ]
    const groupID = process.env.LINE_GROUP_ID || ''
    const client = new line.Client(lineConfig)
    await client.pushMessage(groupID, messages)
  } catch (error: unknown) {
    throw error
  }
}

const today = new Date()
today.setHours(today.getHours() + 9) // JSTに変換
// 祝日ならメッセージを送信しない
if (!isHoliday(today)) {
  broadcastMessage(today)
    .then(() => console.log('Done!'))
    .catch((error) => console.error('Error:', error))
}
