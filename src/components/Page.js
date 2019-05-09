import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'

import Footer, { Container, Segment, Bottom } from './Footer'
import Avatar from './Avatar'
import { Center } from './Layout'

const Page = ({children}) => (
  <Fragment>
    <Helmet>
      {/* Analytics Tracking Metadata */}
      <script>var clicky_site_ids = clicky_site_ids || []; clicky_site_ids.push(101182604);</script>
      <script async src="//static.getclicky.com/js"></script>
    </Helmet>

    {children}

    <Footer>
      <Container>
        <Segment>
          <Avatar />
        </Segment>

        <Segment>
          <h3>About Me</h3>
          <hr />
          <p>I am filled with both creative and technological passions. These stem from my love of math and art, which both began at an early age. I spent my teenage years juggling these paths as I created my own video production journey while simultaneously excelling in many STEM courses in school. My degree in Motion Picture Science from RIT had direct correlation to these two fields, integrating imaging technologies with the creative intent of television and film production. By graduation, I had gained another significant interest: Software Engineering. My time as an adult has been spent discovering and learning about Web Development and User Experience.</p>
        </Segment>

        <Segment>social links</Segment>
      </Container>

      <Center>
        <Bottom>I'm Ben Zenker</Bottom>
      </Center>
    </Footer>
  </Fragment>
)

export default Page
