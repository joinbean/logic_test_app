export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (store.getters.authenticated) {
    if (store.getters.status === 'Admin') {
      return redirect('/admin/dashboard')
    }
    return redirect('/start')
  }
}
