import { Button } from 'react-sass'

import './styles.scss'

export const Layout = () => {
  return (
    <div className="container">
      <div className="container__components">
        <p>Button</p>
        <div className="container__component">
          <Button theme="default">
            Próximo
          </Button>
          <Button theme="warning">
            Tem certeza?
          </Button>
          <Button theme="danger">
            Cancelar
          </Button>
          <Button theme="success">
            Confirmar
          </Button>
          <Button theme="disabled">
            Desabilitado
          </Button>
        </div>
      </div>
    </div>
  )
}