import React, { useState } from 'react';
import {Text,Box,Input,Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from "react-redux";
import { getTodoSuccessAction } from '../Redux/action';
import {Link} from "react-router-dom";
import Styles from "../Styles/posts.module.css";

const arr=['Instagram >','Facebook >','Twitter >','Quora >','LinkedIn  >' ];
const arr2=['Reddit >','BizSugar >','Dzone >','Flipboard >','Listly >' ];
const blogImg=[
  "https://thumbs.dreamstime.com/b/blogging-blog-concepts-ideas-worktable-blogging-blog-concepts-ideas-white-worktable-110423482.jpg",
  "https://thumbs.dreamstime.com/b/blog-pen-close-up-34258904.jpg?w=992",
  "https://thumbs.dreamstime.com/b/female-copywriter-her-workplace-home-writing-new-text-using-laptop-wi-fi-internet-connection-morning-71059878.jpg?w=768",
  "https://thumbs.dreamstime.com/b/blog-written-typewriter-9069205.jpg?w=992",
  "https://thumbs.dreamstime.com/b/word-blog-pink-peonies-rustic-wooden-background-92093523.jpg?w=768"
]

function HomePage() {
    const [search, setSearch]=useState("");
    const [load, setLoad]=useState(false);

    const navigate=useNavigate();

    const {data}=useSelector((store)=>{
        return store;
    })
    const dispatch=useDispatch();


    const handleChange=(e)=>{
        setSearch(e.target.value);
    }

    const handleSearch=()=>{
        if(search){
            getData(search)
        }
    }

    const handleFev=()=>{
      const data=JSON.parse(localStorage.getItem("Favourite"));
      if(data){
        dispatch(getTodoSuccessAction(data))
      }
        else{
          alert("No Favourite post added")
          
        }
      
    }

    const handleLiked=()=>{
      const data=JSON.parse(localStorage.getItem("Liked"));
      if(data){
        dispatch(getTodoSuccessAction(data))
      }
      else{
        alert("No post Liked")
      }
    }

    const getData=(val)=>{
        setLoad(true);
        fetch(`https://jsonplaceholder.typicode.com/posts/${val}/comments`)
        .then(res=>res.json())
        .then((res)=>{
            dispatch(getTodoSuccessAction(res))
            setLoad(false);
            if(res.length===0){
                alert("No result found, try with another keyword")
            }
    
        })
        .catch((err)=>{
            console.log(err.message);
            setLoad(false);
        })
       }

       

  return load ? <Text fontSize={'40px'} as={'b'} >Loading...</Text> : (
    <div>
      <div style={{marginTop:"5%"}}>
        <Text fontSize='50px' as='b' > Find your Favourite posts in CTRUH_app</Text>
        <Text fontSize='30px' > 5K+ posts for you to explore</Text>
      </div>

      
        <div className={Styles.applySection}>
                <Button colorScheme='teal' size='lg' w='150px' borderRadius='50px' variant='outline' onClick={handleFev} >Filter Favourite</Button>
                <Box w='50px'></Box>
                <Button colorScheme='teal' size='lg' w='150px' borderRadius='50px' onClick={handleLiked} >Filter Liked</Button>
            </div>
        <br />
      <Box  w='60%' marginLeft='20%'  display="flex">
        <Input 
            size='lg' 
            h='70px' 
            variant='filled'  
            placeholder='Search posts by userID' 
            name="username"
            borderLeftRadius='50px'
            borderRightRadius='0px' 
            value={search}
            onChange={handleChange}    />

        <Button 
        colorScheme='teal' 
        w='20%' 
        h='68px' 
        borderRightRadius='50px'
        borderLeftRadius='0px'
        onClick={handleSearch}
        >Search</Button>
      </Box>

      


    <div style={{display:data.length ? "none":"block"}}>

      <Box 
        w='80%' 
        h='70px'
        marginLeft='10%'
        marginTop='5%'
        display='flex'
        justifyContent='space-around'
        >
        {arr.map((el,i)=>{
            return <Button key={i} 
                w='18%' 
                h='70px'
                display='flex' 
                alignItems='center' 
                justifyContent='center' 
                border='1px solid gray' 
                borderRadius='10px'
                cursor='pointer'
                background='white'
                onClick={()=>{navigate("/posts")}}
                >{el}</Button>
            })}
      </Box>

      <Box 
        w='70%' 
        h='70px'
        marginLeft='15%'
        marginTop='1%'
        display='flex'
        justifyContent='space-around'
        >
             {arr2.map((el,i)=>{
                 return <Button key={i} 
                 w='18%' 
                 h='70px'
                 display='flex' 
                 cursor='pointer'
                 alignItems='center' 
                 justifyContent='center' 
                 borderRadius='10px' 
                 border='1px solid gray'
                 background='white'
                 onClick={()=>{navigate("/posts")}}
                 >{el}</Button>
                })}
      </Box>
    </div>

      <div className={Styles.leftContainer} style={{marginLeft:"16%",marginTop:"5%", display:data.length ? "block":"none"}} >

        {data.length && data.map((el,i)=>{
            return  <Link to={`/singlepage/${el.id}`} key={el._id}>
            <div className={Styles.leftChild} >
                <div style={{display:"flex",width:"100%",justifyContent:"space-around"}}>
                    <div style={{width:'70%'}}>
                        <Text fontSize='20px'  as='b' >Title : {el.name}</Text>  
                        <Text fontSize='20px' >Description : {el.body}</Text>
                    </div>
    
                    <div style={{border:"1px solid gray", width:'10%',height:"100px",borderRadius:"3px"}}>
                        <img src={blogImg[i%5]} 
                             alt="" 
                             style={{width:"100%",height:"100%"}} />
                    </div>
                </div>
            </div>
            </Link>
        })}
       
     </div>

    </div>
  )
}

export default HomePage
