import styled from "styled-components";
export const Container = styled.div`
position: relative;
height: 100vh;
width: 100vh;
 .panel{
    height: 60vh;
 }
 .left-bottom-text{
  position: absolute;
  left: 0;
  bottom: 0;
  color: #fff;
  font-size: 12px;
  width: 400px;
 }
`
export const TextContainer = styled.div`
overflow:hidden;
height:60vh;
margin-top: 20vh;
 .scroll-wrap{
    height:60vh;
    position: relative;
 width: 100%;
 }
 .text-row{
    font-size: 30px;
    color: #fff;
 }
`