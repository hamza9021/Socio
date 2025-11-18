import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { Provider } from 'react-redux'
import store from './app/store.js'
import client from "./graphql/apolloClient.js"
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './app/store.js'
import { ApolloProvider } from '@apollo/client/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </ApolloProvider>
)