/**
 * Known base hostnames the app is served from.
 * Add your production domain here when deploying.
 */
const KNOWN_HOSTS = ['localhost', '127.0.0.1', 'larvue.local']

/**
 * Detects the current portal based on the hostname.
 * - manage.* → 'admin'
 * - shop.*, or a known bare host → 'shop'
 * - Anything else → null (invalid subdomain)
 */
export function getPortal() {
  const hostname = window.location.hostname

  if (hostname.startsWith('manage.')) {
    return 'admin'
  }

  if (hostname.startsWith('shop.') || KNOWN_HOSTS.includes(hostname)) {
    return 'shop'
  }

  return null
}
