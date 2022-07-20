import { Button, Input} from 'react-component-lib20'

import './styles.scss'

export const Layout = () => {
  return (
    <div className="container">
      <div className="container__components">
        <div className="container__component">
        <p>Button</p>
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

        <div className="container__component">
        <p>Input</p>
          <Input theme="default" type="text"/>
          <Input theme="disabled" type="text"/>
        </div>
      </div>
    </div>
  )
}