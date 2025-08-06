import React, { useRef, useState, useEffect } from 'react';
import { IoIosClose } from "react-icons/io";
import { FaSave, FaUndo } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import axiosInstance from '../../lib/axios';
import toast from 'react-hot-toast';

const TeacherForm = ({ isTeacherFormOpen, setIsTeacherFormOpen }) => {
    const initialFormState = {
        lastName: '',
        firstName: '',
        middleInitial: '',
        email: '',
        assignedGradeLevel: '',
        contactNumber: '',
        address: {
            street: '',
            barangay: '',
            city: '',
            zip: ''
        },
        dateOfBirth: '',
        gender: '',
        civilStatus: '',
        benefits: {
            sssNumber: '',
            philHealthNumber: '',
            pagIbigNumber: '',
            tinNumber: ''
        },
        dateHired: ''
    };

    const [formData, setFormData] = useState(initialFormState);
    const teacherFormRef = useRef(null);

    useEffect(() => {
        if (isTeacherFormOpen) {
            teacherFormRef.current.showModal();
        } else {
            teacherFormRef.current?.close();
        }
    }, [isTeacherFormOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            address: {
                ...prev.address,
                [name]: value
            }
        }));
    };

    const handleBenefitsChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            benefits: {
                ...prev.benefits,
                [name]: value
            }
        }));
    };

    const handleReset = () => {
        setFormData(initialFormState);
    };

    const handleSubmitTeacherForm = async (formData) => {
        try {
            const response = await axiosInstance.post('/teacher', formData);
            setFormData(initialFormState);
            setIsTeacherFormOpen(false);
            toast.success('Teacher added successfully!');
        } catch (error) {
            console.error("Error adding teacher", error);
            toast.error("Failed to add teacher. Please try again later");
        }
    }

    return (
        <dialog ref={teacherFormRef} id='teacherModal' className="modal modal-middle backdrop-blur-sm">
            <div className="modal-box !max-w-none w-[90vw] md:w-[80vw] lg:w-[70vw] max-h-[90vh] overflow-y-auto pb-0">
                <div className='flex justify-between items-start top-0 z-10'>
                    <div className='flex flex-col'>
                        <h2 className='text-2xl font-bold text-gray-800'>Add New Teacher</h2>
                        <p className='text-gray-500 text-sm'>Complete all required fields (*)</p>
                    </div>
                    <button 
                        className="btn btn-circle btn-sm btn-ghost text-gray-500 hover:text-gray-700"
                        onClick={() => setIsTeacherFormOpen(false)}
                    >
                        <IoIosClose className='text-2xl' />
                    </button>
                </div>

                <form onSubmit={ (e) => {e.preventDefault(); handleSubmitTeacherForm(formData)}} className='space-y-6'>
                    {/* Personal Information Section */}
                    <div className='bg-white p-6 rounded-lg border border-gray-200'>
                        <h3 className='text-lg font-semibold text-gray-700 mb-4'>Personal Information</h3>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                            <div className='space-y-1'>
                                <label className='block text-sm font-medium text-gray-700'>Last Name *</label>
                                <input
                                    type='text'
                                    className='input input-bordered w-full'
                                    placeholder='Dela Cruz'
                                    required
                                    name='lastName'
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='space-y-1'>
                                <label className='block text-sm font-medium text-gray-700'>First Name *</label>
                                <input
                                    type='text'
                                    className='input input-bordered w-full'
                                    placeholder='Juan'
                                    required
                                    name='firstName'
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='space-y-1'>
                                <label className='block text-sm font-medium text-gray-700'>Middle Initial *</label>
                                <input
                                    type='text'
                                    className='input input-bordered w-full'
                                    placeholder='M'
                                    maxLength="1"
                                    required
                                    name='middleInitial'
                                    value={formData.middleInitial}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='space-y-1'>
                                <label className='block text-sm font-medium text-gray-700'>Email *</label>
                                <input
                                    type='email'
                                    className='input input-bordered w-full'
                                    placeholder='teacher@school.edu'
                                    required
                                    name='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='space-y-1'>
                                <label className='block text-sm font-medium text-gray-700'>Contact Number *</label>
                                <input
                                    type='tel'
                                    className='input input-bordered w-full'
                                    placeholder='09123456789'
                                    required
                                    name='contactNumber'
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='space-y-2'>
                                <label className='block text-sm font-medium text-gray-700'>Assigned Grade Level(s) *</label>
                                <div className='grid grid-cols-2 gap-2'>
                                    {['Pre-K', 'Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'].map((grade) => (
                                        <label key={grade} className='label cursor-pointer justify-start gap-2'>
                                            <input
                                                type='checkbox'
                                                className='checkbox checkbox-sm'
                                                checked={formData.assignedGradeLevel?.includes(grade) || false}
                                                onChange={(e) => {
                                                    setFormData(prev => {
                                                        const current = prev.assignedGradeLevel || [];
                                                        return {
                                                            ...prev,
                                                            assignedGradeLevel: e.target.checked
                                                                ? [...current, grade]
                                                                : current.filter(g => g !== grade)
                                                        };
                                                    });
                                                }}
                                            />
                                            <span className='label-text'>{grade}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Address Information Section */}
                    <div className='bg-white p-6 rounded-lg border border-gray-200'>
                        <h3 className='text-lg font-semibold text-gray-700 mb-4'>Address Information</h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='space-y-1'>
                                <label className='block text-sm font-medium text-gray-700'>Street *</label>
                                <input
                                    type='text'
                                    className='input input-bordered w-full'
                                    placeholder='123 Main St'
                                    required
                                    name='street'
                                    value={formData.address.street}
                                    onChange={handleAddressChange}
                                />
                            </div>
                            <div className='space-y-1'>
                                <label className='block text-sm font-medium text-gray-700'>Barangay *</label>
                                <input
                                    type='text'
                                    className='input input-bordered w-full'
                                    placeholder='Barangay 1'
                                    required
                                    name='barangay'
                                    value={formData.address.barangay}
                                    onChange={handleAddressChange}
                                />
                            </div>
                            <div className='space-y-1'>
                                <label className='block text-sm font-medium text-gray-700'>City/Municipality *</label>
                                <input
                                    type='text'
                                    className='input input-bordered w-full'
                                    placeholder='Manila'
                                    required
                                    name='city'
                                    value={formData.address.city}
                                    onChange={handleAddressChange}
                                />
                            </div>
                            <div className='space-y-1'>
                                <label className='block text-sm font-medium text-gray-700'>ZIP Code *</label>
                                <input
                                    type='text'
                                    className='input input-bordered w-full'
                                    placeholder='1000'
                                    required
                                    name='zip'
                                    value={formData.address.zip}
                                    onChange={handleAddressChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Additional Information Section */}
                    <div className='bg-white p-6 rounded-lg border border-gray-200'>
                        <h3 className='text-lg font-semibold text-gray-700 mb-4'>Additional Information</h3>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                            <div className='space-y-1'>
                                <label className='block text-sm font-medium text-gray-700'>Date of Birth *</label>
                                <input
                                    type='date'
                                    className='input input-bordered w-full'
                                    required
                                    name='dateOfBirth'
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='space-y-1'>
                                <label className='block text-sm font-medium text-gray-700'>Gender *</label>
                                <select
                                    className='select select-bordered w-full'
                                    required
                                    name='gender'
                                    value={formData.gender}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className='space-y-1'>
                                <label className='block text-sm font-medium text-gray-700'>Civil Status *</label>
                                <select
                                    className='select select-bordered w-full'
                                    required
                                    name='civilStatus'
                                    value={formData.civilStatus}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Status</option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Divorced">Divorced</option>
                                    <option value="Widowed">Widowed</option>
                                </select>
                            </div>
                            <div className='space-y-1'>
                                <label className='block text-sm font-medium text-gray-700'>Date Hired *</label>
                                <input
                                    type='date'
                                    className='input input-bordered w-full'
                                    required
                                    name='dateHired'
                                    value={formData.dateHired}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Benefits Information Section */}
                    <div className='bg-white p-6 rounded-lg border border-gray-200'>
                        <h3 className='text-lg font-semibold text-gray-700 mb-4'>Government Benefits</h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='space-y-1'>
                                <label className='block text-sm font-medium text-gray-700'>SSS Number</label>
                                <input
                                    type='text'
                                    className='input input-bordered w-full'
                                    placeholder='12-3456789-0'
                                    name='sssNumber'
                                    value={formData.benefits.sssNumber}
                                    onChange={handleBenefitsChange}
                                />
                            </div>
                            <div className='space-y-1'>
                                <label className='block text-sm font-medium text-gray-700'>PhilHealth Number</label>
                                <input
                                    type='text'
                                    className='input input-bordered w-full'
                                    placeholder='12-345678901-2'
                                    name='philHealthNumber'
                                    value={formData.benefits.philHealthNumber}
                                    onChange={handleBenefitsChange}
                                />
                            </div>
                            <div className='space-y-1'>
                                <label className='block text-sm font-medium text-gray-700'>Pag-IBIG Number</label>
                                <input
                                    type='text'
                                    className='input input-bordered w-full'
                                    placeholder='1234-5678-9012'
                                    name='pagIbigNumber'
                                    value={formData.benefits.pagIbigNumber}
                                    onChange={handleBenefitsChange}
                                />
                            </div>
                            <div className='space-y-1'>
                                <label className='block text-sm font-medium text-gray-700'>TIN Number</label>
                                <input
                                    type='text'
                                    className='input input-bordered w-full'
                                    placeholder='123-456-789-012'
                                    name='tinNumber'
                                    value={formData.benefits.tinNumber}
                                    onChange={handleBenefitsChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className='flex justify-end sticky bottom-0 bg-transparent py-2'>
                        <div className='flex flex-col sm:flex-row items-end gap-2 sm:gap-3 bg-transparent rounded-lg py-2'>
                            <button
                            type='button'
                            onClick={() => {setFormData(initialFormState); setIsTeacherFormOpen(false)}}
                            className='btn bg-error w-full sm:w-auto'
                            >
                                <MdOutlineCancel className='mr-0 sm:mr-2'/> 
                                <span className='hidden sm:inline'>Cancel</span>
                            </button>
                            <button
                            type='button'
                            onClick={handleReset}
                            className='btn bg-warning w-full sm:w-auto'
                            >
                                <FaUndo className='mr-0 sm:mr-2' /> 
                                <span className='hidden sm:inline'>Reset</span>
                            </button>
                            <button
                            type='submit'
                            className='btn btn-primary text-white w-full sm:w-auto'
                            >
                                <FaSave className='mr-0 sm:mr-2' /> 
                                <span className='hidden sm:inline'>Save Teacher</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default TeacherForm;