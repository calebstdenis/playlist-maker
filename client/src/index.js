import { registerRootComponent, KeepAwake } from 'expo';
import App from './App';

if (process.env.NODE_ENV === 'development') {
  KeepAwake.activate();
}

registerRootComponent(App);
