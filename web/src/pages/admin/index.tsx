import { Box } from '@chakra-ui/react'
import { AdminNav, Layout } from '../../components'

const DashboardAdmin = () => {
  return (
    <Layout title="Dashboard | Admin | Drivechain Exchange">
      <AdminNav />

      <Box mt="10">Dashboard</Box>
    </Layout>
  )
}

export default DashboardAdmin
