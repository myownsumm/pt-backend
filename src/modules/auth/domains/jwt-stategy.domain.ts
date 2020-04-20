export interface JwtValidatePayload {
  sub: string;
  username: string;
}

export const JwtStrategyName = 'jwt';
