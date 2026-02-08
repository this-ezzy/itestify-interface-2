/* eslint-disable @typescript-eslint/no-explicit-any */

import appEnv from "@/env.mjs"

export const getEncryptionKey = () => {
  const secretKey = appEnv.NEXT_PUBLIC_ENCRYPT_KEY
  if (!secretKey) throw new Error("Encryption key is missing") // Prevent undefined key
  return new TextEncoder().encode(secretKey)
}

export async function encrypt(payload: any, config?: Config) {
  const { SignJWT } = await import("jose") // Dynamically import `jose`
  const key = getEncryptionKey()

  let token = new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt()
  if (config?.expires) token = token.setExpirationTime(config.expires)

  return await token.sign(key)
}

export async function decrypt<T = any>(input: string) {
  const { jwtVerify } = await import("jose") // Dynamically import `jose`
  const key = getEncryptionKey()

  const { payload } = await jwtVerify(input, key, { algorithms: ["HS256"] })
  return payload as T
}


type Config = { expires?: Date }
