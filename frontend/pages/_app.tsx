import '@/styles/globals.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import type { AppProps } from 'next/app'
import GeneralLayout from '@/Layout/GeneralLayout';
import { Toaster } from 'react-hot-toast';

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  
  return<QueryClientProvider client={queryClient}>
  
   <GeneralLayout
  title='Books Tracking App'
  >
      <Component {...pageProps} />
    </GeneralLayout>
    <Toaster />

    </QueryClientProvider>

}
