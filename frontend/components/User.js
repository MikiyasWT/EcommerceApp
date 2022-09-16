import {FaUserCircle} from 'react-icons/fa'
import { useRouter } from 'next/router'
import styled from "styled-components"


export default function User(){
    const route = useRouter();

    return(
        <div onClick={() => route.push("/api/auth/login")}>
           <FaUserCircle />
           <h3>Profile</h3>
        </div>
    );
}