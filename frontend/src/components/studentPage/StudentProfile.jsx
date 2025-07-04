import React, { useEffect, useRef } from 'react'

const StudentProfile = ({isStudentProfileOpen, setIsStudentProfileOpen}) => {

    const studentProfileRef = useRef(null)
    useEffect(() => {
        isStudentProfileOpen ? (
            studentProfileRef.current?.showModal()
        ) : (
            studentProfileRef.current?.close()
        )
    },[isStudentProfileOpen])

  return (
    <div>
        <dialog ref={studentProfileRef} id="my_modal_3" className="modal">
        <div className="modal-box">
            <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
        </dialog>
    </div>
  )
}

export default StudentProfile