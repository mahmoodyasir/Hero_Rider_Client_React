import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import toast from "react-hot-toast";

const Register = () => {
    const {register, formState: {errors}, handleSubmit} = useForm();
    const [ageState, setAgeState] = useState(null);
    const [ageMessage, setAgeMessage] = useState('');
    const [vehicleType, setVehicleType] = useState(null);
    const [rider, setRider] = useState(null);
    const [learner, setLearner] = useState(null);

    const handleRegister = (data) => {
        console.log(data)
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
                           <div className="md:flex md:justify-center">
                               <input className='btn btn-outline btn-accent md:w-2/4 mt-8' value="Register" type="submit"/>
                           </div>
                       }

                   </form>
               </div>
           </div>
        </div>
    );
};

export default Register;
