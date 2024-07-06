import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

function Search() {
  const navigate=useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [keyword, setKeyword]=useState("");

  const handleMouseOver = () => {
    setIsHovered(true);
  };
  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const navigatePage = async (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/search-result?name=${keyword.trim()}`);
    } else {
      navigate("/products");
    }
  };
  // position fixed
  return (
    <div className=" h-[100vh] bg-gray-300 fixed top-0 left-0 w-full flex justify-center text-center m-auto">
      <div className='m-auto'>
        <form onSubmit={navigatePage}>
        <input type="text" placeholder='Search Your Items.....' className='w-[50vw] h-[10vh] border-[1.5px] border-[rgba(170,52,5,0.5)] font-cursive font-normal rounded-md m-auto text-base text-[rgba(170,52,5,0.8)] text-center' onChange={(e)=>setKeyword(e.target.value)}/>
        <button type='submit' className='search_button border-[1.5px] border-[rgba(170,52,5,0.5)] h-[5vmax] w-[10vmax] rounded-md m-1 bg-[rgb(164,82,35)] font-cursive font-normal text-lg ' style={{
            backgroundColor: isHovered ? 'tomato' : 'rgb(214, 106, 70)',
            transition: 'background-color 0.2s',
          }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}>Search
          </button>
        </form>
      </div>
    </div>
  )
}

export default Search
