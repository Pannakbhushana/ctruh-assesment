import React, { useEffect, useState } from 'react';
import {Text,Image ,Button,Link,Box } from '@chakra-ui/react';
import Styles from "../Styles/posts.module.css";
import {useParams} from "react-router-dom";


const blogImg=[
    "https://thumbs.dreamstime.com/b/blogging-blog-concepts-ideas-worktable-blogging-blog-concepts-ideas-white-worktable-110423482.jpg",
    "https://thumbs.dreamstime.com/b/blog-pen-close-up-34258904.jpg?w=992",
    "https://thumbs.dreamstime.com/b/female-copywriter-her-workplace-home-writing-new-text-using-laptop-wi-fi-internet-connection-morning-71059878.jpg?w=768",
    "https://thumbs.dreamstime.com/b/blog-written-typewriter-9069205.jpg?w=992",
    "https://thumbs.dreamstime.com/b/word-blog-pink-peonies-rustic-wooden-background-92093523.jpg?w=768"
]

function SinglePostPage() {
    const [data, setData]=useState({});
    const [comentData, setComentData]=useState([]);
    const [load, setLoad]=useState(false);
  
   

    const {id}=useParams()

    useEffect(()=>{
        getData(id);
        getComentData(id)
    },[])

    const getData=(id)=>{
        setLoad(true);
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(res=>res.json())
        .then((res)=>{
            setData(res);
            setLoad(false);
            // console.log(res);
    
        })
        .catch((err)=>{
            console.log(err.message);
            setLoad(false);
        })
       }


       const getComentData=(id)=>{
        setLoad(true);
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        .then(res=>res.json())
        .then((res)=>{
            setComentData(res);
            // setLoad(false);
            console.log(res);
    
        })
        .catch((err)=>{
            console.log(err.message);
            setLoad(false);
        })
       }
       
      

       const handleFav=()=>{
        let list=JSON.parse(localStorage.getItem("Favourite"))||[];
            list.push(data);
           localStorage.setItem("Favourite",JSON.stringify(list));
            alert("Post added to Faveriot List")
       }

       const handleLike=()=>{
        let list=JSON.parse(localStorage.getItem("Liked"))||[];
        list.push(data);
        localStorage.setItem("Liked",JSON.stringify(list));
        alert("Post Liked !")
        
       }
    
  return load ? <Text fontSize={'40px'} as={'b'} >Loading...</Text> :  (
    <div className={Styles.container}>     
     <div className={Styles.leftContainer} >
      
        <div className={Styles.leftChild} >
            <div style={{display:"flex",width:"100%",justifyContent:"space-around"}}>
                <div style={{width:'70%'}}>
                
                        <Text fontSize='20px' as={'b'} >Title : {data.title}</Text>
                        <br />
                        <br />
                        <Text fontSize='16px' >Description : {data.body}</Text>
                </div>

                <div style={{border:"1px solid gray", width:'30%',height:"200px",borderRadius:"5%"}}>
                    <img src={blogImg[id%5]}
                         alt="" 
                         style={{width:"100%",height:"100%",borderRadius:"5%"}} />
                </div>
            </div>
          
            <div className={Styles.applySection}>
                <Button colorScheme='teal' size='lg' w='150px' borderRadius='50px' variant='outline' onClick={handleFav} >Favourite</Button>
                <Box w='50px'></Box>
                <Button colorScheme='teal' size='lg' w='150px' borderRadius='50px' onClick={handleLike}>Like</Button>
            </div>
        </div>
     
        <div className={Styles.leftChild}>
          

             <br />
             <br />
             <Text fontSize='16px'  as='b' >Comments</Text> 
               

                {comentData.length && comentData.map((el)=>{
                    return <div>
                        <p>Name : {el.name}</p>
                        <p>Email : {el.email}</p>
                        <Text as="b">Comment : {el.body}</Text>
                        <br />
                        <br />
                    </div>
                })}

        </div>

        
        
     </div>




     <div className={Styles.rightContainer} >
        <div className={Styles.rightChild} >
            <Text fontSize='20px' as='b' >Jobs you might be interested in</Text>
            <br />
            <br />
            <Text fontSize='16px' color='gray' >Campus Ambassador (Only Bangalore College Students may apply)</Text>
            <br />
            <Text fontSize='16px' color='gray' >Wonksknow Technologies</Text>
            <br />
            <Button colorScheme='gray' size='md' borderRadius='20px' >Remote</Button>
            <Button colorScheme='gray' size='md' borderRadius='20px' >Bangalore/Bengaluru</Button>
            <br />

            <Text fontSize='16px' color='gray' >Preferred Salary</Text>
            <br />
            <Button colorScheme='gray' size='md' borderRadius='20px' >6 LPA</Button>
        </div>


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


     </div>
        
    </div>
  )
}

export default SinglePostPage
