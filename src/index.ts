import * as dotenv from 'dotenv';
import * as line from '@line/bot-sdk';
import { isHoliday } from './holidayUtils';
import * as Types from '@line/bot-sdk/lib/types';

dotenv.config();

// LINE API設定
const config: line.ClientConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || '',
  channelSecret: process.env.LINE_CHANNEL_SECRET || '',
};

// クライアントインスタンスを作成
const client = new line.Client(config);

// ブロードキャストメッセージを送信
const broadcastMessage = async () => {
  try {
    const messages: Types.Message[] = [
      { type: 'text', text: '🏫登校のリアクションお願いします🙏' },
      { type: 'text', text: '🚗' },
      { type: 'text', text: '🏃' },
      { type: 'text', text: '🇪 🇹 🇨' },
    ];
    const messages2: Types.Message[] = [
      { type: 'text', text: '🏠下校のリアクションお願いします🙏' },
      { type: 'text', text: '🚗' },
      { type: 'text', text: '🏃' },
      { type: 'text', text: '🇪 🇹 🇨' },
    ];
    await Promise.all([
      client.broadcast(messages),
      client.broadcast(messages2),
    ]);
  } catch (error: unknown) {
    console.error('Error sending broadcast message:', error);
  }
};

// 祝日ならブロードキャストメッセージを送信しない
if (!isHoliday()) {
  broadcastMessage().then((r) => console.log('Done!'));
}
