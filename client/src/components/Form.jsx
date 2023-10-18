import { Button, Modal } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import axios from "axios"

const Form = ({openModal, setOpenModal}) => {
    const [inputs,setInputs] = useState({})
    const [excludedDates,setExcludedDates] = useState([])
    const [excludedDate,setExcludedDate] = useState(null)

    useEffect(()=>{
        setInputs(i=>{
            return {...i,excludedDates}
        })
    },[excludedDates])

    //Range for dates
    const minDateString = inputs.startDate ? new Date(inputs.startDate).toISOString().split('T')[0] : '';
    const maxDateString = inputs.endDate ? new Date(inputs.endDate).toISOString().split('T')[0] : '';

    //Calculating number of days
    const startDate = inputs.startDate? new Date(inputs.startDate):'';
    const endDate =  inputs.endDate ? new Date(inputs.endDate):"";
    const timeDifference = endDate - startDate; // Result in milliseconds
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24); // Convert to days

    //Storing user inputs in inputs state variable
    const handleChange = (e)=>{
        const value = e.target.value;
        setInputs(i=>{
            return {...i,[e.target.name]:value}})
    }

    //Making api request to save data
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const drrData={
            ...inputs,
            startMonth:new Date(inputs.startDate).getMonth()+1,
            startYear:new Date(inputs.startDate).getFullYear(),
            expectedDRR:inputs.leadCount/(daysDifference-excludedDates.length+1),
            numberOfDays:daysDifference-excludedDates.length+1
        }
        try{
            await axios.post('https://daily-run-rate-4fda76afee54.herokuapp.com/api/drr/create',drrData)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

  return (
    <Modal open={openModal} onBackdropClick={()=>setOpenModal(false)} >

        <Container onSubmit={handleSubmit} >

        <Section>
            <label htmlFor="startDate">Start Date</label>
             <Input id="startDate" name='startDate' max={maxDateString}  required type='date' onChange={handleChange} />
        </Section>
        <Section>
            <label htmlFor="endDate">End Date</label>
            <Input id="endDate" name='endDate'   min={minDateString} required type='date' onChange={handleChange} />
        </Section>
        <Exclude>
            <Section>
            <label htmlFor="excludedDate">Exclude Date</label>
            <Input
             id="excludedDate" type='date' 
             min={minDateString}
             max={maxDateString}          
             onChange={(e)=>setExcludedDate(e.target.value)} />
             </Section>
          <Button disabled={!excludedDate} variant="outlined" 
          onClick={()=>{
            if(excludedDate >= minDateString && excludedDate <= maxDateString){
                setExcludedDates(d=>[excludedDate,...d]);
                setExcludedDate(null)
                }else{
                    alert('Please select a date between start date and end date.')
                    setExcludedDate(null)
                }
                }} >Exclude</Button>
        </Exclude>

       {excludedDates.length>0 &&
        <ExcludeDates>
        {excludedDates.map((date,i)=>(
            <ExcludedDate key={i} >
                <span>{date}</span>
                <CloseIcon onClick={()=>setExcludedDates(excludedDates.filter(d=>d!==date))} />
            </ExcludedDate>
        ))}
        </ExcludeDates>}

        <Section>
            <label htmlFor="leadCount">Lead Count</label>
        <Input id="leadCount" type='number' name='leadCount' required  onChange={handleChange} />
        </Section>
        
        <StyledButton type='submit' variant="contained">Save</StyledButton>

        <Close>
        <CloseIcon htmlColor='crimson' fontSize='large' onClick={()=>setOpenModal(false)} />
        </Close>
        </Container>
    </Modal>
  )
}

export default Form

const Container = styled.form`
    width: 60vw;
    height: 70vh;
    padding: 40px;
    background-color: white;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap:35px;
    overflow-y: auto;
    scrollbar-width: 5px;
      &::-webkit-scrollbar-track {
  background-color: #c8c5c5; 
}
&::-webkit-scrollbar{
 width: 10px;
}
&::-webkit-scrollbar-thumb {
  background-color: #4394e5; 
}
    @media screen and (max-width:768px) {
        width: 90vw;
        height: 70vh; 
        padding: 40px 10px;

    }
`

const Input = styled.input`
    border: none;
    border-bottom: 0.5px solid #474747;
    font-size: 15px;
    padding: 3px;
    &:focus{
        outline: none;
        border-bottom: 1px solid #222;
    }
`

const Section = styled.section`
   display: flex;
   width: 35%;
   gap:10px;
   flex-direction: column;
   @media screen and (max-width:768px) {
        width: 60%;
        gap: 7px;
    }
`
const Exclude = styled.div`
   display: flex;
   gap:10px;
   align-items: flex-end;
`
const ExcludeDates = styled.div`
   display: flex;
   gap:10px;
   flex-wrap: wrap;
`
const ExcludedDate = styled.span`
    display: flex;
    gap: 5px;
    align-items: center;
    border-radius: 10px;
    padding: 10px;
    background-color: #93fd93;
    &>:last-child{
        cursor: pointer;
    };
    &:hover{
    background-color: #56e756;

    }
`

const StyledButton = styled(Button)`
    margin-top: 30px!important;
    align-self: start;
`

const Close = styled.span`
position: absolute;
top: 5px;
right: 5px;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
`