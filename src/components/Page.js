import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'

import { Center } from './Layout'
import Footer, { Container, Segment, Bottom } from './Footer'
import Avatar from './Avatar'
import About, { AboutSegment } from './About'
import SocialLink, { LinksSegment } from './SocialLink'

const Page = ({ children }) => (
  <Fragment>
    <Helmet>
      {/* Favicon */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#25343e" />
      <meta name="msapplication-TileColor" content="#00aba9" />
      <meta name="theme-color" content="#ffffff" />

      {/* Analytics Tracking Metadata */}
      <script>var clicky_site_ids = clicky_site_ids || []; clicky_site_ids.push(101182604);</script>
      <script async src="//static.getclicky.com/js"></script>

      {/* Font for social icons */}
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous" />
    </Helmet>

    {children}

    <Footer>
      <Container>
        <Segment style={{ gridArea: 'avatar', marginTop: '1rem' }}>
          <Avatar />
        </Segment>

        <AboutSegment>
          <About />
        </AboutSegment>

        <LinksSegment>
          <SocialLink which="linkedin" path="/in/benzenker" />
          <SocialLink which="github" path="/benz2012" />
          <SocialLink which="facebook" path="/ben.zenker" />
          <SocialLink which="youtube" path="/user/Enigma3Cubed" />
          <SocialLink which="medium" path="/@benzenker" />
        </LinksSegment>
      </Container>

      <Center>
        <Bottom>I'm Ben Zenker</Bottom>
      </Center>
    </Footer>
  </Fragment>
)

export default Page
