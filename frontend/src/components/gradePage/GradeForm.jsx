import React, {useRef, useEffect} from 'react'

const GradeForm = ({isGradeFormOpen, setIsGradeFormOpen, handleSubmitGradeForm}) => {

    const gradeFormRef = useRef(null);

    useEffect(() => {
        if (isGradeFormOpen) {
            gradeFormRef.current.showModal();
        } else {
            gradeFormRef.current.close();
        }
    }, [isGradeFormOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Form submitted");
        setIsGradeFormOpen(false);
    }

  return (
    <div>
        <dialog ref={gradeFormRef} className="modal">
            <div className="modal-box">
                <form onSubmit={(e) => {
                    handleSubmitGradeForm();
                }} className="flex flex-col gap-4">
                    <div>
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => {setIsGradeFormOpen(false)}}>✕</button>
                    </div>
                </form>
            </div>
        </dialog>
    </div>
  )
}

export default GradeForm