import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import UserLinks from '../UserLinks'
import config from '../../../data/SiteConfig'

var imgStyle = {
  height: '48px',
  margin: '15px 15px 15px 15px'
}

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: transparent;

  section {
    margin-top: 20px;
    background-color: transparent;
  }

  .nav-link {
    font-size: 2rem;
    margin-right: 10px;
    font-weight: 200;
    color: black;
    background-color: transparent;
  }

  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;

    section {
      margin-bottom: 20px;
    }

    span {
      display: none;
    }
  }
`



class Navigation extends React.Component {
  render() {
    return (
      <NavContainer>
        <span>
        <Link className="nav-link" to="/">
        {' '} <img style={imgStyle} src={config.siteLogo} width="48px" alt="" />{' '}
</Link> 
        </span>
        <section>

        </section>
        <span>
          <UserLinks />
        </span>
      </NavContainer>
    )
  }
}

export default Navigation
