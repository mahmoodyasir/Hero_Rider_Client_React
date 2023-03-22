import React, {useContext, useState} from 'react';
import {useForm} from "react-hook-form";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import Axios from "axios";
import {AuthContext} from "../../Contexts/AuthProvider";
import {domain} from "../../rootdomain";

const Register = () => {
    const {register, formState: {errors}, handleSubmit} = useForm();
    const {createUser, updateUserProfile} = useContext(AuthContext);
    const [ageState, setAgeState] = useState(null);
    const [ageMessage, setAgeMessage] = useState('');
    const [registerError, setRegisterError] = useState('');
    const [vehicleType, setVehicleType] = useState(null);
    const [rider, setRider] = useState(null);
    const [learner, setLearner] = useState(null);
    const navigate = useNavigate();
    let imageUrl1 = ''
    let imageUrl2 = ''
    let imageUrl3 = ''

    const imageApiKey = process.env.REACT_APP_imgbb_api_key;

    const handleRegister = (data) => {
        setRegisterError('')
        const isAdmin = false;
        const blocked = false;

        if (data.age < 0)
        {
            setAgeState(1);
            setAgeMessage("Please Provide Valid Age !!");
            return;
        }
        setAgeState(null);
        if(data.password !== data.confirm_password){
            toast.error("Password Not Matched")
            return;
        }
        else{
            if(data.role === 'rider')
            {
                const profile_image = data?.profile_image[0];
                const nid_image = data?.nid_image[0];
                const driving_image = data?.driving_image[0];
                const formData1 = new FormData()
                const formData2 = new FormData()
                const formData3 = new FormData()
                formData1.append('image', profile_image)
                formData2.append('image', nid_image)
                formData3.append('image', driving_image)
                Axios({
                    method: "post",
                    url: `https://api.imgbb.com/1/upload?key=${imageApiKey}`,
                    data: formData1
                }).then(response => {
                    if(response.data.success)
                    {
                        imageUrl1=response?.data?.data?.display_url;
                        Axios({
                            method: "post",
                            url: `https://api.imgbb.com/1/upload?key=${imageApiKey}`,
                            data: formData2
                        }).then(response => {
                            if(response.data.success)
                            {
                                imageUrl2=response?.data?.data?.display_url;
                                Axios({
                                    method: "post",
                                    url: `https://api.imgbb.com/1/upload?key=${imageApiKey}`,
                                    data: formData3
                                }).then(response => {
                                    imageUrl3=response?.data?.data?.display_url;
                                    userRegister(data, data?.email, data?.password, data?.name, isAdmin, blocked, imageUrl1, imageUrl2, imageUrl3)
                                })

                            }
                        })

                    }
                })

            }
            else if(data.role === 'learner')
            {

            }
        }

    }

    const userRegister = (data, email, password, name, isAdmin, blocked, imageUrl1, imageUrl2, imageUrl3) => {
        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('User Created Successfully');
                const userInfo = {
                    displayName: name,
                    photoUrl: imageUrl1
                }
                updateUserProfile(userInfo)
                    .then(() => {
                        if(data.role === 'rider')
                        {
                            userRegisterRider(data?.email, data?.password, data?.name, data?.phone, data?.address, data?.age, data?.area, data?.role, data?.vehicle_name, data?.vehicle_type, data?.vehicle_name_plate, isAdmin, blocked, imageUrl1, imageUrl2, imageUrl3)
                        }
                        else if(data.role === 'learner')
                        {

                        }
                    }).catch(err => console.log(err))
                navigate('/')
            }).catch(error => {
            console.log(error)
            setRegisterError(error.message)
        })
    }

    const userRegisterLearner = (data) => {
        console.log(data)
    }

    const userRegisterRider = (email, password, name, phone, address, age, area, role, vehicle_name, vehicle_type, vehicle_name_plate, isAdmin, blocked, imageUrl1, imageUrl2, imageUrl3) => {
        const user = { email, password, name, phone, address, age, area, role, vehicle_name, vehicle_type, vehicle_name_plate, isAdmin, blocked, imageUrl1, imageUrl2, imageUrl3 }
        Axios({
            method: "post",
            url: `${domain}/users`,
            data: user
        }).then(response => {
            console.log("MongoDB Response", response.data)

        })
    }

    const optionReveal = (data) => {

        if(data === 'rider')
        {
            setLearner(null)
            setRider(1)
        }
        else if(data === 'learner')
        {
            setRider(null)
            setLearner(1)
        }
    }

    const accountOption = (data) => {
        if(data === 'car')
        {
            setVehicleType('Car')
        }
        else if(data === 'bike')
        {
            setVehicleType('Bike')
        }
    }


    return (
        <div className="mt-4">
           <div className="card mx-auto md:w-3/4 bg-base-100 shadow-xl">
               <div className="card-body">
                   <form onSubmit={handleSubmit(handleRegister)}>

                       <div className="md:flex gap-2">
                           <div className="form-control md:w-full ">
                               <label className="label"> <span className="label-text">Name</span></label>
                               <input type="text" placeholder="Type Name ....."
                                      {...register("name", {
                                          required: "Please Provide Your Name"
                                      })}
                                      className="input input-bordered md:w-full "/>
                               {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                           </div>

                           <div className="form-control md:w-full">
                               <label className="label"> <span className="label-text">Email</span></label>
                               <input type="text" placeholder="Type Email ....."
                                      {...register("email", {
                                          required: "Please Provide Email Address"
                                      })}
                                      className="input input-bordered md:w-full"/>
                               {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                           </div>

                           <div className="form-control md:w-full">
                               <label className="label"> <span className="label-text">Phone</span></label>
                               <input type="number" placeholder="Enter Phone No ....."
                                      {...register("phone", {
                                          required: "Please Provide Phone Number"
                                      })}
                                      className="input input-bordered md:w-full"/>
                               {errors.phone && <p className='text-red-600'>{errors.phone?.message}</p>}
                           </div>

                       </div>

                       <div className="form-control md:w-full">
                           <label className="label"> <span className="label-text">Address</span></label>
                           <textarea placeholder="Type Address ....."
                                  {...register("address", {
                                      required: "Please Provide Your Home Address"
                                  })}
                                  className="textarea textarea-bordered md:w-full"/>
                           {errors.address && <p className='text-red-600'>{errors.address?.message}</p>}
                       </div>

                       <div className="md:flex gap-2">
                           <div className="form-control md:w-full md:max-w-sm">
                               <label className="label"> <span className="label-text">Profile Image</span></label>
                               <input type="file"
                                      {...register("profile_image", {
                                          required: "Please Provide Your Profile Image"
                                      })}
                                      className="file-input file-input-bordered file-input-primary w-full md:max-w-sm"/>
                               {errors.profile_image && <p className='text-red-600'>{errors.profile_image?.message}</p>}
                           </div>

                           <div className="form-control md:w-full md:max-w-xs">
                               <label className="label"> <span className="label-text">Age</span></label>
                               <input type="number" placeholder="Type Age ....."
                                      {...register("age", {
                                          required: "Please Provide Your Age"
                                      })}
                                      className="input input-bordered md:w-full md:max-w-xs"/>
                               {ageState !== null && <p className="text-red-600">{ageMessage}</p>}
                               {errors.age && <p className='text-red-600'>{errors.age?.message}</p>}
                           </div>

                           <div className="form-control md:w-full">
                               <label className="label"> <span className="label-text">NID Image</span></label>
                               <input type="file"
                                      {...register("nid_image", {
                                          required: "Please Provide Your NID Image"
                                      })}
                                      className="file-input file-input-bordered file-input-accent w-full"/>
                               {errors.nid_image && <p className='text-red-600'>{errors.nid_image?.message}</p>}
                           </div>

                       </div>


                       <div className="form-control md:w-full md:max-w-xs mt-4">
                           <label className="label"> <span className="label-text">Choose <span className="badge badge-primary">Vehicle Type</span> For Next Option</span></label>

                           <div className="flex">
                               <p className="card-title"><input onClick={() => {accountOption('car')}} type="radio" value="car"
                                                                {...register("vehicle_type")}
                                                                className="radio radio-accent"/>Car</p>

                               <p className="card-title"><input onClick={() => {accountOption('bike')}} type="radio" value="bike"
                                                                {...register("vehicle_type")}
                                                                className="radio radio-accent"/>Bike</p>
                           </div>
                           {/*{roleState !== null && <p className='text-red-600'>{roleMessage}</p>}*/}
                           {errors.vehicle_type && <p className='text-red-600'>{errors.vehicle_type?.message}</p>}
                       </div>


                       {
                           vehicleType !== null &&
                           <div>

                               <div className="form-control md:w-full mt-4">
                                   <label className="label mx-auto"> <span className="label-text text-2xl mb-3 font-semibold">Account Type</span></label>
                                   <div className="mx-auto">
                                       <p className="card-title mb-4"><input onClick={() => {optionReveal('rider')}} type="radio" value="rider"
                                                                             {...register("role")}
                                                                             className="radio radio-accent"/>Join as a Rider</p>

                                       <p className="card-title"><input onClick={() => {optionReveal('learner')}} type="radio" value="learner"
                                                                        {...register("role")}
                                                                        className="radio radio-accent"/>Join as a Driving Lesson Learner</p>
                                   </div>
                               </div>


                               {
                                   rider !== null &&
                                   <>
                                       <div className="flex gap-2">
                                           <div className="form-control md:w-full ">
                                               <label className="label"> <span className="label-text">Area</span></label>
                                               <input type="text" placeholder="Enter Your Area ....."
                                                      {...register("area", {
                                                          required: "Please Provide Your Area"
                                                      })}
                                                      className="input input-bordered md:w-full "/>
                                               {errors.area && <p className='text-red-600'>{errors.area?.message}</p>}
                                           </div>

                                           <div className="form-control md:w-full md:max-w-sm">
                                               <label className="label"> <span className="label-text">Driving Licence Picture</span></label>
                                               <input type="file"
                                                      {...register("driving_image", {
                                                          required: "Please Provide Your Driving Licence Picture"
                                                      })}
                                                      className="file-input file-input-bordered file-input-info w-full md:max-w-sm"/>
                                               {errors.driving_image && <p className='text-red-600'>{errors.driving_image?.message}</p>}
                                           </div>
                                       </div>

                                       <div className="md:flex gap-2">
                                           <div className="form-control md:w-full">
                                               <label className="label"> <span className="label-text">{vehicleType} Name</span></label>
                                               <input type="text" placeholder="Type Vehicle Name ....."
                                                      {...register("vehicle_name", {
                                                          required: "Please Provide Your Vehicle Name"
                                                      })}
                                                      className="input input-bordered md:w-full"/>
                                               {errors.vehicle_name && <p className='text-red-600'>{errors.vehicle_name?.message}</p>}
                                           </div>

                                           <div className="form-control md:w-full">
                                               <label className="label"> <span className="label-text">{vehicleType} Model</span></label>
                                               <input type="text" placeholder="Type Vehicle Model ....."
                                                      {...register("vehicle_name", {
                                                          required: "Please Provide Your Vehicle Model"
                                                      })}
                                                      className="input input-bordered md:w-full"/>
                                               {errors.vehicle_name && <p className='text-red-600'>{errors.vehicle_name?.message}</p>}
                                           </div>

                                           <div className="form-control md:w-full">
                                               <label className="label"> <span className="label-text">{vehicleType} Name Plate</span></label>
                                               <input type="text" placeholder="Type Vehicle Name Plate ....."
                                                      {...register("vehicle_name_plate", {
                                                          required: "Please Provide Your Vehicle Name Plate"
                                                      })}
                                                      className="input input-bordered md:w-full"/>
                                               {errors.vehicle_name_plate && <p className='text-red-600'>{errors.vehicle_name_plate?.message}</p>}
                                           </div>
                                       </div>

                                       <div className="md:flex justify-center gap-2">
                                           <div className="form-control md:w-full md:max-w-sm">
                                               <label className="label"> <span className="label-text">Password</span></label>
                                               <input type="password" placeholder="Type Password ....."
                                                      {...register("password", {
                                                          required: "Please Provide Valid Password",
                                                      })}
                                                      className="input input-bordered md:w-full md:max-w-sm"/>
                                               {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                                           </div>

                                           <div className="form-control md:w-full md:max-w-sm">
                                               <label className="label"> <span className="label-text">Confirm Password</span></label>
                                               <input type="confirm_password" placeholder="Confirm Password ....."
                                                      {...register("confirm_password", {
                                                          required: "Please Provide Valid Password",
                                                      })}
                                                      className="input input-bordered md:w-full md:max-w-sm"/>
                                               {errors.confirm_password && <p className='text-red-600'>{errors.confirm_password?.message}</p>}
                                           </div>
                                       </div>
                                   </>
                               }

                               {
                                   learner !== null &&
                                   <>
                                       <div className="md:flex justify-center gap-2">
                                           <div className="form-control md:w-full md:max-w-sm">
                                               <label className="label"> <span className="label-text">Password</span></label>
                                               <input type="password" placeholder="Type Password ....."
                                                      {...register("password", {
                                                          required: "Please Provide Valid Password",
                                                      })}
                                                      className="input input-bordered md:w-full md:max-w-sm"/>
                                               {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                                           </div>

                                           <div className="form-control md:w-full md:max-w-sm">
                                               <label className="label"> <span className="label-text">Confirm Password</span></label>
                                               <input type="password" placeholder="Confirm Password ....."
                                                      {...register("confirm_password", {
                                                          required: "Please Provide Valid Password",
                                                      })}
                                                      className="input input-bordered md:w-full md:max-w-sm"/>
                                               {errors.confirm_password && <p className='text-red-600'>{errors.confirm_password?.message}</p>}
                                           </div>
                                       </div>
                                   </>
                               }

                           </div>
                       }

                       {
                           (rider !== null || learner !== null) &&
                           <>
                               <div className="md:flex md:justify-center">
                                   <input className='btn btn-outline btn-accent md:w-2/4 mt-8' value="Register" type="submit"/>
                               </div>

                               <div className="mt-4">
                                   {registerError && <p className='text-red-600'>{registerError}</p>}
                               </div>
                           </>

                       }

                   </form>
               </div>
           </div>
        </div>
    );
};

export default Register;
