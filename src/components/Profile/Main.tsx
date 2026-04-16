import ChangePassword from './ChangePassword'
import GeneralInfo from './GeneralInfo'
import ImageProfile from './ImageProfile'

const Main = () => {
  return (
    <div>
        <div className='flex flex-row gap-5 flex-wrap'>
            <ImageProfile />
            <GeneralInfo />
            <ChangePassword />
        </div>
    </div>
  )
}

export default Main