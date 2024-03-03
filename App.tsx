import { StatusBar } from 'react-native';
import { Home } from '@screens/Home';

const App = () => {
  return (
    <>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent
      />
      <Home />
    </>
  );
};

export default App;
