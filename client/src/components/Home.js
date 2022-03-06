import { Container } from "reactstrap";


const Home = (props) => {
    return (
        //<></>
        <Container>
            <div id="header" align="center">
                <p id="items">Home</p>
                <p id="items">New</p>
                <p id="items">Search</p>
                <p id="items">Account</p>
            </div>

            <div id="centro">
                <h1 id="titulo">Welcome Minh!</h1>
                <p id="tituloDiaActual">Listado Actual</p>

                <table id="tabla">
                    <tr>
                        <td>Campo 1</td>
                        <td>Campo 2</td>
                        <td>Campo 3</td>
                    </tr>

                    <tr>
                        <td>Celda 4</td>
                        <td>Celda 5</td>
                        <td>Celda 6</td>
                    </tr>                    
                </table>
            </div>            
        </Container>       
    );
}

export default Home;
