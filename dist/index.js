"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const line = __importStar(require("@line/bot-sdk"));
dotenv.config();
// LINE API設定
const config = {
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || '',
    channelSecret: process.env.LINE_CHANNEL_SECRET || '',
};
console.log('AAAAAAAAAAAAAA', config);
// クライアントインスタンスを作成
const client = new line.Client(config);
// ブロードキャストメッセージを送信
const broadcastMessage = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.broadcast([
            {
                type: 'text',
                text: '登校のリアクションお願いします',
            },
            {
                type: 'text',
                text: '車',
            },
            {
                type: 'text',
                text: '歩き',
            },
            {
                type: 'text',
                text: '休み',
            },
        ]);
        yield client.broadcast([
            {
                type: 'text',
                text: '下校のリアクションお願いします',
            },
            {
                type: 'text',
                text: '車',
            },
            {
                type: 'text',
                text: '歩き',
            },
            {
                type: 'text',
                text: '習い事など',
            },
        ]);
    }
    catch (error) {
        console.error('Error sending broadcast message:', error);
    }
});
broadcastMessage().then((r) => console.log('Done!'));
