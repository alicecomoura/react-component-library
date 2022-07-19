import './App.css';

import { Button } from 'react-sass'

function App() {
  return (
    <div className="App">
      <Button theme="success">
        Ok
      </Button>
      <Button theme="danger">
        Cancelar
      </Button>
      <Button theme="disabled">
        Disabilitado
      </Button>
      <Button theme="default">
        Próximo
      </Button>      
    </div>
  );
}

export default App;
