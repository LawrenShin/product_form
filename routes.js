import React from 'react'
import { HashRouter , Switch, Route } from 'react-router-dom'
import Main from './components/Main/Main'
import ProductsContainer from './components/Products/ProductsContainer'
import NotFound from './components/NotFound/NotFound'
import ProductForm from './components/forms/container'

export function getRoutes() {
  return (
    <HashRouter>
      <Main>
        <Switch>
          <Route exact path="/" component={ProductsContainer}/>,
          <Route exact path="/createProduct" component={() => <ProductForm type={'create'} />}/>,
          <Route exact path="/updateProduct:id" component={(router) => <ProductForm type={'update'} id={router.match.params.id} />}/>,
          <Route path="*" component={NotFound}/>,
        </Switch>
      </Main>
    </HashRouter >
  )
}

export default getRoutes
