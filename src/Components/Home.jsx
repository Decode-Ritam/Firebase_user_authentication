import React from 'react'
import styled from 'styled-components'

function Home() {
    return (
        <Container>
            <h1 className='my-5'>This is Home Page</h1>
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
export default Home