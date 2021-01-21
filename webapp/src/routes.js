import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Global } from '@emotion/core'
import { Home, Pie, TopNav } from './home'

const AppRouter = () => {
  return (
    <Router>
      <Global
        styles={{
          h3: {
            fontSize: '20px',
            fontWeight: 600,
          }
        }}
      />
      <TopNav>
        <Switch>
          <Route component={Home} exact path='/' />
          <Route component={Pie} exact path='/summary' />
        </Switch>
      </TopNav>
    </Router>
  )
}

export default AppRouter

// const layoutStyle = css`
//     display: grid;
//     grid-row-gap: 24px;
//     padding: 8px;
// `

// const navStyle = css`
//   grid-row: 1;

//   & > ul {
//       display: flex;
//       flex-direction: row;
//       list-style-type: none;
//   }

//   & > ul > li:not(:first-of-type) {
//     margin-left: 16px;
//   }
// `

// const contentStyle = css`
//   grid-row: 2;
// `
