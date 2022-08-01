import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    align-items: flex-end;
    width: auto;
    margin: 40px 0;
`;

export const ContainerNumber = styled.div`
    flex: 0 0 33%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;
    &:last-child {
        margin: 0 auto;
    }
`;
