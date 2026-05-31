import { createServiceClient } from './service'

export async function getUsers() {
  const serviceClient = createServiceClient()
  const { data } = await serviceClient.auth.admin.listUsers()
  return data?.users.map((u) => ({ id: u.id, email: u.email ?? 'Unknown' })) ?? []
}
