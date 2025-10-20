import { IAvatarStyle } from "./types/common"

export const AVATAR_STYLE: IAvatarStyle = "thumbs"
export const APP_CONFIG = {
  NAME: 'My App',
  PREFIX: 'my_app',
  STORAGE_URL: 'https://media.myapp.com', // eg.: https://media.yourdomain.com
  EMAIL: 'Corrija Já <contato@myapp.com>',
  DEVELOPER_EMAIL: 'dev@myapp.com',
  GTM_TAG: 'GTM-*******',
  JWT_EXPIRES_IN: {
    string: process.env.NODE_ENV === 'development' ? '65m' : '7d',
    seconds:
      process.env.NODE_ENV === 'development'
        ? 60 * 65 // 35 minutos
        : 60 * 60 * 24 * 7, // 7 dias
  },
};