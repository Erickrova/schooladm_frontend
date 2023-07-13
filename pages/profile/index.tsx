import useAuth from '../../hooks/useAuth'
import ProfileLayout from '../../components/layouts/ProfileLayout'

const Profile = () => {
  const {profile} = useAuth()
  const {personalData} = profile

  return (
    <ProfileLayout>
      <div>
              <h1 className="text-center text-4xl text-white font-black my-5">Personal Data</h1>
            <form className=" mx-4 md:mx-auto md:w-1/2 pb-5 ">
              <div className="flex justify-center flex-col">
                <label className="text-xl font-bold text-white">First Name</label>
                <input type="text" value={personalData?.firstName || "Student name" } readOnly className="p-2 rounded-full" placeholder="Student name" />
              </div>
              <div className="flex justify-center flex-col">
                <label className="text-xl font-bold text-white">Last Names</label>
                <input type="text" value={personalData?.lastName || "Student last names" } readOnly className="p-2 rounded-full" placeholder="Student last names" />
              </div>
              <div className="flex justify-center flex-col">
                <label className="text-xl font-bold text-white">Career</label>
                <input type="text" value={personalData?.career?.name || "Student career"} readOnly className="p-2 rounded-full" placeholder="Student career" />
              </div>
              <div className="flex justify-center flex-col">
                <label className="text-xl font-bold text-white">Semester</label>
                <input type="text" value={personalData?.semester || "Student semester"} readOnly className="p-2 rounded-full" placeholder="Student semester" />
              </div>
              <div className="flex justify-center flex-col">
                <label className="text-xl font-bold text-white">Document type</label>
                <input type="text" value={personalData?.documentType || "Student document type"} readOnly className="p-2 rounded-full" placeholder="Student document type" />
              </div>
              <div className="flex justify-center flex-col">
                <label className="text-xl font-bold text-white">Document number</label>
                <input type="number" value={personalData?.documentNumber || 0} readOnly className="p-2 rounded-full" placeholder="Student document number" />
              </div>
              <div className="flex justify-center flex-col">
                <label className="text-xl font-bold text-white">E-Mail</label>
                <input type="email" value={profile?.email || "Student email"} readOnly className="p-2 rounded-full" placeholder="Student email" />
              </div>
              <div className="flex justify-center flex-col">
                <label className="text-xl font-bold text-white">Contact number</label>
                <input type="number" value={personalData?.contactNumber || 0} readOnly className="p-2 rounded-full" placeholder="Student contact number" />
              </div>
              <div className="flex justify-center flex-col">
                <label className="text-xl font-bold text-white">Street address</label>
                <input type="text" value={personalData?.streetAdress || "Student street address"} readOnly className="p-2 rounded-full" placeholder="Student street address" />
              </div>
            </form>
            </div>
    </ProfileLayout>
  )
}

export default Profile