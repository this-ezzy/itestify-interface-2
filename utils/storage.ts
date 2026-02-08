
import { AuthResponse } from "@/app/api/hooks/auth/types";
import { decrypt, encrypt } from "@/lib/encryption";


type StoredPayload<T> = {
  value: T
  expiry?: number // timestamp (ms)
}

type StorageConfig = {
  expires?: Date | number // Date OR ttl in ms
}


type StorageKeyValue = { from: { url?: string }; auth?: Partial<AuthResponse>; old_auth?: string; }

export const StorageKeys: Record<keyof StorageKeyValue, string> = {
  auth: "auth_uskdl_wnakd",
  from: "from_d2kad_dkls",
  old_auth: "1701092374137",
}

async function setStorage<T extends keyof StorageKeyValue>(
  key: T,
  data: StorageKeyValue[T],
  config?: StorageConfig
) {
  try {
    const expiry =
      config?.expires instanceof Date
        ? config.expires.getTime()
        : typeof config?.expires === "number"
          ? Date.now() + config.expires
          : undefined

    const payload: StoredPayload<StorageKeyValue[T]> = {
      value: data,
      expiry,
    }

    const encryptedData = await encrypt(payload)
    localStorage.setItem(StorageKeys[key], encryptedData)
  } catch (error) {
    console.error(error)
  }
}



function removeStorage<T extends keyof StorageKeyValue>(key: T) {
  localStorage.removeItem(StorageKeys[key])
}

async function getStorage<T extends keyof StorageKeyValue>(
  key: T
): Promise<StorageKeyValue[T] | null> {
  try {
    const item = localStorage.getItem(StorageKeys[key])
    if (!item) return null
    const decrypted = await decrypt<StoredPayload<StorageKeyValue[T]>>(item)
    // Expired → cleanup
    if (decrypted.expiry && Date.now() > decrypted.expiry) {
      localStorage.removeItem(StorageKeys[key])
      return null
    }

    return decrypted.value
  } catch (error) {
    console.error(error)
    localStorage.removeItem(StorageKeys[key])
    return null
  }
}


export const storage = {
  set: setStorage,
  get: getStorage,
  remove: removeStorage,
}
