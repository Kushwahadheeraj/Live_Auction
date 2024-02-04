import { useEffect, useState, React } from 'react'
import { Grid} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import LinearProgress from '@mui/material/LinearProgress';
import { setPosts, setUserPosts } from "../../Redux/store";
import PostCard from './PostCard';
import Pagination from '../Widgets/Pagination/Pagination';

export default function Posts() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token)
  const {_id} = useSelector((state) => state.user)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(8)


  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUsersPosts = async() => {
    const response = await fetch(`http://localhost:3001/posts/${_id}/posts`,
    {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json(); 
    dispatch(setUserPosts({ userPosts: data }));
  }

  const posts = useSelector((state) => state.posts);
  const lastPostIndex = currentPage * postsPerPage
  const firstPostIndex = lastPostIndex - postsPerPage
  const pagePosts = posts.slice(firstPostIndex, lastPostIndex)


  useEffect(() => {
    getPosts();
    getUsersPosts();
  }, []);
  return (
      !posts.length ? <LinearProgress />:
      (
      <>
      <Grid container spacing={3}>
        {pagePosts.map(post => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={post.id}>
            <PostCard post={post} />
          </Grid>
        ))}
      </Grid>
      <Pagination 
        totalPosts={posts.length}
        postsPerPage={postsPerPage} 
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        />
      </>
      )

  )
}
