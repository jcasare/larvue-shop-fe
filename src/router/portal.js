/**
 * Detects the current portal based on the hostname.
 * Returns 'admin' for manage.* subdomains, 'shop' for everything else.
 */
export function getPortal() {
  const hostname = window.location.hostname
  if (hostname.startsWith('manage')) {
    return 'admin'
  }
  return 'shop'
}
