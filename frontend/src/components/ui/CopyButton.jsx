import React, { useState } from 'react';
import { MdContentCopy, MdCheck } from "react-icons/md"; // Import checkmark icon
import toast from 'react-hot-toast';

// In your component where the copy button is used:
const CopyButton = ({ textToCopy }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      toast.success("Copied to clipboard");
      
      // Reset after 1 second
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    } catch (error) {
      console.error("Error copying to clipboard: ", error);
      toast.error("Error copying to clipboard");
    }
  };

  return (
    <button 
      onClick={handleCopy} 
      className='btn btn-ghost btn-base btn-xs'
      aria-label={isCopied ? "Copied!" : "Copy to clipboard"}
    >
      {isCopied ? <MdCheck className='text-green-500' /> : <MdContentCopy className='text-neutral-700' />}
    </button>
  );
};

export default CopyButton