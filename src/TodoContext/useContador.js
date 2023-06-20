import { useState } from 'react';

function useContador(items) {
    const [contador, setContador] = useState(items);
    return [contador, setContador]
}

export { useContador };