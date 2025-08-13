import React, {useEffect, useRef, useState} from 'react'
import { IoIosClose } from "react-icons/io";
import { IoPersonOutline, IoLocationOutline } from "react-icons/io5";
import { RiParentLine } from "react-icons/ri";
import { FaRegCalendar } from "react-icons/fa";
import { uploadStudentImage } from '../../lib/awsS3';
import toast from 'react-hot-toast';

const StudentForm = ({isStudentFormOpen, setIsStudentFormOpen, handleSubmitStudentForm}) => {

    const initialFormState = {
        firstName: '',
        lastName: '',
        middleInitial: '',
        dateOfBirth: '',
        gender: '',
        contactNumber: '',
        email: '',
        grade: '',
        studentId: '',
        parentGuardianName: '',
        parentEmail: '',
        parentContactNumber: '',
        address: {
            street: '',
            city: '', 
            zip: '',
        },
        enrollmentDate: new Date().toISOString().split('T')[0],
        profileImage: {
            url: '',
            key: ''
        }
    };    
    const [formData, setFormData] = useState(initialFormState);
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }
    const handleAddressChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            address: {
                ...prev.address,
                [name]: value
            }
        }));
    };
    const studentFormRef = useRef(null);
    useEffect(() => {
        if (isStudentFormOpen) {
        studentFormRef.current?.showModal();
        } else {
        studentFormRef.current?.close();
        }
    }, [isStudentFormOpen]);
    useEffect(() => {
    if (!isStudentFormOpen) {
        setFormData(initialFormState);
    }
    }, [isStudentFormOpen]);

    
    const [isUploading, setIsUploading] = useState(false);

    const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type and size
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
        toast.error('Only JPEG, PNG, or WEBP images allowed');
        return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Image must be smaller than 5MB');
        return;
    }

    setIsUploading(true);
    try {
        const { url, key } = await uploadStudentImage(
        file,
        formData.studentId || 'temp', // Use 'temp' if studentId not set yet
        formData.email
        );

        setFormData(prev => ({
        ...prev,
        profileImage: {
            url,
            key
        }
        }));
        toast.success('Profile image uploaded successfully!');
    } catch (error) {
        console.error("Upload error:", error);
        toast.error(error.message || 'Failed to upload image');
    } finally {
        setIsUploading(false);
    }
    };
    
  return (
    <div>
        <dialog ref={studentFormRef} id='studentModal1' className="modal modal-middle backdrop-blur-sm">
        <div className="modal-box !max-w-none w-[90vw] md:w-[80vw] lg:w-[60vw] xl:w-[50vw]">
            <div className='flex justify-between align-top pt-0 pr-0'>
                <span className='text-2xl text-primary-content font-bold'>Add New Student</span>
                <button className="btn btn-circle btn-ghost btn-xs" onClick={() => {setFormData(initialFormState); setIsStudentFormOpen(false)}}>
                    <IoIosClose className='text-xl' />
                </button>
            </div>
            <div className='mb-5'>
                <span className='text-neutral-content text-base'>Enter the student's information to create their profile in the system</span>
            </div>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmitStudentForm(formData);
            }}>
                <div className='p-5 rounded-xl border border-neutral-content flex flex-col bg-white'>
                    <div className='flex gap-2'>
                        <IoPersonOutline className='text-primary text-2xl m-1'/>
                        <span className='text-2xl text-primary-content font-semibold'>
                        Student Information
                        </span>
                    </div>
                    <div>
                        <span className='text-neutral-content text-base'>Basic information about the student</span>
                    </div>
                    <div className='mt-4 grid grid-cols-1 md:grid-cols-5 gap-x-4 items-start'>
                        <div className="h-full md:col-span-2">
                            <label className="form-control w-full h-full flex flex-col">
                                <div className="label">
                                    <span className="text-base font-semibold">Last Name *</span>
                                </div>
                            <input 
                                type="text" 
                                placeholder="Enter last name" 
                                className="input input-bordered w-full"
                                required
                                name='lastName'
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                            </label>
                        </div>
                        <div className="h-full md:col-span-2">
                            <label className="form-control w-full h-full flex flex-col">
                                <div className="label">
                                    <span className="text-base font-semibold">First Name *</span>
                                </div>
                            <input 
                                type="text" 
                                placeholder="Enter first name" 
                                className="input input-bordered w-full"
                                required
                                name='firstName'
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            </label>
                        </div>
                        <div className="h-full">
                            <label className="form-control w-full h-full flex flex-col">
                                <div className="label">
                                    <span className="text-base font-semibold">M.I.</span>
                                </div>
                            <input 
                                type="text" 
                                placeholder="Initial" 
                                className="input input-bordered w-full "
                                maxLength="1"
                                name='middleInitial'
                                value={formData.middleInitial}
                                onChange={handleChange}
                            />
                            </label>
                        </div>
                    </div>
                    <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-4 items-start'>
                        <div className="h-full">
                            <label className="form-control w-full h-full flex flex-col">
                                <div className="label">
                                    <span className="text-base font-semibold">Date of Birth *</span>
                                </div>
                                <input 
                                type="date" 
                                className="input input-bordered w-full"
                                required
                                name='dateOfBirth'
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div className="h-full">
                            <label className="form-control w-full h-full flex flex-col">
                                <div className="label">
                                    <span className="text-base font-semibold">Gender *</span>
                                </div>
                                <select className="select select-bordered w-full " value={formData.gender} onChange={handleChange} name='gender' required>
                                    <option disabled value=''>Select Gender</option>
                                    <option value='male'>Male</option>
                                    <option value='female'>Female</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-4 items-start'>
                        <div className="h-full">
                            <label className="form-control w-full h-full flex flex-col">
                                <div className="label">
                                    <span className="text-base font-semibold">Grade Level *</span>
                                </div>
                                <select className='select select-bordered w-full' required name="grade" value={formData.grade} onChange={handleChange}>
                                    <option disabled value=''>Select grade level</option>
                                    <option value="pre-k">Pre-K</option>
                                    <option value="kindergarten">Kindergarten</option>
                                    <option value="grade 1">Grade 1</option>
                                    <option value="grade 2">Grade 2</option>
                                    <option value="grade 3">Grade 3</option>
                                    <option value="grade 4">Grade 4</option>
                                    <option value="grade 5">Grade 5</option>
                                    <option value="grade 6">Grade 6</option>
                                </select>
                            </label>
                        </div>
                        <div className="h-full">
                            <label className="form-control w-full h-full flex flex-col">
                                <div className="label">
                                    <span className="text-base font-semibold">Student Number *</span>
                                </div>
                                <input 
                                type="text"
                                className='input input-bordered w-full'
                                required
                                name='studentId'
                                placeholder='Enter student number'
                                value={formData.studentId}
                                onChange={handleChange}
                                />
                            </label>
                        </div>
                    </div>
                    <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-4 items-start'>
                        <div className="h-full">
                            <label className="form-control w-full h-full flex flex-col">
                                <div className="label">
                                    <span className="text-base font-semibold">Contact Number</span>
                                </div>
                                <input 
                                type="text"
                                className='input input-bordered w-full'
                                name='contactNumber'
                                placeholder='Enter contact number'
                                value={formData.contactNumber}
                                onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div className="h-full">
                            <label className="form-control w-full h-full flex flex-col">
                                <div className="label">
                                    <span className="text-base font-semibold">Email *</span>
                                </div>
                                <input 
                                type="email"
                                className='input input-bordered w-full'
                                required
                                name='email'
                                placeholder='Enter email'
                                value={formData.email}
                                onChange={handleChange}
                                />
                            </label>
                        </div>
                    </div>
                    <div className='mt-4 flex w-auto gap-x-4 justify-center'>
                    <label className="form-control w-full h-full flex flex-col">
                        <div className="label">
                        <span className="text-base font-semibold">Profile Picture</span>
                        </div>
                        <input 
                        type="file" 
                        className="file-input file-input-bordered file-input-info file-input-md w-full" 
                        accept="image/jpeg, image/png, image/webp"
                        onChange={handleImageUpload}
                        disabled={isUploading}
                        />
                        {isUploading && (
                        <span className="text-sm text-gray-500 mt-2">Uploading image...</span>
                        )}
                        {formData.profileImage.url && (
                        <div className="mt-4 flex justify-center">
                            <div className="avatar">
                            <div className="w-24 rounded-full">
                                <img 
                                src={formData.profileImage.url} 
                                alt="Profile preview" 
                                className="object-cover"
                                />
                            </div>
                            </div>
                        </div>
                        )}
                    </label>
                    </div>
                </div>
                <div className='mt-5 p-5 rounded-xl border border-neutral-content flex flex-col bg-white'>
                    <div className='flex gap-2'>
                        <RiParentLine className='text-accent text-2xl m-1'/>
                        <span className='text-2xl text-primary-content font-semibold'>
                        Parent/Guardian Information
                        </span>
                    </div>
                    <div>
                        <span className='text-neutral-content text-base'>Primary contact information for the student</span>
                    </div>
                    <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-4 items-start'>
                        <div className="h-full md:col-span-1">
                            <label className="form-control w-full h-full flex flex-col">
                                <div className="label">
                                    <span className="text-base font-semibold">Parent/Guardian Name *</span>
                                </div>
                            <input 
                                type="text" 
                                placeholder="Enter parent/guardian name" 
                                className="input input-bordered w-full"
                                required
                                name='parentGuardianName'
                                value={formData.parentGuardianName}
                                onChange={handleChange}
                            />
                            </label>
                        </div>
                        <div className="h-full md:col-span-1">
                            <label className="form-control w-full h-full flex flex-col">
                                <div className="label">
                                    <span className="text-base font-semibold">Parent/Guardian Email</span>
                                </div>
                            <input 
                                type="email" 
                                placeholder="parent@email.com" 
                                className="input input-bordered w-full"
                                name='parentEmail'
                                value={formData.parentEmail}
                                onChange={handleChange}
                            />
                            </label>
                        </div>
                    </div>
                    <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-4 items-start'>
                        <div className="h-full md:col-span-1">
                            <label className="form-control w-full h-full flex flex-col">
                                <div className="label">
                                    <span className="text-base font-semibold">Parent/Guardian Contact Number *</span>
                                </div>
                            <input 
                                type="text" 
                                placeholder="Enter contact number" 
                                className="input input-bordered w-full"
                                required
                                name='parentContactNumber'
                                value={formData.parentContactNumber}
                                onChange={handleChange}
                            />
                            </label>
                        </div>
                    </div>
                </div>
                <div className='mt-5 p-5 rounded-xl border border-neutral-content flex flex-col bg-white'>
                    <div className='flex gap-2'>
                        <IoLocationOutline className='text-primary text-2xl m-1'/>
                        <span className='text-2xl text-primary-content font-semibold'>
                        Address Information
                        </span>
                    </div>
                    <div>
                        <span className='text-neutral-content text-base'>Present location of where the student resides</span>
                    </div>
                    <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-4 items-start'>
                        <div className="h-full md:col-span-1">
                            <label className="form-control w-full h-full flex flex-col">
                                <div className="label">
                                    <span className="text-base font-semibold">Street *</span>
                                </div>
                            <input 
                                type="text" 
                                placeholder="123 Main Street" 
                                className="input input-bordered w-full"
                                required
                                name='street'
                                value={formData.address.street}
                                onChange={handleAddressChange} 
                            />
                            </label>
                        </div>
                        <div className="h-full md:col-span-1">
                            <label className="form-control w-full h-full flex flex-col">
                                <div className="label">
                                    <span className="text-base font-semibold">Barangay *</span>
                                </div>
                            <input 
                                type="text" 
                                placeholder="Barangay" 
                                className="input input-bordered w-full"
                                required
                                name='barangay'
                                value={formData.address.barangay}
                                onChange={handleAddressChange} 
                            />
                            </label>
                        </div>
                    </div>
                    <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-4 items-start'>
                        <div className="h-full md:col-span-1">
                            <label className="form-control w-full h-full flex flex-col">
                                <div className="label">
                                    <span className="text-base font-semibold">City *</span>
                                </div>
                            <input 
                                type="text" 
                                placeholder="City name" 
                                className="input input-bordered w-full"
                                required
                                name='city'
                                value={formData.address.city}
                                onChange={handleAddressChange} 
                            />
                            </label>
                        </div>
                        <div className="h-full md:col-span-1">
                            <label className="form-control w-full h-full flex flex-col">
                                <div className="label">
                                    <span className="text-base font-semibold">ZIP Code *</span>
                                </div>
                            <input 
                                type="text" 
                                placeholder="12345" 
                                className="input input-bordered w-full"
                                required
                                name='zip'
                                value={formData.address.zip}
                                onChange={handleAddressChange} 
                            />
                            </label>
                        </div>
                    </div>
                </div>
                <div className='mt-5 p-5 rounded-xl border border-neutral-content flex flex-col bg-white'>
                    <div className='flex gap-2'>
                        <FaRegCalendar className='text-accent text-2xl m-1'/>
                        <span className='text-2xl text-primary-content font-semibold'>
                        Enrollment Details
                        </span>
                    </div>
                    <div className='mt-4 grid grid-cols-1 md:grid-cols-1 gap-x-4 items-start'>
                        <div className="h-full md:col-span-1">
                            <label className="form-control w-full h-full flex flex-col">
                                <div className="label">
                                    <span className="text-base font-semibold">Enrollment Date *</span>
                                </div>
                            <input 
                                type="date" 
                                className="input input-bordered w-full"
                                name='enrollmentDate'
                                value={formData.enrollmentDate}
                                onChange={handleChange}
                                required
                            />
                            </label>
                        </div>
                    </div>
                </div>
                <div className='grid gap-x-4 grid-cols-2 mt-4 justify-center'>
                    <button 
                        className='btn btn-primary' 
                        type='submit'
                        disabled={isUploading}
                    >
                        {isUploading ? (
                            <>
                                <span className="loading loading-spinner"></span>
                                Uploading...
                            </>
                        ) : (
                            <span className='text-white'>Save Student</span>
                        )}
                    </button>
                    <button 
                        className='btn' 
                        type="button" 
                        onClick={(e) => {
                            e.preventDefault(); 
                            setFormData(initialFormState); 
                            setIsStudentFormOpen(false);
                        }}
                        disabled={isUploading}
                    >
                        Cancel
                    </button>
                </div>
            </form>           
        </div>
        </dialog> 
    </div>
  )
}

export default StudentForm