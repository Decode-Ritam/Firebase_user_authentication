import React from 'react'
import styled from 'styled-components'

function About() {
  return (
    <Container>
      <h1>This is About Page.. </h1>
    </Container>
  )
}
const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
background-color: gray;
height:100vh;
margin: 0;
padding: 0;
h1{
    color: white;

}
  `

export default About