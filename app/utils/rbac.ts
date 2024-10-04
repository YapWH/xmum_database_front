type Role = 'guest' | 'user' | 'admin'

const roleHierarchy: { [key in Role]: Role[] } = {
  guest: ['guest'],
  user: ['guest', 'user'],
  admin: ['guest', 'user', 'admin'],
}

export const hasAccess = (userRole: Role, requiredRole: Role): boolean => {
  return roleHierarchy[userRole].includes(requiredRole)
}