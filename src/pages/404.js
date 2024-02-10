import React from 'react'

import Page from '../components/Page'
import Metadata from '../components/Metadata'
import HeaderNav from '../components/HeaderNav'
import { PageStyle, Content } from '../components/Layout'

const Four0Four = ({ location }) => (
  <Page>
    <Metadata
      title="Whoops"
      description="Sorry, the page you're looking for does not exist."
      pathname={location.pathname}
    />

    <PageStyle>
      <HeaderNav />
      <Content>
        <h2>404 <span role="img" aria-label="shocked face emoji">😱</span></h2>
        <p>
          Sorry, the page you're looking for does not exist.<br />
          Return home by clicking my name above.
        </p>
      </Content>
    </PageStyle>
  </Page>
)

export default Four0Four
