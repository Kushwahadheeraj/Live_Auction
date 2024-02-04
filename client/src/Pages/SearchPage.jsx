import { useParams } from "react-router-dom";
import Navbar from "../Components/NavBar/NavBar";
import Footer from "../Components/Footer/Footer";
import { useSelector} from "react-redux"
import Pagination from "../Components/Widgets/Pagination/Pagination";
import PostCard from "../Components/Posts/PostCard";
import { useState, React } from "react";
import LinearProgress from '@mui/material/LinearProgress';
import { Grid} from '@mui/material'

export default function SearchPage() {
  const {_id} = useParams();
  const posts = useSelector((state) => state.posts)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage ] = useState(8)

  const foundPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(_id.toLowerCase())
  );
  

  const lastPostIndex = currentPage * postsPerPage
  const firstPostIndex = lastPostIndex - postsPerPage
  const pagePosts = foundPosts.slice(firstPostIndex, lastPostIndex)
  

  console.log(foundPosts);
  return (
    <>
        <Navbar/>
        {
            !foundPosts.length ? <LinearProgress />:
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
                totalPosts={foundPosts.length}
                postsPerPage={postsPerPage} 
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                />
            </>
            )
        }
        <Footer />
    </>
  )
}
