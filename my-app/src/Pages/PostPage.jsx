import React, { useEffect, useState } from 'react';
import {Text,Image ,Button,Link } from '@chakra-ui/react';
import Styles from "../Styles/posts.module.css";
import {useNavigate} from "react-router-dom";

const blogImg=[
    "https://thumbs.dreamstime.com/b/blogging-blog-concepts-ideas-worktable-blogging-blog-concepts-ideas-white-worktable-110423482.jpg",
    "https://thumbs.dreamstime.com/b/blog-pen-close-up-34258904.jpg?w=992",
    "https://thumbs.dreamstime.com/b/female-copywriter-her-workplace-home-writing-new-text-using-laptop-wi-fi-internet-connection-morning-71059878.jpg?w=768",
    "https://thumbs.dreamstime.com/b/blog-written-typewriter-9069205.jpg?w=992",
    "https://thumbs.dreamstime.com/b/word-blog-pink-peonies-rustic-wooden-background-92093523.jpg?w=768"
]


function PostPage() {
    const [load, setLoad]=useState(false);
    const [page, setPage]=useState(1);
   const [data, setData]=useState([])
    const navigate=useNavigate()
    

    useEffect(()=>{
        getData(page)
    },[page])


    const getData=(page)=>{
        setLoad(true);
        fetch(`https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=5`)
        .then(res=>res.json())
        .then((res)=>{
            setData(res);
            // console.log(res);
            setLoad(false);
        })
        .catch((err)=>{
            console.log(err.message);
            setLoad(false);
        })
       }

       const handlePaginetion=(val)=>{
        if(val==-1 && page<=1){
            setPage(1);
        }
        else{
            setPage(page+val)
        }
    
       }

   

       

  return load ? <Text fontSize={'40px'} as={'b'} >Loading...</Text> :(
    <>
    <div className={Styles.container} >
     
     <div className={Styles.leftContainer} >

     {data.length && data.map((el,i)=>{
        
            return  <div key={i} style={{cursor:"pointer"}} onClick={()=>{
                navigate(`/singlepage/${el.id}`)
            }}>
                
            <div className={Styles.leftChild} >
                <div style={{display:"flex",width:"100%",justifyContent:"space-around"}}>
                    <div style={{width:'70%'}}>
                      
                        <Text fontSize='20px' as='b' >Name : {el.name}</Text>
                        <Text fontSize='16px' >Email : {el.email}</Text>
                        <Text fontSize='16px' >body : {el.body}</Text>
    
                    </div>
    
                    <div style={{border:"1px solid gray", width:'10%',height:"100px",borderRadius:"3px"}}>
                        <img src={blogImg[i]}
                             alt="" 
                             style={{width:"100%",height:"100%"}} />
                    </div>
                </div>
                
            </div>
            <br />
       <br />
            </div>
            
        })}
       
     </div>

     <div className={Styles.rightContainer} >
      
        <div className={Styles.rightChild} >
            <Text fontSize='20px' as='b' >Join webinar for career growth</Text>
            <br />
            <br />
            <Text fontSize='16px' color='gray' >Powered by - Coding Ninja</Text>
            
            <Image
                borderRadius='10px'
                boxSize='100%'
                height='200px'
                src='https://www.besanttechnologies.com/wp-content/uploads/2021/05/Python-Full-Stack-VS-Java-Full-Stack.png'
                alt='Dan Abramov'
                />

            <Text fontSize='16px' color='gray' >Career Growth for Data Analyst vs Full Stack Developer vs Non Tech...</Text>
            <Link href='#'><Text color={'blue.400'}>View details</Text></Link>
        </div>

        <div className={Styles.rightChild} >
            <Text fontSize='20px' as='b' >Join webinar for Data Science</Text>
            <br />
            <br />
            <Text fontSize='16px' color='gray' >Powered by - Coding Ninja</Text>
            
            <Image
                borderRadius='10px'
                boxSize='100%'
                height='200px'
                src='https://d1m75rqqgidzqn.cloudfront.net/wp-data/2019/09/11134058/What-is-data-science-2.jpg'
                alt='Dan Abramov'
                />

            <Text fontSize='16px' color='gray' >Executive Post Graduate Programme in Data Science & AI</Text>
            <Link href='#'><Text color={'blue.400'}>View details</Text></Link>
        </div>

     </div>
    </div>

    <div className={Styles.pagination}>
    <Button colorScheme='teal' size='lg' w='150px' onClick={()=>{handlePaginetion(-1)}}>Prev</Button>
    <Button colorScheme='teal' variant='ghost' size='lg'>{page}</Button>
    <Button colorScheme='teal' size='lg'  w='150px' onClick={()=>{handlePaginetion(1)}}>Next</Button>
    </div>
                
    </>
  )
}

export default PostPage

