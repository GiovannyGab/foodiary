import { JwtPayload, sign, verify } from "jsonwebtoken";

export function signAccessToken(userId: string) {
  const accessToken = sign({ sub: userId }, process.env.JWT_SECRET!, {
    expiresIn: "2 days",
  });

  return accessToken;
}
export function validateAccessToken(token: string) {
  try {
    const { sub } = verify(token, process.env.JWT_SECRET!) as JwtPayload;

    return sub ?? null;
  } catch {
    return null;
  }
}
