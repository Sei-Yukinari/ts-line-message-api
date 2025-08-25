# ts-line-message-api

TypeScript と LINE Messaging API を用いてメッセージを (手動 / 定期) 送信するシンプルなプロジェクト。

## 特長
- TypeScript + Node.js
- グループ / ユーザーへのテキスト送信サンプル
- GitHub Actions による日本時間 20:00 定期送信例
- `.env` / GitHub Secrets によるトークン管理
- 最小構成で拡張しやすい

## 前提条件
- Node.js 18+ (例では 22)
- npm
- LINE チャネルアクセストークン
- 送信先のグループ ID または ユーザー ID

## セットアップ

```bash
    git clone <YOUR_REPO_URL>
    cd ts-line-message-api
    npm install
    npm run build
```

## 環境変数
ローカルでは `.env` (必要なら追加) または実行時に環境変数指定。GitHub Actions では Secrets を利用。

例 (.env):
LINE_CHANNEL_ACCESS_TOKEN=xxxxxxxx
LINE_GROUP_ID=yyyyyyyy

## 開発フロー
1. 変更
2. npm run dev でホット実行
3. npm run build でトランスパイル
4. Push して Actions の手動 / スケジュール結果確認

## トラブルシュート
| 症状 | 確認ポイント |
|------|--------------|
| 送信されない | アクセストークン権限 / 有効期限 |
| 403 | Bot が対象グループに参加済みか |
| 時刻ずれ | cron は常に UTC 指定か再確認 |
| TypeError | 環境変数未設定 (.env / Secrets) |

## セキュリティ
- アクセストークンは必ず Secrets / .env に保持
- ログへ機密値を出力しない
- 不要になったトークンは LINE Developers で失効

## ライセンス
本プロジェクトは MIT License の下で提供されます。詳細は `LICENSE` を参照してください。
