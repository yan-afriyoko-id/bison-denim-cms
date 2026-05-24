/**
 * Cookie Utilities
 * Helper functions untuk manage cookies dengan type safety
 * 
 * Note: Untuk auth token, gunakan langsung dari authStore yang sudah menggunakan useCookie
 */

export const COOKIE_OPTIONS = {
  httpOnly: false, // Bisa diakses dari JavaScript
  secure: import.meta.env.PROD, // HTTPS only di production
  sameSite: 'lax' as const,
  maxAge: 60 * 60 * 24 * 7, // 7 hari
  path: '/'
}

