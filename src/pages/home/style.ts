import styled from "styled-components";

export const Container = styled.div`
 .panel-one{
    position: relative;
    .video-background {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;   /* 或具体的宽度 */
  height: 100%;  /* 或具体的高度 */
  overflow: hidden;
}

.video-background video {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  object-fit: cover;
}
 }
`