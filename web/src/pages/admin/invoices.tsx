import { Box } from '@chakra-ui/react'
import { AdminNav, Layout } from '../../components'

const InvoicesAdmin = () => {
  return (
    <Layout title="Invoices | Admin | Drivechain Exchange">
      <AdminNav />

      <Box>Invoices</Box>
    </Layout>
  )
}

export default InvoicesAdmin
