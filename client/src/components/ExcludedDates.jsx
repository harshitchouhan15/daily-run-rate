import React from 'react'
import styled from 'styled-components'

const ExcludedDates = ({dates}) => {
  return (
    <Container>
        {
            dates.map((date,i)=>(
                <span key={i}>{date},</span>
            ))
        }
    </Container>
  )
}

export default ExcludedDates

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  width: 100%;
  margin-right: 10px;
  height: 100%;
  flex-direction: column;
  /* justify-content: center; */
  color: #616161;
  scroll-behavior:smooth;
  /* padding-top: 10px; */
&:hover{
    overflow-y: scroll;
  scrollbar-width: 5px;
      &::-webkit-scrollbar-track {
  background-color: #c8c5c5; 
  border-radius: 8px;
}
&::-webkit-scrollbar{
 width: 5px;
}
&::-webkit-scrollbar-thumb {
  background-color: #94bbf5; 
}}


`
