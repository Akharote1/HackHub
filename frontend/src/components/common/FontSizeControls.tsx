import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup } from "react-bootstrap";
import { faFont, faMinus, faPlus, faSignOutAlt, faTextWidth } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";

const maxFontSize = 20;
const minFontSize = 14;
const changeInterval = 1;

function FontSizeControls() {
  const [currentSize, setCurrentSize] = useState(16);

  const update = (newSize) => {
    if (!newSize) newSize = currentSize;

    document.getElementsByTagName('html').item(0).style.fontSize = `${newSize}px`;
  }

  useEffect(() => {
    const size = parseInt(localStorage.getItem('font_size') ?? '16');
    setCurrentSize(size);
    update(size);
  }, [])

  const handleMinus = () => {
    if (currentSize <= minFontSize) return;
    const newSize = currentSize - changeInterval;
    setCurrentSize(newSize);
    update(newSize);
    localStorage.setItem('font_size', newSize.toString());
  }

  const handlePlus = () => {
    if (currentSize >= maxFontSize) return;
    const newSize = currentSize + changeInterval;
    setCurrentSize(newSize);
    update(newSize);
    localStorage.setItem('font_size', newSize.toString());
  }

  const handleReset = () => {
    const newSize = 16;
    setCurrentSize(newSize);
    update(newSize);
    localStorage.setItem('font_size', newSize.toString());
  }

  return (
    <ButtonGroup>
      <Button 
        size="sm" 
        style={{minWidth: '36px'}}
        variant="outline-secondary"
        onClick={handleMinus}
        title="Decrease Page Font Size"
        disabled={currentSize <= minFontSize}
      >
        <FontAwesomeIcon icon={faMinus} />
      </Button>

      <Button 
        size="sm" 
        style={{minWidth: '36px'}}
        variant="outline-secondary"
        onClick={handleReset}
        title="Reset Page Font Size"
      >
        <FontAwesomeIcon icon={faFont} />
      </Button>

      <Button 
        size="sm" 
        style={{minWidth: '36px'}}
        variant="outline-secondary"
        onClick={handlePlus}
        title="Increase Page Font Size"
        disabled={currentSize >= maxFontSize}
      >
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </ButtonGroup>
  )
}

export default FontSizeControls;