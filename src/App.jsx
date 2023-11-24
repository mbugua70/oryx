import './App.css'
import 'materialize-css/dist/css/materialize.min.css';
import 'material-icons/css/material-icons.min.css';
import ParentRouter from './component/parentrouter';
import '@ionic/react/css/core.css';
import { setupIonicReact } from '@ionic/react';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

setupIonicReact();
function App() {

  return (
    <>
     <ParentRouter/>
    </>
  )
}

export default App
