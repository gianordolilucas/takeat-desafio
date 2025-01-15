import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import InputMask from 'react-input-mask';

interface Props {
  open: boolean;
  onClose: () => void;
  buyerName?: string;
  buyerPhone?: string;
  handleSaveBuyer: ({ buyerName, buyerPhone }: { buyerName: string; buyerPhone: string }) => void;
}

const ModalBuyer = ({ open, onClose, buyerName, buyerPhone, handleSaveBuyer }: Props) => {
  const [name, setName] = useState(buyerName || '');
  const [phone, setPhone] = useState(buyerPhone || '');

  const handleCloseModal = () => {
    onClose();
    setName('');
    setPhone('');
  };

  const handleSave = () => {
    handleSaveBuyer({ buyerName: name, buyerPhone: phone });
    handleCloseModal();
  };

  return (
    <Dialog open={open} onClose={handleCloseModal}>
      <DialogTitle>Informações do Comprador</DialogTitle>
      <DialogContent>
        <TextField
          label="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="dense"
        />
        <InputMask
          mask="(99) 99999-9999"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        >
          {() => (
            <TextField
              label="Telefone"
              fullWidth
              margin="dense"
            />
          )}
        </InputMask>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal}>Cancelar</Button>
        <Button onClick={handleSave} color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalBuyer;
