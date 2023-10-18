import styled from  "styled-components"
 import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import axios from "axios";
import ExcludedDates from "./ExcludedDates";

const Table = () => {
    const [data,setData] = useState([])

    useEffect(()=>{
      const getDRRData = async()=>{
        try{
          const res = await axios.get('https://daily-run-rate-4fda76afee54.herokuapp.com/api/drr/')
          const drrData = res.data.reverse();
          drrData.forEach((data,i)=>{
            data.id=i+1
          })
          setData(drrData)
        }catch(err){
          console.log(err)
        }
      }
      getDRRData()
    },[])

  return (
    <Container>
   <DataGrid
    rows={data}
    columns={columns}
    initialState={{
      pagination: {
        paginationModel: { page: 0, pageSize: 6 },
      },
    }}
    pageSizeOptions={[6, 12]}
   />
  </Container>
  )
}

export default Table

const Container = styled.div`
@media screen and (max-width:768px){
  width: 100vw;
  height: max-content;
  overflow-x: scroll;
  display: flex;
  justify-content: center;
  align-items: center;
}
`
const columns = [
  { field: 'id', headerName: 'ID', width: 60 },
  { field: 'startDate', headerName: 'Start Date', width: 130 },
  { field: 'endDate', headerName: 'End Date', width: 130 },
  {
    field: 'startMonth',
    headerName: 'Month,Year',
    width: 90,
  },
  {
    field: 'excludedDates',
    headerName: 'Dates Excluded',
    height:300,
    width: 150,
    renderCell:(params)=><ExcludedDates dates={params.row.excludedDates} />
  },
  {
    field:'numberOfDays',
    headerName:'Number of Days',
    width: 150,
  },
  {
    field:'leadCount',
    headerName:'Lead Count',
    width: 150,
  },
  {
    field:'expectedDRR',
    headerName:'Expected DRR',
    width: 150,
    renderCell:(params)=>parseInt(params.row.expectedDRR)
  },
  {
    field:'createdAt',
    headerName:'Last Updated',
    width: 180,
    renderCell:(params)=>(
      <>
      <span>{new Date(params.row.createdAt).toISOString().split('T')[0]} </span>,
      <span>{new Date(params.row.createdAt).getHours()}:{new Date(params.row.createdAt).getMinutes()}:
      {new Date(params.row.createdAt).getSeconds()} </span>
      </>
      )
  },
];



  
