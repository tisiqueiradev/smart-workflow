import { Container } from "./style"

export default function Tooltip({direction}) {
    return (
    <>
        <Container direction={direction}/>
        <Container direction={direction}/>
        <Container direction={direction}/>
        <Container direction={direction}/>
    </>
    )
}