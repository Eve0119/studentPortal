import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FaRegCalendar } from "react-icons/fa";
import { IoPersonOutline, IoLocationOutline } from "react-icons/io5";
import { RiParentLine } from "react-icons/ri";
import axiosInstance from '../../lib/axios';
import { uploadStudentImage } from '../../lib/awsS3';

const EditStudent = ({
  setStudent,
  student,
  isEditStudentOpen,
  setIsEditStudentOpen,
  studentId,
  handleEditStudent
}) => {
  const editStudentRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
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
    enrollmentDate: '',
    address: {
      street: '',
      barangay: '',
      city: '',
      zip: ''
    },
    profileImage: {
      url: '',
      key: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

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

  useEffect(() => {
    if (student) {
      setFormData({
        ...student,
        dateOfBirth: student.dateOfBirth
          ? student.dateOfBirth.slice(0, 10)
          : '',
        enrollmentDate: student.enrollmentDate
          ? student.enrollmentDate.slice(0, 10)
          : '',
      });
    }
  }, [student]);

  useEffect(() => {
    if (isEditStudentOpen && studentId) {
      editStudentRef.current?.showModal();
      const fetchStudent = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const res = await axiosInstance.get(`/student/${studentId}`);
          setStudent(res.data);
        } catch (error) {
          console.error("Error fetching student data", error);
          setError(error);
          toast.error("Failed to fetch student data. Please try again later");
          setStudent(null);
        } finally {
          setIsLoading(false);
        }
      };
      fetchStudent();
    } else {
      editStudentRef.current?.close();
      setStudent(null);
      setError(null);
    }
  }, [isEditStudentOpen, studentId]);

    const [isUploading, setIsUploading] = useState(false);

    const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        toast.error('Only JPEG/PNG/WEBP images allowed');
        return;
    }

    if (file.size > 5 * 1024 * 1024) {
        toast.error('Image must be <5MB');
        return;
    }

    setIsUploading(true);
    try {
        const { url, key } = await uploadStudentImage(
        file,
        formData.studentId || 'temp', // Temp ID for new students
        formData.email
        );

        setFormData(prev => ({
        ...prev,
        profileImage: { url, key } // Store both values
        }));
    } catch (error) {
        toast.error(error.message);
    } finally {
        setIsUploading(false);
    }
    };

  return (
    <div>
      <dialog ref={editStudentRef} className='modal modal-middle backdrop-blur-sm'>
        <div className="modal-box !max-w-none w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[70vw] xl:w-[60vw] 2xl:w-[50vw] max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-start top-0 z-10 bg-base-100 pt-0 pb-2 -mx-4 px-4">
            <div className='flex justify-start flex-col'>
              <h2 className="text-xl md:text-2xl font-bold text-primary-content">
                Edit Student Profile
              </h2>
              <div>
                <p className="text-sm md:text-base">
                  {isLoading
                    ? 'Loading student information...'
                    : student
                      ? <span className='text-neutral-content'>Edit {student.firstName} {student.lastName}'s profile</span>
                      : 'Student information not available'}
                </p>
              </div>
            </div>
            <button
              className="btn btn-sm btn-circle btn-ghost"
              onClick={() => setIsEditStudentOpen(false)}
            >
              ✕
            </button>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : error ? (
            <div className="alert alert-error mt-4">
              Failed to load student data
            </div>
          ) : formData ? (
            <form onSubmit={(e) => {
              e.preventDefault();
              handleEditStudent(formData);
            }}>
              <div className='space-y-4'>
                {/* Student Information */}
                <div className='p-4 sm:p-5 rounded-xl border border-neutral-content bg-white'>
                  <div className='flex-col gap-2'>
                    <div className='flex items-start'>
                      <IoPersonOutline className='text-2xl text-primary mt-1 mr-2' />
                      <span className='text-xl sm:text-2xl text-primary-content font-semibold'>
                        Student Information
                      </span>
                    </div>
                    <div>
                      <span className='text-neutral-content text-sm sm:text-base'>Basic information about the student</span>
                    </div>
                  </div>

                  <div className='mt-4'>
                    <div className="flex flex-col items-center gap-4">
                      {/* Circular profile picture with upload overlay */}
                      <div className="relative group">
                        <div className="avatar">
                          <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            {formData.profileImage.url ? (
                              <img 
                                src={formData.profileImage.url} 
                                alt="Profile preview" 
                                className="object-cover"
                              />
                            ) : (
                              <div className="bg-neutral-focus text-neutral-content w-full h-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M5 12h14M12 5v14"/>
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Upload overlay */}
                        <div className="absolute inset-0 rounded-full bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <label className="btn btn-sm btn-circle btn-ghost text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                              <polyline points="17 8 12 3 7 8"></polyline>
                              <line x1="12" y1="3" x2="12" y2="15"></line>
                            </svg>
                            <input 
                              type="file" 
                              className="hidden" 
                              accept="image/jpeg, image/png, image/webp"
                              onChange={handleImageUpload}
                              disabled={isUploading}
                            />
                          </label>
                        </div>
                      </div>

                      {/* Upload status and instructions */}
                      <div className="text-center">
                        <label className="btn btn-sm btn-outline btn-primary">
                          Change Photo
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/jpeg, image/png, image/webp"
                            onChange={handleImageUpload}
                            disabled={isUploading}
                          />
                        </label>
                        <div className="mt-2 text-sm text-gray-500">
                          {isUploading ? (
                            <div className="flex items-center justify-center gap-2">
                              <span className="loading loading-spinner loading-xs"></span>
                              Uploading...
                            </div>
                          ) : (
                            <span>JPG, PNG, or WEBP. Max 5MB</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='mt-4 grid grid-cols-1 sm:grid-cols-5 gap-3 sm:gap-4'>
                    <div className='sm:col-span-2'>
                      <label className="form-control">
                        <div className="label">
                          <span className="label-text font-semibold">Last Name *</span>
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
                    <div className='sm:col-span-2'>
                      <label className='form-control'>
                        <div className='label'>
                          <span className='label-text font-semibold'>First Name *</span>
                        </div>
                        <input
                          type="text"
                          placeholder='Enter first name'
                          className='input input-bordered w-full'
                          required
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                        />
                      </label>
                    </div>
                    <div className='sm:col-span-1'>
                      <label className='form-control'>
                        <div className='label'>
                          <span className='label-text font-semibold'>M.I. *</span>
                        </div>
                        <input
                          type="text"
                          placeholder='Middle Initial'
                          className='input input-bordered w-full'
                          required
                          name="middleInitial"
                          value={formData.middleInitial}
                          onChange={handleChange}
                        />
                      </label>
                    </div>
                  </div>

                  <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
                    <div>
                      <label className="form-control">
                        <div className="label">
                          <span className="label-text font-semibold">Date of Birth *</span>
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
                    <div>
                      <label className="form-control">
                        <div className="label">
                          <span className="label-text font-semibold">Gender *</span>
                        </div>
                        <select className="select select-bordered w-full" value={formData.gender} onChange={handleChange} name='gender' required>
                          <option disabled value=''>Select Gender</option>
                          <option value='male'>Male</option>
                          <option value='female'>Female</option>
                        </select>
                      </label>
                    </div>
                  </div>

                  <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
                    <div>
                      <label className="form-control">
                        <div className="label">
                          <span className="label-text font-semibold">Grade Level *</span>
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
                    <div>
                      <label className="form-control">
                        <div className="label">
                          <span className="label-text font-semibold">Student Number *</span>
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

                  <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
                    <div>
                      <label className="form-control">
                        <div className="label">
                          <span className="label-text font-semibold">Contact Number *</span>
                        </div>
                        <input
                          type="text"
                          className='input input-bordered w-full'
                          required
                          name='contactNumber'
                          placeholder='Enter contact number'
                          value={formData.contactNumber}
                          onChange={handleChange}
                        />
                      </label>
                    </div>
                    <div>
                      <label className="form-control">
                        <div className="label">
                          <span className="label-text font-semibold">Email *</span>
                        </div>
                        <input
                          type="email"
                          className='input input-bordered w-full'
                          required
                          name='email'
                          placeholder='Enter email address'
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Parent/Guardian Information */}
                <div className='p-4 sm:p-5 rounded-xl border border-neutral-content bg-white'>
                  <div className='flex items-start'>
                    <RiParentLine className='text-2xl text-accent mt-1 mr-2' />
                    <span className='text-xl sm:text-2xl text-primary-content font-semibold'>
                      Parent/Guardian Information
                    </span>
                  </div>
                  <div>
                    <span className='text-neutral-content text-sm sm:text-base'>Primary contact information for the student</span>
                  </div>

                  <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
                    <div>
                      <label className="form-control">
                        <div className="label">
                          <span className="label-text font-semibold">Parent/Guardian Name *</span>
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
                    <div>
                      <label className="form-control">
                        <div className="label">
                          <span className="label-text font-semibold">Parent/Guardian Email</span>
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

                  <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
                    <div>
                      <label className="form-control">
                        <div className="label">
                          <span className="label-text font-semibold">Parent/Guardian Contact Number *</span>
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

                {/* Address Information */}
                <div className='p-4 sm:p-5 rounded-xl border border-neutral-content bg-white'>
                  <div className='flex items-start'>
                    <IoLocationOutline className='text-2xl text-primary mt-1 mr-2' />
                    <span className='text-xl sm:text-2xl text-primary-content font-semibold'>
                      Address Information
                    </span>
                  </div>
                  <div>
                    <span className='text-neutral-content text-sm sm:text-base'>Present location of where the student resides</span>
                  </div>

                  <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
                    <div>
                      <label className="form-control">
                        <div className="label">
                          <span className="label-text font-semibold">Street *</span>
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
                    <div>
                      <label className="form-control">
                        <div className="label">
                          <span className="label-text font-semibold">Barangay *</span>
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

                  <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
                    <div>
                      <label className="form-control">
                        <div className="label">
                          <span className="label-text font-semibold">City *</span>
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
                    <div>
                      <label className="form-control">
                        <div className="label">
                          <span className="label-text font-semibold">ZIP Code *</span>
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

                {/* Enrollment Details */}
                <div className='p-4 sm:p-5 rounded-xl border border-neutral-content bg-white'>
                  <div className='flex items-start'>
                    <FaRegCalendar className='text-2xl text-accent mt-1 mr-2' />
                    <span className='text-xl sm:text-2xl text-primary-content font-semibold'>
                      Enrollment Details
                    </span>
                  </div>

                  <div className='mt-4'>
                    <div>
                      <label className="form-control">
                        <div className="label">
                          <span className="label-text font-semibold">Enrollment Date *</span>
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

                {/* Action Buttons */}
                <div className='grid grid-cols-2 gap-4 mt-4'>
                  <button className='btn btn-primary' type='submit' disabled={isLoading || isUploading}>
                        {isUploading || isLoading ? (
                          <>
                            <span className="loading loading-spinner"></span>
                            Uploading...
                          </>
                        ) : (
                          <span className='text-white'>Update Student</span>
                        )}
                  </button>
                  <button
                    className='btn'
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsEditStudentOpen(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="mt-4 text-center">
              No student data found
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default EditStudent;