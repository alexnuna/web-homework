import * as React from 'react'

import { Link, useLocation } from 'react-router-dom'

const BASE_TAB_STYLE = {
  textAlign: 'center',
  fontWeight: 600,
  fontSize: 16,
  padding: '0px 40px'
}

const MainMenu = () => {
  const location = useLocation()

  return (
    <div>
      <Link
        css={{
          ...BASE_TAB_STYLE,
          color: '#9BD7C8',
          ...(!location.pathname.includes('summary') && {
            color: '#FFFFFF'
          }),
          ':hover': {
            color: '#FFFFFF'
          }
        }}
        to='/'
      >
        Home Page
      </Link>
      <Link
        css={{
          ...BASE_TAB_STYLE,
          color: '#9BD7C8',
          ...(location.pathname.includes('summary') && {
            color: '#FFFFFF'
          }),
          ':hover': {
            color: '#FFFFFF'
          }
        }}
        to='/summary'
      >
        Summary
      </Link>
    </div>
  )
}

export const TopNav = ({ children }) => (
  <div
    css={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      height: '100vh',
      minWidth: 1024
    }}>
    <header
      css={{
        padding: '20px 28px 0px',
        background: '#142E52'
      }}
    >
      <div
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          paddingTop: 10
        }}
      >
        <div
          css={{
            fontSize: 20,
            margin: 2,
            flex: '1 1 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
            minWidth: 0
          }}
        >
          <h2
            css={{
              color: '#FFFFFF',
              marginBottom: 0
            }}
          >
            Divvy App
          </h2>
        </div>
        <div
          css={{
            flex: '0 0 auto',
            display: 'flex'
          }}
        >
          <MainMenu />
        </div>
      </div>
    </header>
    <div css={{ flex: '1 0 auto' }}>{children}</div>
  </div>
)
