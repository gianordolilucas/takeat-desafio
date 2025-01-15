import { Box, Accordion, AccordionSummary, AccordionDetails, Typography, Button } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const HelpPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ padding: 2}}>
      <Button 
        startIcon={<ArrowBack />} 
        onClick={() => navigate(-1)} 
        sx={{ marginBottom: 2 }}
      >
        Voltar
      </Button>


      <Typography variant="h4" gutterBottom>Ajuda</Typography>
      
      <Box sx={{ padding: 2, overflowY: 'auto', maxHeight: '80vh' }}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>O que é o useEffect, sua usabilidade e quando utilizá-lo?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              O `useEffect` é um hook do React utilizado para realizar efeitos colaterais em componentes funcionais. Ele permite executar código após a renderização, como buscar dados, manipular o DOM ou definir timers. Um cenário típico de uso é ao buscar dados de uma API, onde você pode invocar o `useEffect` para fazer a requisição logo após a renderização do componente.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Quando usar o useState e qual a correlação com o useEffect?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              O `useState` é utilizado para armazenar e atualizar o estado de um componente. Em conjunto com o `useEffect`, você pode disparar efeitos colaterais toda vez que o estado é atualizado. Por exemplo, ao adicionar um item ao carrinho (usando `useState`), podemos atualizar a quantidade de itens no carrinho e, em seguida, usar `useEffect` para salvar o carrinho em um banco de dados ou localStorage sempre que o estado for alterado.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>O que é o useCallback e em qual cenário utilizá-lo?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              O `useCallback` é um hook que memoriza funções, evitando que sejam recriadas a cada renderização. Isso é útil para otimizar o desempenho em componentes que passam funções como props para componentes filhos, evitando renders desnecessários. Um cenário comum é em componentes que possuem listas e funções de filtragem. Ao usar `useCallback`, a função não será recriada a cada render, o que ajuda a melhorar a performance.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Como o useContext pode ser utilizado em um menu dinâmico de restaurante?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              O `useContext` é ótimo para gerenciar estados globais e compartilhá-los entre componentes sem precisar passar props manualmente. Em um cenário real, como um menu dinâmico de restaurante, você pode usar o `useContext` para armazenar o menu em um contexto. A partir daí, qualquer componente pode acessar esse menu sem precisar fazer requisições repetidas. Isso melhora a performance, pois o menu é carregado uma vez e depois gerenciado através do contexto, evitando renderizações excessivas.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Em qual caso você aplicaria o uso do useImperativeHandle?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              O `useImperativeHandle` permite que você personalize os valores ou métodos que um componente expõe para seus pais. Normalmente, é utilizado em casos em que você precisa controlar um componente filho diretamente de um componente pai, como por exemplo, para chamar funções de validação ou controle de foco em um formulário. Isso é especialmente útil quando o componente filho precisa expor funcionalidades específicas para o pai de maneira controlada.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

    </Box>
  );
};

export default HelpPage;
