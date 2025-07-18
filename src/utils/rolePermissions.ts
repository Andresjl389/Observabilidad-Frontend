export const ROLES = {
  ADMIN: "administrador",
  USER: "usuario"
} as const;

export const ROUTE_PERMISSIONS = {
  "/main": [ROLES.ADMIN, ROLES.USER],
  "/dashboards": [ROLES.ADMIN, ROLES.USER],
  "/videos": [ROLES.ADMIN, ROLES.USER],
  "/table-information": [ROLES.ADMIN],
  "/depuration": [ROLES.ADMIN],
  "/manage-users": [ROLES.ADMIN],
  "/manage-token": [ROLES.ADMIN],
  "/add-information": [ROLES.ADMIN]
} as const;

export const getPermittedRoutes = (userRole: string) => {
  const normalizedRole = userRole.toLowerCase();
  return Object.entries(ROUTE_PERMISSIONS)
    .filter(([, allowedRoles]) => allowedRoles.includes(normalizedRole as any))
    .map(([route]) => route);
};