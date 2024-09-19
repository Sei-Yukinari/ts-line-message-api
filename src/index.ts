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
const broadcastMessage = async () => {
  try {
    const goToSchoolMessages: Types.Message[] = [
      { type: 'text', text: '🏫登校のリアクションお願いします🙏' },
      { type: 'text', text: '車:🚗' },
      { type: 'text', text: '歩き:🏃' },
      { type: 'text', text: 'その他(お休み等)' },
    ];
    const leavingSchoolMessages: Types.Message[] = [
      { type: 'text', text: '🏠下校のリアクションお願いします🙏' },
      { type: 'text', text: '車:🚗' },
      { type: 'text', text: '歩き:🏃' },
      { type: 'text', text: 'その他(お休み等)' },
    ];
    // メッセージを送信
    await client.pushMessage(groupID, goToSchoolMessages);
    await client.pushMessage(groupID, leavingSchoolMessages);
  } catch (error: unknown) {
    console.error('Error sending broadcast message:', error);
  }
};

// 祝日ならブロードキャストメッセージを送信しない
if (!isHoliday()) {
  broadcastMessage().then(() => console.log('Done!'));
}
