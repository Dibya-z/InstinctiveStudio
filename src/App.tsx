import { Provider } from 'react-redux';
import { store } from './store/store';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { MainContent } from './components/MainContent';

export function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex">
          <Sidebar />
          <MainContent />
        </div>
      </div>
    </Provider>
  );
}