import MainLayout from './layout/mainLayout'
import { Home } from './pages/home'
import { SearchProvider } from './context/SearchContext'

function App() {
    return (
        <SearchProvider>
            <MainLayout>
                <Home />
            </MainLayout>
        </SearchProvider>
    )
}

export default App
