import { MantineProvider } from '@mantine/core';
import './App.css';
import AllRoutes from './routes/allRoutes';
import { Notifications } from '@mantine/notifications';

function App() {
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <Notifications position='top-center'/>
    <AllRoutes/>
    </MantineProvider>
  );
}

export default App;
