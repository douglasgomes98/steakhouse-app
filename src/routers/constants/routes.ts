export const routes = {
  login: '/login',
  dashboard: '/dashboard',
  createSteak: '/steak/create',
  editSteak: '/steak/:id/edit',
  createEditSteakRoute: (id: string) => `/steak/${id}/edit`,
};
