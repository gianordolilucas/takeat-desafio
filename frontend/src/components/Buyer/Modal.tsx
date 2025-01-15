import { useState } from 'react';
import InputMask from 'react-input-mask';
import { Box, TextField } from '@mui/material';

interface Props {
  buyerName?: string;
  buyerPhone?: string;
  handleSaveBuyer: ({ buyerName, buyerPhone }: { buyerName: string; buyerPhone: string }) => void;
}

const BuyerEditor = ({ buyerName, buyerPhone, handleSaveBuyer }: Props) => {
  const [name, setName] = useState(buyerName || '');
  const [phone, setPhone] = useState(buyerPhone || '');
  const [phoneIsValid, setPhoneIsValid] = useState(true);

  // Função chamada sempre que o nome ou telefone muda, para salvar os dados.
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    handleSaveBuyer({ buyerName: newName, buyerPhone: phone }); // Salva diretamente ao alterar o nome
  };

  const isPhoneValid = (phone: string) => {
    const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value;
    setPhone(newPhone);
    handleSaveBuyer({ buyerName: name, buyerPhone: newPhone });
    const isValid = isPhoneValid(newPhone);
    setPhoneIsValid(isValid);

    if (isValid) {
      handleSaveBuyer({ buyerName: name, buyerPhone: newPhone });
    }
  };

  return (
    <Box>
      <Box>
        <TextField
          label="Nome"
          value={name}
          onChange={handleNameChange} 
          fullWidth
          margin="dense"
        />
        <InputMask
          mask="(99) 99999-9999"
          value={phone}
          onChange={handlePhoneChange} 
        >
          {() => (
             <TextField
             label="Telefone"
             fullWidth
             margin="dense"
             error={!phoneIsValid}
             helperText={!phoneIsValid ? "Número de telefone inválido" : ""}
           />
          )}
        </InputMask>
      </Box>
    </Box>
  );
};

export default BuyerEditor;
