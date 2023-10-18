import { Fab, Tooltip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import styled from 'styled-components';
import Form from './Form';
import { useState } from 'react';

const Add = () => {
    const [openModal,setOpenModal] = useState(false)
  return (
    <Container>
         <Tooltip title="Add new data" placement="left">
           <Fab  color="primary" onClick = {()=>setOpenModal(true)} >
              <AddIcon/> 
          </Fab>
          </Tooltip>
          <Form setOpenModal={setOpenModal} openModal={openModal} />
    </Container>
  )
}

export default Add

const Container = styled.div`
    position: fixed;
    bottom: 4%;
    right: 4%;

`