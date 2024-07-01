

export default function getmyposts() {
    const headers = {
        token: localStorage.getItem("token"),
    };
   async function getMyPost(id) {
   let response = await axios.get(`https://linked-posts.routemisr.com/posts/${id}`, { headers });
    return response.data;
    }

  return (
  
  )
}
