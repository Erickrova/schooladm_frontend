import ProfileLayout from '../../components/layouts/ProfileLayout'
import useAuth from '../../hooks/useAuth'

const AboutCareer = () => {
  const {profile} = useAuth()
  const {personalData} = profile
  return (
    <ProfileLayout>
      <div>
        <h1 className="text-center text-4xl text-white font-black my-5">{personalData?.career?.name}</h1>
          <div className='md:w-2/3 md:mx-auto md:flex md:flex-col md:justify-center'>
              <p className='mb-2 text-white whitespace-pre-wrap0'>{personalData?.career?.description}</p>
          </div>
      </div>
    </ProfileLayout>
  )
}

export default AboutCareer