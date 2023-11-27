import { FaArrowUp } from "react-icons/fa";

function ScrollButton(){

    

    return (
 <>
            <a href="#header">
            <button style={{
                position: "fixed",
                bottom: "40px",
                right: "40px",
                height: "40px",
                width: "40px",
                fontSize:"30px",
                backgroundColor:"lightgrey",
                display:"flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  borderRadius:"5px",
  opacity:"0.7"
            }}><div><FaArrowUp/></div></button> </a>
            </>
        )
     
    
}
export default ScrollButton;