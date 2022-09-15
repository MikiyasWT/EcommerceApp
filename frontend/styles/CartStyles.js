import Styled from "styled-components"
const  {motion} = require('framer-motion')

export const CartWrapper = Styled(motion.div)`
position:fixed;
right:0;
top:0;
height:100%;
width:100%;
background:rgba(0,0,0,0.4);
z-index:100;
display:flex;
overflow-y: hidden;
justify-content:flex-end;

`;

export const CartStyle = Styled(motion.div)`
width: 30%;
background:#f1f1f1;
overflow-y: auto;
overflow-x: hidden;
position:relative;
margin:0rem 1rem;
padding:0rem 1rem;
`;

export const Card = Styled(motion.div)`
display:flex;
align-items:center;
justify-content:space-between;
border-radius:1rem;
overflow: hidden;
background:white;
padding:1rem;
margin:1rem 0rem;

img {
    width: 8rem;
    padding-right: 1rem;
}
`;


export const CardInfo = Styled(motion.div)`
width:100%;
div {
    display:flex;
    flex-direction:space-between;
}
margin:1rem;
`;

export const EmptyStyle = Styled(motion.div)`
position:absolute;
top:25%;
left:50%
transform:translate(-50%,0%);
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
height:50%;
width:100%;
overflow-y: hidden;
h1 {
    
    font-size:2rem;
    padding:2rem;
}
svg {
    font-size:10rem;
    color:var(--secondary);
}
`;

export const Checkout = Styled(motion.div)`

button {
    
    background:var(--primary);
    color:white;
    padding:1rem 2rem;
    margin-top:2rem;
    margin-bottom:2rem;
    width: 100%;
    cursor:pointer;
    border:none;
    
}

h3{
    font-size:1rem;
}
`;

export const Cards = Styled(motion.div)`

`;