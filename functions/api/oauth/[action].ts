import { handleOAuth, type OAuthEnv } from '../../../server/oauth.ts';
export const onRequestGet = (context: {request: Request; env: OAuthEnv}) => handleOAuth(context.request,context.env);
