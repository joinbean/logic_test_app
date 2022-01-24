export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (store.getters.user != null) {
    if (store.getters.status === 'Admin') {
      return redirect('/admin/login')
    }
    return redirect('/register')
  }
}
