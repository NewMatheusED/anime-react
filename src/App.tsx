import MainLayout from './layout/mainLayout'
import { Home } from './pages/home'
import { SearchProvider } from './context/SearchContext'
import { FavoriteProvider } from './context/FavoriteContext'

function App() {
    return (
        <SearchProvider>
            <FavoriteProvider>
                <MainLayout>
                    <Home />
                </MainLayout>
            </FavoriteProvider>
        </SearchProvider>
    )
}

export default App
