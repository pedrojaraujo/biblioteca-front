import { useEffect, useState } from 'react';

export default function useLogado() {
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token !== null) {
      setLogado(true);
    }
    return;
  }, []);

  return { logado };
}
