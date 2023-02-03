
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container ,Paper,Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function Post() {
  const classes = useStyles();
  const [post,setPost]=useState([])
  const[profile,setProfile]=useState('');
  const[description,setDescription]=useState('');
  const[exp,setExp]=useState('');
  const paperStyle ={padding :'50px 20px',width :600,margin:"20px auto"}

  const handleClick=(e)=>{
    e.preventDefault()
    const post = {profile,description,exp}
    console.log(post)   
    fetch("Http://localhost:8080/add",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(post)
    }).then(()=>{
        console.log("New Post Added")
    })
    
    
}
useEffect(()=>{
    fetch("http://localhost:8080/getAll")
    .then(res=>res.json())
    .then((result)=>{
        setPost(result);
    })
},[])

  return (
    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:"blue"}}><u>ADD NEW POST</u></h1>
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="outlined-basic" label="Job Profile" variant="outlined" fullWidth
      value={profile}
      onChange={(e)=>setProfile(e.target.value)}
      />
      <TextField id="outlined-basic" label="Job Description" variant="outlined" fullWidth
      value={description}
      onChange={(e)=>setDescription(e.target.value)}
      />
      <TextField id="outlined-basic" label="Experience" variant="outlined" fullWidth
      value={exp}
      onChange={(e)=>setExp(e.target.value)}
      />
      <Button variant="contained" color='secondary' onClick={handleClick}>Submit</Button>
    </form>
    </Paper>

    <h1 style={{color:"blue"}}> JOBS AVAILABLE </h1>
    <Paper elevation={3} style={paperStyle}>
        {post.map(post=>(
            <Paper elevation={6} style={{margin:"10px" ,padding:"15px",textAlign:"left"}} key= {post.id}>
                Job Profile: {post.profile}<br/>
                Job Description: {post.description}<br/>
                Experience: {post.exp} years
                </Paper>
        ))}
    </Paper>

    </Container>
  );
}
