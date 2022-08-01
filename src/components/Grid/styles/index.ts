import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px 30px 10px 0;
`;

export const Row = styled.div`
    display: flex;
    flex-flow: row;
    margin-bottom: 2px;

    &:nth-child(9) {
        div {
            margin-bottom: 0;
        }
    }
    &:nth-child(3),
    &:nth-child(6) {
        div {
            margin-bottom: 8px;
        }
    }

    div {
        margin-right: 2px;
        &:nth-child(9) {
            margin-right: 0;
        }
        &:nth-child(3),
        &:nth-child(6) {
            margin-right: 8px;
        }
    }
`;
