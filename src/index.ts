import * as dotenv from 'dotenv';
import * as line from '@line/bot-sdk';
import { isHoliday } from './holidayUtils';
import * as Types from '@line/bot-sdk/lib/types';

dotenv.config();

// LINE API設定
const config: line.ClientConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || '',
};

// チャネルID
const groupID = process.env.LINE_GROUP_ID || '';

// クライアントインスタンスを作成
const client = new line.Client(config);

// メッセージを送信
const broadcastMessage = async (date: Date) => {
  const today = date.toLocaleDateString('ja-JP', {
    day: 'numeric',
    weekday: 'short',
  });
  try {
    const goToSchoolMessages: Types.Message[] = [
      { type: 'text', text: `${today}\n🏫登校のリアクションお願いします🙏` },
      { type: 'text', text: '車:🚗' },
      { type: 'text', text: '歩き:🏃' },
      { type: 'text', text: 'その他(お休み等)' },
    ];
    const leavingSchoolMessages: Types.Message[] = [
      { type: 'text', text: '🏠下校のリアクションお願いします🙏' },
      { type: 'text', text: '車:🚗' },
      { type: 'text', text: '歩き:🏃' },
      { type: 'text', text: '歩き(途中):🏃⇒🏭⇒🚙' },
      { type: 'text', text: 'その他(お休み等)' },
    ];
    // メッセージを送信
    await client.pushMessage(groupID, goToSchoolMessages);
    await client.pushMessage(groupID, leavingSchoolMessages);
  } catch (error: unknown) {
    console.error('Error sending broadcast message:', error);
  }
};

const today = new Date();
today.setHours(today.getHours() + 9); // JSTに変換
// 祝日ならメッセージを送信しない
if (!isHoliday(today)) {
  broadcastMessage(today).then(() => console.log('Done!'));
}
